import axios from 'axios'
import { API_AUTH } from '@/config';
import { api } from '@/plugins/api';
import { useAuthStore } from '@/stores/authStore';

export const validateToken = async () => {
  const url = API_AUTH + 'validate-token'

  try {
    const response = await api.get(url);
    const auth = useAuthStore();
    auth.user = response.data.user;

    return true;

  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // Solo loguea si NO es 401
      if (err.response?.status !== 401) {
        console.error('Error validando token:', err)
      }
    } else {
      console.error('Error inesperado validando token:', err)
    }
    return false
  }
}
