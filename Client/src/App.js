import React, { useState } from 'react';
import Axios from "axios";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.min.css'; // Example style, you can use another
import LanguageCheckbox from './LanguageCheckbox';

function App() {
  const [rows, setRows] = useState([{ id: 1, value1: '', value2: '', value3: '', translatedText: '' }]);
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleChange = (id, field, value) => {
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      value1: '',
      value2: '',
      value3: '',
      translatedText: ''
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter(row => row.id !== id);
      setRows(updatedRows);
    }
  };

  const handleTranslateAll = async () => {
    const texts = rows.map(row => row.value2.trim());

    try {
      const response = await Axios.post(
        'http://localhost:3030/api/translate',
        {
          texts: texts,
          to: selectedLanguages.map(lang => {
            switch (lang) {
              case 'Catalan':
                return 'ca';
              case 'Czech':
                return 'cs';
              case 'German':
                return 'de';
              case 'Estonian':
                return 'et';
              case 'French':
                return 'fr';
              case 'Hungarian':
                return 'hu';
              case 'Croatian':
                return 'hr';
              case 'Italian':
                return 'it';
              case 'Polish':
                return 'pl';
              case 'Russian':
                return 'ru';
              case 'Slovak':
                return 'sk';
              case 'Swedish':
                return 'sv';
              default:
                return '';
            }
          })
        }
      );

      // Handle response
      console.log(response.data);
      setTranslatedTexts(response.data);
    } catch (error) {
      console.error('Error fetching translation:', error);
    }
  };


  const handleLanguageCheckboxChange = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(item => item !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleCheckAllLanguages = () => {
    setSelectedLanguages(['Catalan', 'Czech', 'German', 'Estonian', 'French', 'Hungarian', 'Croatian', 'Italian', 'Polish', 'Russian', 'Slovak', 'Swedish']);
  };

  const handleUncheckAllLanguages = () => {
    setSelectedLanguages([]);
  };

  return (
    <div className="App">
      <h1>Translated Text:</h1>
      <div>
        {rows.map(row => (
          <div key={row.id}>
            <input
              type="text"
              value={row.value1}
              onChange={(e) => handleChange(row.id, 'value1', e.target.value)}
              placeholder="Value 1"
            />
            <input
              type="text"
              value={row.value2}
              onChange={(e) => handleChange(row.id, 'value2', e.target.value)}
              placeholder="Value 2"
            />
            <input
              type="text"
              value={row.value3}
              onChange={(e) => handleChange(row.id, 'value3', e.target.value)}
              placeholder="Value 3"
            />
            {rows.length > 1 && (
              <button onClick={() => handleRemoveRow(row.id)}>Remove</button>
            )}
          </div>
        ))}
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleTranslateAll}>Translate All</button>
      </div>
      <div>
      {translatedTexts.map((translation, index) => (
  <div key={index}>
    <h2>Language: {translation.language}</h2>
    <Editor
      value={translation.text.map((text, idx) => (
        `${rows[idx].value1.trim()} ${text} ${rows[idx].value3.trim()}`
      )).join('\n')}
      highlight={code => highlight(code, languages.markup)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  </div>
))}




      </div>
      <div>
        <h2>Select Languages:</h2>
        {['Catalan', 'Czech', 'German', 'Estonian', 'French', 'Hungarian', 'Croatian', 'Italian', 'Polish', 'Russian', 'Slovak', 'Swedish'].map(language => (
          <LanguageCheckbox
            key={language}
            language={language}
            checked={selectedLanguages.includes(language)}
            onChange={() => handleLanguageCheckboxChange(language)}
          />
        ))}
        <button onClick={handleCheckAllLanguages}>Check All</button>
        <button onClick={handleUncheckAllLanguages}>Uncheck All</button>
      </div>
    </div>
  );
}

export default App;
