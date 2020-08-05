import { useState, useCallback } from 'preact/hooks';

const useBooleanState = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [
    isOpen, open, close,
  ];
};

export default useBooleanState;