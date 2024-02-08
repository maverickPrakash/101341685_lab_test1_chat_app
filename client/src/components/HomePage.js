// HomePage.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const HomePage = ({ user }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:1166');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('typing', (username) => {
      setTypingMessage(`${username} is typing...`);
      setTimeout(() => setTypingMessage(''), 3000); 
    });

    return () => {
      socket.off('chat message');
      socket.off('typing');
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!socket || !message.trim()) return;
    socket.emit('chat message', { username: user.username, message });
    setMessage('');
  };

  const handleTyping = () => {
    if (!socket) return;
    socket.emit('typing', user.username);
  };

  const username = user ? user.username : 'Guest';

  return (
    <div>
      <h2>Welcome, {username}</h2>
      <div>
        
      </div>
     
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      {typingMessage && <div>{typingMessage}</div>}
    </div>
  );
};

export default HomePage;
