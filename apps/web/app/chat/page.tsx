'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Send } from 'lucide-react';
import clsx from 'clsx';

const socket = io('http://localhost:4000'); // Update this if backend is deployed

type Message = {
  id: string;
  text: string;
  from: string;
  time: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.emit('join_room', 'global');

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMsg = {
        id: Date.now().toString(),
        text: input,
        from: 'me',
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', { message: input, room: 'global' });
      setMessages((prev) => [...prev, newMsg]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen mx-auto max-w-4xl">
      <header className="p-4 bg-blue-600 text-white text-lg font-semibold">
        Telegram Clone
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              'max-w-sm p-2 rounded-lg shadow-sm',
              msg.from === 'me'
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-white text-black'
            )}
          >
            <div>{msg.text}</div>
            <div className="text-xs mt-1 opacity-60 text-right">{msg.time}</div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex items-center p-4 border-t bg-white">
        <input
          className="flex-1 border rounded-lg px-3 py-2 mr-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
