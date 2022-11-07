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
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = ({ userInput }: { userInput: string }) => {
    socket.emit('chat to room', pageParams, { message: userInput, user: 'Viewer' });
  };

  socket.on('get chat message from room', (messageDetails: Message) => {
    setMessages([...messages, messageDetails]);
  });

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
              />
            </div>
            <div className="overflow-x-hidden break-words overflow-y-scroll h-full">
              {messages?.map((message, idx) => (
                <div key={idx} className="grid grid-cols-2">
                  <span
                    className={`rounded-xl py-1 px-2 inline-block my-0.5 w-max ${
                      message.user === 'Viewer'
                        ? 'bg-primary-neutral/20 justify-self-end col-start-2'
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
              <Field id="userInput" name="userInput" type="text">
                {({ field, meta }) => (
                  <input
                    type="text"
                    onInput={() => setIsTyping(true)}
                    placeholder={meta.touched && meta.error ? meta.error : null}
                    {...field}
                    className="w-5/6 bg-transparent text-primary-neutral font-extralight outline-none border-0 h-full ml-7 absolute"
                  />
                )}
              </Field>
            </Form>
          </Formik>
        </animated.div>
      )
  );
};

export default React.memo(Chat);
