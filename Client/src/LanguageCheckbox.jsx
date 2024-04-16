import React from 'react';

function LanguageCheckbox({ language, checked, onChange }) {
  return (
    <label>
      <input
        type="checkbox"
        value={language}
        checked={checked}
        onChange={onChange}
      />
      {language}
    </label>
  );
}

export default LanguageCheckbox;
