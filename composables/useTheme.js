// composables/useTheme.js
import { useState, onMounted } from 'nuxt/app'

export const useTheme = () => {
  // Create a reactive state for the theme
  const theme = useState('theme', () => 'light')

  // Function to set theme and store it in localStorage
  const setTheme = (newTheme) => {
    theme.value = newTheme
    if (process.client) {
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
    }
  }

  // Initialization on the client-side
  onMounted(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }

    // Listen for changes in system preference if no stored preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (!localStorage.getItem('theme')) {
        setTheme(event.matches ? 'dark' : 'light')
      }
    })
  })

  return { theme, setTheme }
}
