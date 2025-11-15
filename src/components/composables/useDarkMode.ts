import { useDark, useToggle } from '@vueuse/core'

export function useDarkMode() {
  const isDark = useDark({
    storageKey: 'theme',
    valueDark: 'dark',
    valueLight: 'light'
  })

  const toggleDark = useToggle(isDark)

  return { isDark, toggleDark }
}
