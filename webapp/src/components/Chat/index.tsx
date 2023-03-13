import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { io } from 'socket.io-client';
import { v5 as uuidv5 } from 'uuid';
import { Message } from '../../types';
import Button from '../Button';
import LiveViewers from '../LiveViewers';
import useUser from '../../hooks/useUser';
import convertToDate from '../../utils/convertToDate';
import { chatSchema } from '../../utils/validation';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

type ChatProps = {
  onclick: () => void;
  pageParams: string;
  isOpen: boolean;
};

const Chat = ({ onclick, pageParams, isOpen }: ChatProps): ReactElement => {
  const { user } = useUser();

  const message = ['This site is 🔥🔥🔥', 'Yeah it is. 💯💯'];
  /**
   * Chat submission
   */
  const [messages, setMessages] = useState<Message[]>([
    {
      message: message[0],
      user: 'Parisn_admin1',
      time: Date.now(),
      id: uuidv5(`${message[0]}Parisn_admin1${Date.now()}`, uuidv5.URL),
    },
    {
      message: message[1],
      user: 'benjithegreat',
      time: Date.now(),
      id: uuidv5(`${message[0]}BenjiTheGreat${Date.now()}`, uuidv5.URL),
    },
  ]);

  socket.on('get chat message from room', (messageDetails: Message) => {
    const checkMessage = messages
      .flatMap((message) => Object.values(message))
      .includes(messageDetails.id);
    if (!checkMessage) {
      setMessages([...messages, messageDetails]);
    }
  });

  useEffect(() => {
    if (messages.length === 2) return;
    sessionStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const sessionMessages = sessionStorage.getItem('messages');
    if (sessionMessages) {
      const parsed = JSON.parse(sessionMessages);
      setMessages(parsed);
    }
  }, []);

  /**
   * Chat interactions
   */
  const [isTyping, setIsTyping] = useState(false);
  const [totalTyping, setTotalTyping] = useState(0);

  const handleChange = (): void => {
    socket.emit('chat user typing', isTyping);
  };

  // handled by useEffect to only be called once user starts typing and submits messages
  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);

  socket.on('get chat user typing', (arg: number) => {
    setTotalTyping(arg);
  });

  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      id="item-chat"
      className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto duration-500 transition-transform ${
        isOpen ? '' : 'translate-x-full'
      } w-96 bg-gray-900`}
      tabIndex={-1}
    >
      <h5 className="text-base font-semibold text-gray-500 uppercase">Chat</h5>
      <button
        type="button"
        onClick={(): void => onclick && onclick()}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="py-4 overflow-y-auto w-full">
        <div className="break-words overflow-y-scroll h-full bg-fuchsia-500">
          {messages?.map((message) => (
            <div key={message.id} className="grid group">
              <div
                className={`relative w-4/5 my-0.5 ${
                  message.user === user.userInfo?.username ? 'justify-self-end' : ''
                }`}
              >
                <span className="text-xs block">{message.user}:</span>
                <span className="text-xs italic hidden group-hover:block">
                  {convertToDate(message.time)}
                </span>
                <span
                  className={`rounded-xl inline-block py-1 px-2 mt-0.5 ${
                    message.user === user.userInfo?.username
                      ? 'bg-primary-neutral/20'
                      : 'bg-primary-neutral/40'
                  }`}
                  ref={ref}
                >
                  {message.message}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row-reverse items-center justify-between absolute bottom-16 right-4">
        <LiveViewers fontSize="xxs" label="Active:" pageParams={pageParams} />
        {totalTyping ? <span className="text-xs">{totalTyping} typing...</span> : null}
      </div>
      <Formik
        initialValues={{
          userInput: '',
        }}
        validationSchema={chatSchema}
        validateOnChange={false}
        onSubmit={(values, { resetForm }): void => {
          if (!values.userInput) return;
          const time = Date.now();
          // Socket is used to emit to other users
          socket.emit('chat to room', pageParams, {
            id: uuidv5(`${values.userInput}${user.userInfo?.username || ''}${time}`, uuidv5.URL),
            message: values.userInput,
            user: user.userInfo?.username,
            time,
          });
          // Used to set message locally.
          setMessages([
            ...messages,
            {
              id: uuidv5(`${values.userInput}${user.userInfo?.username || ''}${time}`, uuidv5.URL),
              message: values.userInput,
              user: user.userInfo?.username || '',
              time,
            },
          ]);
          resetForm();
          setIsTyping(false);
        }}
      >
        <Form className="absolute bottom-0 w-full border-t h-12">
          <ErrorMessage
            name="userInput"
            component="div"
            className="font-normal text-xs absolute top-0 ml-2"
          />
          <Button
            text="send"
            size="xs"
            width="1.5rem"
            borderRequired="none"
            hoverColorRequired={false}
            classes="h-full left-4"
            type="submit"
          />
          <Field
            className="w-5/6 bg-transparent text-primary-neutral font-extralight outline-none border-0 h-full ml-7 absolute"
            id="userInput"
            name="userInput"
            type="text"
            onInput={(): void => setIsTyping(true)}
            autoComplete="off"
            disabled={!user.userInfo?.id}
            placeholder={!user.userInfo?.id ? 'You must be logged in to chat...' : ''}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default React.memo(Chat);
