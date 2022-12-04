import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { io } from 'socket.io-client';
import { animated, useTransition } from '@react-spring/web';
import { Message } from '../../types';
import Button from '../Button';
import LiveViewers from '../LiveViewers';
import useUser from '../../hooks/useUser';
import { v5 as uuidv5 } from 'uuid';
import convertToDate from '../../utils/convertToDate';
import { CloseIcon } from '../SVG';

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
  /**
   * Chat submission
   */
  const [messages, setMessages] = useState<Message[]>([
    {
      message: 'This chat is in progress...',
      user: 'Parisn',
      time: Date.now(),
      id: uuidv5('This chat is in progress...' + 'BenjiTheGreat' + Date.now(), uuidv5.URL),
    },
    {
      message: 'I am currently building a login feature that supports the chat :)',
      user: 'BenjiTheGreatCoder',
      time: Date.now(),
      id: uuidv5(
        'I am currently building a login feature that supports the chat :)' + 'Shaun1' + Date.now(),
        uuidv5.URL
      ),
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

  const handleChange = () => {
    socket.emit('chat user typing', isTyping);
  };

  // handled by useEffect to only be called once user starts typing and submits messages
  useEffect(() => {
    handleChange();
  }, [isTyping]);

  socket.on('get chat user typing', (arg: number) => {
    setTotalTyping(arg);
  });

  /**
   * Animations
   */
  const transitions = useTransition(isOpen, {
    from: { width: '0%' },
    enter: { width: '33%' },
    leave: { width: '0%' },
  });

  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages]);

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className="h-screen rounded-bl rounded-tl bg-secondary-purple/90 relative z-40"
        >
          <div className="p-4 relative h-[86.5%]">
            <div className="flex items-center justify-between">
              <span className="underline">Chat</span>
              <Button
                text={<CloseIcon renderCircle={false} size={44} />}
                size="xs"
                width="1.5rem"
                borderRequired="none"
                hoverColorRequired={false}
                onClick={() => onclick()}
                classes="hover:rotate-90 transform-all duration-300"
              />
            </div>
            <div className="break-words overflow-y-scroll h-full">
              {messages?.map((message, idx) => (
                <div key={idx} className="grid group">
                  <div
                    className={`relative w-4/5 my-0.5 ${
                      message.user === user.username ? 'justify-self-end' : ''
                    }`}
                  >
                    <span className="text-xs block">{message.user}:</span>
                    <span className="text-xs italic hidden group-hover:block">
                      {convertToDate(message.time)}
                    </span>
                    <span
                      className={`rounded-xl inline-block py-1 px-2 mt-0.5 ${
                        message.user === user.username
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
            <div className="flex flex-row-reverse items-center justify-between">
              <LiveViewers fontSize="xs" label="Active:" pageParams={pageParams} />
              {totalTyping ? <span className="text-xs">{totalTyping} typing...</span> : null}
            </div>
          </div>
          <Formik
            initialValues={{
              userInput: '',
            }}
            onSubmit={(values, { resetForm }) => {
              if (!values.userInput) return;
              const time = Date.now();
              // Socket is used to emit to other users
              socket.emit('chat to room', pageParams, {
                id: uuidv5(values.userInput + user.username + time, uuidv5.URL),
                message: values.userInput,
                user: user.username,
                time,
              });
              // Used to set message locally.
              setMessages([
                ...messages,
                {
                  id: uuidv5(values.userInput + user.username + time, uuidv5.URL),
                  message: values.userInput,
                  user: 'BenjiTheGreat',
                  time,
                },
              ]);
              resetForm();
              setIsTyping(false);
            }}
          >
            <Form className="absolute bottom-0 w-full border-t h-12">
              <Button
                text="send"
                size="xs"
                width="1.5rem"
                borderRequired="none"
                hoverColorRequired={false}
                classes="h-full top-0.5 left-4"
                type="submit"
              />
              <Field
                className="w-5/6 bg-transparent text-primary-neutral font-extralight outline-none border-0 h-full ml-7 absolute"
                id="userInput"
                name="userInput"
                type="text"
                onInput={() => setIsTyping(true)}
                autoComplete="off"
                disabled={!user.id}
                placeholder={!user.id ? 'You must be logged in to chat...' : ''}
              />
            </Form>
          </Formik>
        </animated.div>
      )
  );
};

export default React.memo(Chat);
