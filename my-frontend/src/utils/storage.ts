export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): any | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
