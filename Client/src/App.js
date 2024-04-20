import React, { useState } from 'react';
import Axios from "axios";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.min.css'; // Example style, you can use another
import LanguageCheckbox from './Elements/LanguageCheckbox';
import { Accordion, AppShell, Box, Button, Center, Container, Grid, Group, ScrollArea, Stack, Title, AccordionControlProps, Divider, Image, Skeleton } from '@mantine/core';
import StackBase from './Elements/StackBase';
import BoxBase from './Elements/BoxBase';

function App() {
  const [inputSection, switchSection] = useState(true);
  const [inputXml, setInputXml] = useState('');
  const [translatedTexts, setTranslatedTexts] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleTranslate = async () => {
    setTranslatedTexts([])
    switchSection(!inputSection)
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
            borderRadius: "0 19px 0 0",
            height: "49px",
          }}
          onClick={handleTranslate}>Translate</Button>
      </Center>
    );
  }

  return (
    <AppShell
      header={{ height: 60 }}
    // padding="md"
    >
      <AppShell.Header
        withBorder={false}
      >
        <Container
          h="100%"
          size="xl">
          <Center
            pt="md"
            pb="md"
            h="100%"
            inline
            style={{
              paddingInlineStart: "calc(var(--app-shell-navbar-offset, 0rem) + var(--app-shell-padding))",
              paddingInlineEnd: "calc(var(--app-shell-aside-offset, 0rem) + var(--app-shell-padding))"
            }}
          >
            <Image
              style={{
                flex: "unset"
              }}
              h="100%"
              src="/logo-no-background.svg"
              alt="QuickTranslate logo"
              className='logo'
            />
          </Center>
        </Container>
      </AppShell.Header>
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
            <AppShell.Section
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Box
                style={{
                  height: "calc(100% - 83px)",
                  overflow: "scroll",
                  border: "1px solid var(--mantine-color-dark-4)",
                  borderRadius: "20px"
                }}
              >
                <Editor
                  value={inputXml}
                  placeholder="Enter XML code..."
                  padding={20}
                  onValueChange={e => setInputXml(e)}
                  highlight={code => highlight(code, languages.markup)}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    width: "100%",
                    minHeight: "100%"
                  }}
                />
              </Box>
              <Box
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: "0",
                  transform: 'translateY(-100%)',
                  width: '100%'
                }}>
                <Accordion
                  style={{
                    left: "0",
                    width: '100%',
                    borderRadius: "20px",
                    overflow: "hidden"
                  }}
                  mb="md"
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
                            <Grid.Col span={{ base: 6, sm: 4, md: 3, lg: 2 }}>
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
              </Box>
            </AppShell.Section>
            <AppShell.Section
              style={{
                transition: "top 0.7s ease", // Define transition for the top property
                top: inputSection ? "100%" : "0%",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                // position: "absolute"
              }}
            >
              <Stack
                align="stretch"
                justify="center"
                gap="xl"
                my="md"
              >
                <Button
                  onClick={(e) => switchSection(!inputSection)}
                  style={{
                    borderRadius: "20px"
                  }}
                >
                  Back
                </Button>
                <BoxBase>
                  {translatedTexts[0] == undefined ? selectedLanguages.map((lang, index) => (
                    <Box my="10" key={index}>
                      <Title order={2}>{lang}</Title>
                      <Skeleton height={8} radius="xl" />
                      <Skeleton height={8} mt={6} radius="xl" />
                      <Skeleton height={8} mt={6} width="70%" radius="xl" />
                      {index !== translatedTexts.length - 1 && <Divider size="xs" color='dark.3' />}
                    </Box>
                  ))
                    :
                    translatedTexts.map((translation, index) => (
                      <Box key={index} m="md">
                        <Title mb="xs" order={2}>{translation.language}</Title>
                        <Editor
                          value={translation.text.join('\n')}
                          highlight={code => highlight(code, languages.markup)}
                          style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                          }}
                        />
                        {index !== translatedTexts.length - 1 && <Divider mt="md" size="xs" color='dark.3' />}
                      </Box>
                    ))}
                </BoxBase>
              </Stack>
            </AppShell.Section>
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
