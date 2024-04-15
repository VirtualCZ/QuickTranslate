import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from "axios";

function App() {
  const [translatedText, setTranslatedText] = useState('');


useEffect(() => {
  Axios.post(
    'http://localhost:3030/api/translate', 
    {
        text: "what time is it?",
        to: [
          'fr',
          'sk',
          'cz',
          'de',
          "ja"
        ]
    }
  )
  .then(
    response =>
    {
      console.log(response.data);
    }
  )
  .catch(error => {
      console.error('Error fetching translation:', error);
    });
}, []);


  return (
    <div className="App">
      <h1>Translated Text:</h1>
      {/* <p>{translatedText}</p> */}
    </div>
  );
}

export default App;
