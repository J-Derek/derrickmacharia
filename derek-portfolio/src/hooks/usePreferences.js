import { useState, useEffect } from 'react';

export function useFinePointer() {
  const [isFine, setIsFine] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : true
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');

    const handler = (e) => setIsFine(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isFine;
}
