import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@mantine/core/styles.css';
import { TextInput, Container, createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        bg: 'dark.8',
        variant: 'outline',
      },
    }),
  },
  primaryColor: 'orange',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Container>
        <App />
      </Container>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
