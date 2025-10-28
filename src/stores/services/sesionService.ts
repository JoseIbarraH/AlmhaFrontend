
export const sesionSetService = (key: string, value: string) => {
  sessionStorage.setItem(key, value)
}

export const sesionGetService = (key: string) => {
  return sessionStorage.getItem(key)
}

export const sesionDeleteService = (key: string) => {
  sessionStorage.removeItem(key)
}
