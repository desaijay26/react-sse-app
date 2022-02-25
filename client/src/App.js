import './App.css';
import {useEffect, useState} from 'react';


const source = new EventSource('http://localhost:5000/updates');

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {  
    source.addEventListener(
      'update',
      event => {
        const message = JSON.parse(event.data);
        setMessages([
          ...messages,
          {
            text: message.value,
            date: message.date,
            id: messages.length + 1,
          },
        ])
      },
      false,
    );
  },[messages])


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">SSE Server Client App</h1>
      </header>
      <p className="App-intro">
      Messages received from backend (SSE):
        {messages.map(message => (
        <li className="App-message" key={message.id}>
          {message.text} | {message.date}
        </li>
      ))}
      </p>
    </div>
  )
}

export default App;
