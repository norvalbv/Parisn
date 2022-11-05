import { Field, Form, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { io } from 'socket.io-client';
import Button from '../Button';

let socket = io('ws://localhost:8000', {
  withCredentials: true,
});

type ChatProps = {
  onclick: () => void;
};

const Chat = ({ onclick }: ChatProps): ReactElement => {
  const [messages, setMessages] = useState<string[] | null>(null);

  const handleSubmit = ({ userInput }: { userInput: string }) => {
    socket.emit('chat message', userInput);
  };

  socket.on('chat message', (msg: string) => {
    setMessages([msg]);
  });

  return (
    <div className="h-[30rem] rounded bg-primary-neutral/20 w-[20rem] absolute right-0 top-20">
      <div className="flex items-center justify-between p-4">
        <span>Chat</span>
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
            className="w-5/6 bg-transparent text-primary-neutral font-extralight outline-none border-0 h-full ml-7"
          />
        </Form>
      </Formik>
    </div>
  );
};

export default React.memo(Chat);
