import React, { ReactElement } from 'react';
import Button from '../Button';

type ChatProps = {
  onclick: () => void;
};

const Chat = ({ onclick }: ChatProps): ReactElement => {
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
      <div className="absolute bottom-0 w-full border-t h-12">
        <Button
          text="send"
          size="xs"
          width="1.5rem"
          borderRequired="none"
          hoverColorRequired={false}
          classes="h-full left-4"
        />
        <input
          type="text"
          className="w-5/6 bg-transparent text-primary-neutral font-extralight outline-none border-0 h-full ml-7"
        />
      </div>
    </div>
  );
};

export default Chat;
