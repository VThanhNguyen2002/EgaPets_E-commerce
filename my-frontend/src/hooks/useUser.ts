import { useAuthStore } from "@/store/authStore";

export const useUser = () => {
  const { username, isLoggedIn } = useAuthStore();
  return { username, isLoggedIn };
};
