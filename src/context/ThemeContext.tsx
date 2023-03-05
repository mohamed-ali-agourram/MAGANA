import React, { useState, useEffect } from 'react';

export const ThemeContext = React.createContext<MyContextProps>( {} as MyContextProps);

interface Props {
  children: React.ReactNode;
}

export const AppContext = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(()=>{
    localStorage.theme = theme
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>;
};
