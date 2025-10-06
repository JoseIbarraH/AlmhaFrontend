
import { API_AUTH } from '@/config';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

export const loginService = async (email: string, password: string) => {
  const url = API_AUTH + 'login'

  const response = await axios.post(url, {
    email: email,
    password: password,
  }
  );

  const { user, token } = response.data

  const auth = useAuthStore()
  auth.setAuth(user, token)

  return response.data
}


export const logoutService = async () => {
  const auth = useAuthStore()

  const url = API_AUTH + 'logout'
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    )

    // Si el backend respondió bien, limpiamos la sesión local
    auth.logout()
    return response.data
  } catch (error) {
    console.error('Error en logout:', error)
    // Igual limpiamos localmente por seguridad
    auth.logout()
    throw error
  }
}
