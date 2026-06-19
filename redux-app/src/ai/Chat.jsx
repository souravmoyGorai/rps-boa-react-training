import { useState } from 'react';
import { useChatService } from './useChatService';
import './Chat.css';

export default function Chat() {
  const { messages, sendMessage } = useChatService();
  const [inputMessage, setInputMessage] = useState('');

  function send() {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
    setInputMessage('');
  }

  return (
    <div className="chat-container">
      <h2 className="bg-warning">React 19 + Groq LLM Chatbot</h2>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'user' : 'bot'}>
            <b>{msg.role}:</b> {msg.content}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type your message..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
