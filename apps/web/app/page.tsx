"use client";

import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
// import { SOCKET_EVENTS } from "@shared/constants/events";

type Message = {
  id: string;
  text: string;
  from: string;
  time: string;
};

export default function Home() {
  const [userName, setUserName] = useState<string>("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("Message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on("receive_private_message", (msg) => {
      console.log("Private message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg.text]);
    });

    return () => {
      socket.off("message");
      socket.off("receive_private_message");
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const to = Object.fromEntries(new FormData(e.target as HTMLFormElement))
      .recipient as string;
    socket.emit("send_private_message", {
      text: input,
      from: userName,
      to: to,
    });
    setInput("");
  };
  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = Object.fromEntries(new FormData(e.target as HTMLFormElement))
      .username as string;
    setUserName(name);
    socket.emit("register", { userId: name });
  };

  if (userName === "") {
    return (
      <form onSubmit={registerUser}>
        <input type="text" name="username" placeholder="Enter your username" />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <div className="">
      <h1>Private Chat</h1>
      <h2>{userName}</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="enter message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="text"
          name="recipient"
          placeholder="enter recipient username"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
