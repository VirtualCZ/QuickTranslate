import React, { useState } from 'react';
import Axios from "axios";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.min.css'; // Example style, you can use another
import LanguageCheckbox from './LanguageCheckbox';
import { AppShell, Box, Button, Center, Divider, Flex, Grid, Group, Skeleton, Stack, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import BoxBase from './BoxBase';
import StackBase from './StackBase';

function App() {
  const [opened, { toggle }] = useDisclosure();
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
    <AppShell
      header={{ height: 92.48 }}
      padding="md"
    >
      <AppShell.Header>
        <Title order={1}>
          QuickTranslate
        </Title>
      </AppShell.Header>
      <AppShell.Main>
        <Stack
          align="stretch"
          justify="center"
          gap="xl"
          my="xl"
        >
          <StackBase>
            <Center>
              <Title order={2}>Language selection</Title>
            </Center>
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
          </StackBase>
          <StackBase>
          <Center>
              <Title order={2}>String input</Title>
            </Center>
            {rows.map(row => (
              <Grid grow key={row.id}>
                <Grid.Col span={3}>
                  <TextInput
                    value={row.value1}
                    onChange={(e) => handleChange(row.id, 'value1', e.target.value)}
                    placeholder="<Untranslated wrapper>"
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <TextInput
                    value={row.value2}
                    onChange={(e) => handleChange(row.id, 'value2', e.target.value)}
                    placeholder="Translated text"
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <TextInput
                    value={row.value3}
                    onChange={(e) => handleChange(row.id, 'value3', e.target.value)}
                    placeholder="</Untranslated wrapper>"
                  />
                </Grid.Col>
                <Grid.Col span={1}>
                  <Button fullWidth variant="filled" color="red" disabled={rows.length <= 1} onClick={() => handleRemoveRow(row.id)}>Remove</Button>
                </Grid.Col>
              </Grid>
            ))}
            <Center>
              <Button onClick={handleAddRow}>Add Row</Button>
            </Center>
          </StackBase>
          <Center>
            <Button onClick={handleTranslateAll}>Translate!</Button>
          </Center>
          <BoxBase>
            {/* <Skeleton height={120} mt={6} width="100%" radius="xl" /> */}
            {translatedTexts.map((translation, index) => (
              <Box my="10">
                <Text mx="10" size="sm">en - {translation.language}</Text>
                <Box mx="10" style={{ borderRadius: 10 }} mt={5} mb={10} bg="dark.7" key={index}>
                  <Editor
                    value={translation.text.map((text, idx) => (
                      `${rows[idx].value1.trim()}${text}${rows[idx].value3.trim()}`
                    )).join('\n')}
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
      <AppShell.Footer>
      https://dribbble.com/shots/22671301-Translator-App-Light-Dark-Accessibility
      https://dribbble.com/shots/18189658-Translate-App
      https://dribbble.com/shots/17464952-Google-Translate-Dark-Mode
      </AppShell.Footer>
    </AppShell>
  );
}

export default App;
