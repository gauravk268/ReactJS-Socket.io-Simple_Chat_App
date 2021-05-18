import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "./InfoBar";
import Input from "./Input";

let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    const connectionOptions = {
      // "force new connection": true,
      reconnectionAttempts: "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
      timeout: 10000, //before connect_error and connect_timeout are emitted.
      transports: ["websocket"],
    };
    socket = io(ENDPOINT, connectionOptions);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Input
          message={message}
          setMessage={setMessages}
          sendMessage={sendMessage}
        />

        {/* <input
          value={message}
          onChange={(e) => {
            setMessage(e  .target.value);
          }}
          onKeyPress={(e) => {
            return e.key === "Enter" ? sendMessage(e) : null;
          }}
        /> */}
      </div>
    </div>
  );
}

export default Chat;
