
import { API_AUTH } from '@/config';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import { sesionDeleteService, sesionGetService } from './sesionService';

export const validateToken = async () => {
  const token = sesionGetService('auth-token');
  if (!token) return false;

  const url = API_AUTH + 'validate-token'

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const auth = useAuthStore();
    auth.user = response.data.user;

    return true;

  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status !== 401) {
      console.error('Error validando token:', err);
    }

    sesionDeleteService('auth-token');
    return false
  }
}
