import { useState } from 'react';
//custom state hook

const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const API_KEY = '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';

export function useChatService() {
  const [messages, setMessages] = useState([]);

  async function sendMessage(userMessage) {//prompt
    const msgs = [{ role: 'user', content: userMessage }];
    setMessages(msgs);

    const body = {
      model: 'llama-3.3-70b-versatile',
      messages: msgs,
      temperature: 0.7
    };

    console.log('Groq API request body:', body);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) throw data;

      const reply = data.choices?.[0]?.message?.content ?? 'No reply';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Groq API error:', err);
      const msg = err.error?.message || err.message || 'Unknown error';
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + msg }]);
    }
  }

  return { messages, sendMessage };//useState, useReducer { msgs,setMessages}
}
