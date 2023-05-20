import { ChatHeader } from "./ChatHeader";
import { Messages } from "./Messages";
import { MessageInput } from "./MessageInput";

export function Content({}) {
  return (
    <div className="content">
      <ChatHeader />
      <Messages />
      <MessageInput />
    </div>
  );
}
