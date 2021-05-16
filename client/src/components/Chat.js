import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
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

  return (
    <section className="chat">
      <h1>Chat</h1>
    </section>
  );
}

export default Chat;
