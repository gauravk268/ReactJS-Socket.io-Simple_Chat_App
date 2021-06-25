import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";
import "./Messages.css";

function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="messages">
      {messages.map((msg, i) => (
        <div key={i}>
          <Message message={msg} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
}

export default Messages;
