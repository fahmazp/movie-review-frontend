import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "theme" }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme
  })

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      document.documentElement.classList.add(systemTheme)
    } else {
      document.documentElement.classList.add(theme)
    }

    document.documentElement.classList.add("transition-colors", "duration-300")
    
    localStorage.setItem(storageKey, theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
