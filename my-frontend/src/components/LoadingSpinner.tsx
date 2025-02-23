import { useLoadingStore } from "../store/loadingStore";

export const LoadingSpinner = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  if (!isLoading) return null;

  return <div className="loading-spinner">Loading...</div>;
};
