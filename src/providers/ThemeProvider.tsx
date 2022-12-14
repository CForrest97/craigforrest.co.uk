import React, { ReactElement, useCallback, useContext } from "react";

const ThemeContext = React.createContext({
  isDark: false,
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type Props = {
  children: ReactElement;
};

export const ThemeProvider = (props: Props) => {
  const [isDark, setIsDark] = React.useState(false);
  const toggle = useCallback(() => setIsDark((d) => !d), []);

  React.useEffect(() => {
    setIsDark(localStorage.getItem("theme") === "dark");
  }, []);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
