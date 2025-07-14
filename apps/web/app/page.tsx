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
    socket.on("receive_private_message", (msg) => {
      console.log("Private message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg.text]);
    });
    socket.on("receive_group_message", (msg) => {
      console.log("Group message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg.text]);
    });

    return () => {
      socket.off("receive_private_message");
      socket.off("receive_group_message");
    };
  }, []);

  const sendGroupMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = Object.fromEntries(new FormData(e.target as HTMLFormElement))
      .groupMessage as string;
    socket.emit("send_group_message", {
      text: text,
      from: userName,
      group: "family",
      time: new Date().toISOString(),
    });
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const to = Object.fromEntries(new FormData(e.target as HTMLFormElement))
      .recipient as string;
    socket.emit("send_private_message", {
      text: input,
      from: userName,
      to: to,
      time: new Date().toISOString(),
    });
    setInput("");
  };
  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = Object.fromEntries(new FormData(e.target as HTMLFormElement))
      .username as string;
    setUserName(name);
    socket.emit("connect_user", { userId: name });
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
      <form onSubmit={sendGroupMessage}>
        <input
          type="text"
          name="groupMessage"
          placeholder="Enter your group message"
        />
        <button type="submit">send group</button>
      </form>
    </div>
  );
}
