import { Field, Form, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { io } from 'socket.io-client';
import Button from '../Button';
import { animated, useTransition } from '@react-spring/web';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

type ChatProps = {
  onclick: () => void;
  pageParams: string;
  isOpen: boolean;
};

const Chat = ({ onclick, pageParams, isOpen }: ChatProps): ReactElement => {
  const [messages, setMessages] = useState<string[] | null>(null);

  const handleSubmit = ({ userInput }: { userInput: string }) => {
    socket.emit('chat to room', pageParams, userInput);
  };

  socket.on('get chat message from room', (msg: string) => {
    console.log(msg);
    setMessages([msg]);
  });

  const transitions = useTransition(isOpen, {
    from: { width: '0%' },
    enter: { width: '33%' },
    leave: { width: '0%' },
  });

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className="h-screen rounded bg-secondary-purple/90 relative z-40"
        >
          <div className="p-4">
            <div className="flex items-center justify-between pb-4">
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
            <div>
              {messages?.map((message) => (
                <div>
                  <span>{message}</span>
                </div>
              ))}
            </div>
          </div>
          <Formik
            initialValues={{
              userInput: '',
            }}
            onSubmit={(values, { resetForm }) => {
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
