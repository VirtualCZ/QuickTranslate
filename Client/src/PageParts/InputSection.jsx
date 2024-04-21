import { AppShell, Box, Stack } from '@mantine/core';
import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from "prismjs";
import 'prismjs/components/prism-markup';
import LanguageAccordion from '../Elements/LanguageAccordion';

function InputSection({ setSelectedLanguages, handleTranslate, selectedLanguages, inputXml, setInputXml }) {
  return (
    <AppShell.Section
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Stack display="flex" h="100%" direction="column">
        <Box
          flex={1}
          style={{
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
            highlight={code => Prism.highlight(code, Prism.languages.markup)}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              // fontSize: "1rem",
              minHeight: "100%"
            }}
          />
        </Box>
        <LanguageAccordion
          handleTranslate={handleTranslate}
          setSelectedLanguages={setSelectedLanguages}
          selectedLanguages={selectedLanguages}
        />
      </Stack>
    </AppShell.Section>
  );
}

export default InputSection;
