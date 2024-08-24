import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';

function App() {

  //const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
      </header>

      <section>
        <ChatBot />
      </section>

    </div>
  );
}

function ChatBot() {
  const dummy = useRef();
  const [messages, addMessage] = useState([]);
  const [formValue, setFormValue] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    const updated = [...messages];
    updated.push(formValue);
    addMessage(updated);

    console.log(updated);

    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg + new Date(8.64e15).toString()} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input name="user-text" value={formValue} onChange={(e) => {
        setFormValue(e.target.value)
        }} placeholder="say something nice" />

      <button type="submit" disabled={false}>🕊️</button>

    </form>
  </>);
}

function ChatMessage(props) {
  const text = props.message;

  const messageClass = false ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={ 'https://i.pinimg.com/736x/ec/d7/fb/ecd7fb760f2c39b7c7cd71b3bbbd959c.jpg'} />
      <p>{text}</p>
    </div>
  </>)
}

export default App;
