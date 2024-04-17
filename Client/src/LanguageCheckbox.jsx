import { Checkbox } from '@mantine/core';
import React from 'react';

function LanguageCheckbox({ language, checked, onChange }) {
  return (
    <Checkbox
      label={language}
      value={language}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default LanguageCheckbox;
