import React, { useState } from 'react';
import Axios from "axios";
import { AppShell, Box} from '@mantine/core';
import Header from './PageParts/Header';
import ResultSection from './PageParts/ResultSection';
import InputSection from './PageParts/InputSection';
import 'prismjs/themes/prism-tomorrow.min.css'; // Example style, you can use another
import { post } from 'aws-amplify/api';

function App() {
  const [inputSection, switchSection] = useState(true);
  const [inputXml, setInputXml] = useState('');
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleTranslate = async () => {
    setTranslatedTexts([])
    switchSection(!inputSection)
    try {
      const restOperation = post({
        apiName: 'QuickTranslateAPI',
        path: '/translate',   
        options: {
            body: {
              text: inputXml,
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
          }
      });
     
      const { body } = await restOperation.response;
      const response = await body.json();
      setTranslatedTexts(response);
      console.log('POST call succeeded');
      console.log(response);

    } catch (e) {
      // console.log('POST call failed: ', JSON.parse(e.response.body));
      console.error('Error fetching translation:', e);
    }
  }

  return (
    <AppShell
      header={{ height: 60 }}
    // padding="md"
    >
      <Header />
      <AppShell.Main
        style={{
          minHeight: "100vh",
          maxHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              transition: "top 0.7s ease-in-out", // Define transition for the top property
              top: inputSection ? "0%" : "-100%",
            }}
          >
            <InputSection
              setSelectedLanguages={setSelectedLanguages}
              handleTranslate={handleTranslate}
              selectedLanguages={selectedLanguages}
              inputXml={inputXml}
              setInputXml={setInputXml}
            />
            <ResultSection
              translatedTexts={translatedTexts}
              switchSection={switchSection}
              inputSection={inputSection}
              selectedLanguages={selectedLanguages}
            />
          </Box>
        </Box>
      </AppShell.Main>
      {/* <AppShell.Footer>
      https://dribbble.com/shots/22671301-Translator-App-Light-Dark-Accessibility
      https://dribbble.com/shots/18189658-Translate-App
      https://dribbble.com/shots/17464952-Google-Translate-Dark-Mode
      </AppShell.Footer> */}
    </AppShell>

  );
}

export default App;
