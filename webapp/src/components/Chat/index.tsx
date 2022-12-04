import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { io } from 'socket.io-client';
import { animated, useTransition } from '@react-spring/web';
import { Message } from '../../types';
import Button from '../Button';
import LiveViewers from '../LiveViewers';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

type ChatProps = {
  onclick: () => void;
  pageParams: string;
  isOpen: boolean;
};

const Chat = ({ onclick, pageParams, isOpen }: ChatProps): ReactElement => {
  /**
   * Chat submission
   */
  const [messages, setMessages] = useState<Message[]>([
    { message: 'This chat is in progress...', user: 'Other' },
    {
      message: 'I am currently building a login feature that supports the chat :)',
      user: 'Viewer',
    },
  ]);

  const handleSubmit = ({ userInput }: { userInput: string }) => {
    socket.emit('chat to room', pageParams, { message: userInput, user: 'Viewer' });
  };

  socket.on('get chat message from room', (messageDetails: Message) => {
    setMessages([...messages, messageDetails]);
  });

  /**
   * Chat interactions
   */
  const [isTyping, setIsTyping] = useState(false);
  const [totalTyping, setTotalTyping] = useState(0);

  const handleChange = () => {
    socket.emit('chat user typing', isTyping);
  };

  socket.on('get chat user typing', () => {
    isTyping
      ? setTotalTyping(totalTyping + 1)
      : setTotalTyping((prev) => (prev > 0 ? prev - 1 : 0));
  });

  /**
   * Animations
   */
  useEffect(() => {
    handleChange();
  }, [isTyping]);

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
          className="h-screen rounded bg-secondary-purple/90 relative z-40"
        >
          <div className="p-4 relative h-[86.5%]">
            <div className="flex items-center justify-between mb-4">
              <span className="underline">Chat</span>
              <Button
                text="x"
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
                <div key={idx} className="grid">
                  <span
                    className={`rounded-xl py-1 px-2 relative my-1 w-4/5 ${
                      message.user === 'Viewer'
                        ? 'bg-primary-neutral/20 justify-self-end'
                        : 'bg-primary-neutral/40'
                    }`}
                    ref={ref}
                  >
                    {message.message}
                  </span>
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
              handleSubmit(values);
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
                classes="h-full left-4"
                type="submit"
              />
              <Field
                className="w-5/6 bg-transparent text-primary-neutral font-extralight outline-none border-0 h-full ml-7 absolute"
                id="userInput"
                name="userInput"
                type="text"
                onInput={() => setIsTyping(true)}
                autoComplete="off"
              />
              {/* <Field id="userInput" name="userInput" type="text" disabled={!user}>
                {({ field, meta }) => (
                  <input
                    type="text"
                    onInput={() => setIsTyping(true)}
                    placeholder={meta.touched && meta.error ? meta.error : null}
                    {...field}
                    className="w-5/6 bg-transparent text-primary-neutral font-extralight outline-none border-0 h-full ml-7 absolute"
                  />
                )}
              </Field> */}
            </Form>
          </Formik>
        </animated.div>
      )
  );
};

export default React.memo(Chat);
