import { useRef, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

const useDebounce = (callback, delay) => {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args) => {
      callbackRef.current?.(...args);
    };

    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};

export default useDebounce;