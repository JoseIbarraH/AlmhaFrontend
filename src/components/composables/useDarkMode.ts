import { useDark, useToggle } from '@vueuse/core'

export function useDarkMode() {
  // reactivo, detecta la preferencia del sistema y persiste en localStorage
  const isDark = useDark({
    storageKey: 'theme',
    valueDark: 'dark',
    valueLight: 'light'
  })

  const toggleDark = useToggle(isDark)

  return { isDark, toggleDark }
}
