import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: unknown) => {
  const [ storedValue, setStoredValue ] = useState(() => {
    try {
      if(typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue; 
      }
    } catch (e) {
      console.error(e);
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      if(typeof window !== 'undefined'){
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch(error) {
      console.error(error);
    }
  };

  return [ storedValue, setValue ];
};

export default useLocalStorage;
