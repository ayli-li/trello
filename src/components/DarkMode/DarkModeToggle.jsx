import React from 'react';
import useDarkMode from 'use-dark-mode';

import './DarkModeStyles.css';
import { Toggle } from './Toggle';

export const DarkModeToggle = () => {

  const darkMode = useDarkMode(false);

  return (
    <div className="dark-mode-toggle">

      <button type="button" onClick={darkMode.enable}>
        ☀
      </button>

      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />

      <button type="button" onClick={darkMode.disable}>
        ☾
      </button>
      
    </div>
  );
};