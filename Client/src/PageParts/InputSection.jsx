import { Accordion, AppShell, Box, Button, Center, Grid, Group, Stack } from '@mantine/core';
import React from 'react';
import Editor from 'react-simple-code-editor';
import ThemeButton from '../Elements/ThemeButton';
import { highlight, languages } from 'prismjs/components/prism-core';
import LanguageCheckbox from '../Elements/LanguageCheckbox';

function InputSection({setSelectedLanguages, handleTranslate, selectedLanguages, inputXml, setInputXml}) {

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
              disabled={selectedLanguages == false ? true : false}
              onClick={handleTranslate}>Translate</Button>
          </Center>
        );
      }

    return (
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
                  <ThemeButton />
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Box>
      </AppShell.Section>
    );
}

export default InputSection;
