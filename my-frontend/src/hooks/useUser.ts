import { getCookie } from '@/utils/cookie';

export const useUser = () => {
  const username = getCookie('username');
  return { username };
};
