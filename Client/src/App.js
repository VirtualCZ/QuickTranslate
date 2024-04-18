import React, { useState } from 'react';
import Axios from "axios";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.min.css'; // Example style, you can use another
import LanguageCheckbox from './LanguageCheckbox';
import { Accordion, AppShell, Box, Button, Center, Container, Grid, Group, ScrollArea, Stack, Title, AccordionControlProps, Divider } from '@mantine/core';
import StackBase from './StackBase';
import BoxBase from './BoxBase';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputXml, setInputXml] = useState('');
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleTranslate = async () => {
    try {
      const response = await Axios.post(
        'http://localhost:3030/api/translate',
        {
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

  function AccordionControl(props: AccordionControlProps) {
    return (
      <Center>
        <Accordion.Control {...props} />
        <Button
          style={{
            minWidth: "fit-content",
            // marginInlineEnd: "var(--mantine-spacing-md)",
            borderRadius: "0 20px 0 0",
            height: "46px",
          }}
          onClick={handleTranslate}>Translate</Button>
      </Center>
    );
  }

  return (
    <>
      <AppShell
        header={{ height: 50 }}
        padding="md"
      >
        <AppShell.Header>
          <Title order={1}>
            QuickTranslate
          </Title>
        </AppShell.Header>
        <AppShell.Main>
          {/* <AppShell.Section grow component={ScrollArea}> */}
          <AppShell.Section>
            <Box
              style={{
                minHeight: "calc(100vh - 93px - var(--app-shell-header-offset, 0rem) - var(--app-shell-padding) - var(--app-shell-footer-offset, 0rem) - var(--app-shell-padding)",
                maxHeight: "calc(100vh - 93px - var(--app-shell-header-offset, 0rem) - var(--app-shell-padding) - var(--app-shell-footer-offset, 0rem) - var(--app-shell-padding)",
                overflow: "scroll",
              }}
            >
              <Editor
                value={inputXml}
                placeholder="Enter XML code..."
                onValueChange={e => setInputXml(e)}
                highlight={code => highlight(code, languages.markup)}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  width: "100%",
                }}
              />
            </Box>
            <Box
              style={{
                position: 'absolute',
                top: '100vh',
                left: "0",
                transform: 'translateY(-100%)',
                width: '100%'
              }}>
              <Container style={{ position: "relative", width: "100%" }} size="xl">
                <Center>
                  <Accordion
                    style={{
                      left: "0",
                      width: '100%',
                      borderRadius: "20px",
                      overflow: "hidden"
                    }}
                    mb="xl"
                    variant="contained"
                    chevronPosition="left"
                  >
                    <Accordion.Item
                      style={{
                        borderRadius: "20px"
                      }}
                      value="item">
                      <AccordionControl>Select languages</AccordionControl>
                      <Accordion.Panel>
                        <Stack
                          align="stretch"
                          justify="center"
                          gap="xl"
                        >
                          <Grid grow>
                            {['Catalan', 'Czech', 'German', 'Estonian', 'French', 'Hungarian', 'Croatian', 'Italian', 'Polish', 'Russian', 'Slovak', 'Swedish'].map(language => (
                              <Grid.Col span={2}>
                                <LanguageCheckbox
                                  key={language}
                                  language={language}
                                  checked={selectedLanguages.includes(language)}
                                  onChange={() => handleLanguageCheckboxChange(language)}
                                />
                              </Grid.Col>
                            ))}
                          </Grid>
                          <Center>
                            <Group justify="center">
                              <Button onClick={handleCheckAllLanguages}>Check All</Button>
                              <Button onClick={handleUncheckAllLanguages}>Uncheck All</Button>
                            </Group>
                          </Center>
                        </Stack>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </Center>
              </Container>
            </Box>
          </AppShell.Section>
          <Stack
            align="stretch"
            justify="center"
            gap="xl"
            my="xl"
          >
            <BoxBase>
              {translatedTexts.map((translation, index) => (
                <Box my="10">
                  <Box key={index}>
                    <Title order={2}>{translation.language}</Title>
                    <Editor
                      value={translation.text.join('\n')}
                      highlight={code => highlight(code, languages.markup)}
                      padding={10}
                      style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                      }}
                    />
                  </Box>
                  {index !== translatedTexts.length - 1 && <Divider size="xs" color='dark.3' />}
                </Box>
              ))}
            </BoxBase>
          </Stack>
        </AppShell.Main>
        {/* <AppShell.Footer>
      https://dribbble.com/shots/22671301-Translator-App-Light-Dark-Accessibility
      https://dribbble.com/shots/18189658-Translate-App
      https://dribbble.com/shots/17464952-Google-Translate-Dark-Mode
      </AppShell.Footer> */}
      </AppShell>
    </>

  );
}

export default App;
