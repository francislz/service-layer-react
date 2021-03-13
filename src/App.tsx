import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageContext from './contexts/MessageContext';
import JokePage from './pages/JokePage';

function App() {
  const [message, setMessage] = useState<string>("");

  return (
    <div className="App">
      <MessageContext.Provider value={{message, setMessage}}>
        <JokePage />
      </MessageContext.Provider>
    </div>
  );
}

export default App;
