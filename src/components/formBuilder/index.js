import { useState, useCallback, useEffect } from 'preact/hooks';

const FormBuilder = ({ children, initialState, onSubmit }) => {
  const [state, setState] = useState(initialState || {});

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(state);
  }, [state]);

  const handleChange = useCallback((e) => {
    const { target: {value, name} } = e;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {children({ handleChange, values: state, handleSubmit })}
    </form>
  )
};

export default FormBuilder;
