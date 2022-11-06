import { Field, Form, Formik } from 'formik';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Button from '../Button';
import { animated, useTransition } from '@react-spring/web';
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
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = ({ userInput }: { userInput: string }) => {
    socket.emit('chat to room', pageParams, userInput);
  };

  socket.on('get chat message from room', (msg: string) => {
    setMessages([...messages, msg]);
  });

  const [userTyping, setUserTyping] = useState<number | null>(null);

  const handleChange = () => {
    socket.emit('chat user typing', pageParams);
  };

  socket.on('get chat user typing', (amount: number) => {
    setUserTyping(amount);
  });

  const transitions = useTransition(isOpen, {
    from: { width: '0%' },
    enter: { width: '33%' },
    leave: { width: '0%' },
  });

  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  });

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
              />
            </div>
            <div className="overflow-x-hidden break-words overflow-y-scroll h-full">
              {messages?.map((message, idx) => (
                <div key={idx}>
                  <span
                    className="bg-primary-neutral/20 rounded-xl py-1 px-2 inline-block my-0.5"
                    ref={ref}
                  >
                    {message}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-row-reverse items-center justify-between">
              <LiveViewers fontSize="xs" label="Active:" />
              {userTyping && <span className="text-xs">{userTyping} typing...</span>}
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
                onClick={(e) => handleSubmit(e)}
              />
              <Field
                id="userInput"
                name="userInput"
                type="text"
                className="w-5/6 bg-transparent text-primary-neutral font-extralight outline-none border-0 h-full ml-7 absolute"
              />
            </Form>
          </Formik>
        </animated.div>
      )
  );
};

export default React.memo(Chat);
