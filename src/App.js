import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import getResponse from './openai';

function Message(text, user=true, loader=false) {
  this.text = text;
  this.id = this.text + Math.random();
  this.loader = loader;
  this.user = user;

  this.addToChat = function(list) {
    const updated = [...list];

    if (updated.length > 0 && updated[updated.length - 1].loader) {
      const loaderMsg = updated.pop();
      updated.push(this);
      updated.push(loaderMsg);
    } else {
      updated.push(this);
    }

    return updated;
  }
}

function App() {
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
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');
  const [msgBuffer, setBuffer] = useState('');

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({behavior : "smooth"});
    }
  }, [messages]);


  useEffect(() => {
    if (msgBuffer.length > 0) {
      const withoutLoader = messages.filter(msg => !msg.loader);
      setMessages(new Message(msgBuffer, false).addToChat(withoutLoader));
      setBuffer('');
    }
  }, [msgBuffer]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setFormValue('');

    const temp = new Message(formValue, true).addToChat(messages);
    
    if (!containsLoader(temp)) {
      setMessages(new Message("", false, true).addToChat(temp));
    } else {
      setMessages(temp);
    }

    dummy.current.scrollIntoView({ behavior: 'smooth' });
    const chatbot = await getResponse(formValue); //!!! TEST !!!

    if (Object.keys(chatbot).length > 0) {
      setBuffer(chatbot.msg); 
    }
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg.text} user={msg.user} loader={msg.loader}/>)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input name="user-text" value={formValue} onChange={(e) => {
        setFormValue(e.target.value)
        }} placeholder="say something nice" />

      <button type="submit">🕊️</button>

    </form>
  </>);
}

function ChatMessage(props) {
  const text = props.message;
  const isUser = props.user;
  const isLoader = props.loader;

  const messageClass = isUser ? 'sent' : 'received';

  if (isLoader) {
    return (<>
    <div className={`message ${messageClass}`}>
    <img src={ 'https://i.pinimg.com/736x/ec/d7/fb/ecd7fb760f2c39b7c7cd71b3bbbd959c.jpg'} />
      <p className='wrapper'>
        <div className='loader'/>
      </p>
    </div>
    </>);
  }

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={ 'https://i.pinimg.com/736x/ec/d7/fb/ecd7fb760f2c39b7c7cd71b3bbbd959c.jpg'} />
      <p>{text}</p>
    </div>
  </>)
}

function containsLoader(messages) {
  for (let i of messages) {
    if (i.loader) {
      return true;
    }
  }

  return false;
}


export default App;
