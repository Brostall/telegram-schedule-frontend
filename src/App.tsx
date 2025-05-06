import React, { useState, useEffect, createContext } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import GroupSelect from './pages/GroupSelect';
import SchedulePage from './pages/SchedulePage';
import { Group } from './types';

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: (t: string) => {},
});

const App: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const webApp = useWebApp();

  useEffect(() => {
    if (webApp) {
      // Инициализация Telegram Web App
      webApp.ready();
      
      // Устанавливаем цвет фона и кнопок
      webApp.setHeaderColor('#2AABEE');
      webApp.setBackgroundColor('#ffffff');
    }
  }, [webApp]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.style.background = theme === 'dark' ? '#181c23' : '#fff';
    document.body.style.transition = 'background 0.3s';
    return () => {
      document.body.style.background = '';
      document.body.style.transition = '';
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{
        padding: '16px',
        backgroundColor: theme === 'dark' ? '#181c23' : '#fff',
        minHeight: '100vh',
        color: theme === 'dark' ? '#fff' : '#222',
        transition: 'background 0.3s, color 0.3s'
      }}>
        {!selectedGroup ? (
          <GroupSelect onSelect={setSelectedGroup} />
        ) : (
          <SchedulePage group={selectedGroup} onBack={() => setSelectedGroup(null)} />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default App; 