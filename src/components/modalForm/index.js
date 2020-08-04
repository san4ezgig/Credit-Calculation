import { h } from 'preact';
import { Link } from 'preact-router/match';
import { useState, useCallback } from 'preact/hooks';
import style from './style.css';
import Modal from'../modal';

const defaultState = {
  sum: 1,
  loanDate: '2020-02-02',
};

const ModalForm = ({ data, handleFormSubmit, isModalOpen }) => {
  const [{sum, loanDate}, setFormState] = useState(data || defaultState);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    handleFormSubmit(sum, loanDate);
  }, [handleFormSubmit, sum, loanDate]);

  const handleInputChange = useCallback((e) => {
    const {target: { dataset: { key }, value }} = e;
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, [])

  return (<Modal isOpen={isModalOpen}>
    <form onSubmit={handleSubmit} class={style.container}>
      <div class={style.inputsContainer}>
        <div>
          <label>
            Сумма кредита в рублях
          </label>
          <input onInput={handleInputChange} data-key="sum" value={sum} type="number" placeholder="Сумма в рублях"/>
        </div>
        <div>
          <label>
            Дата взятия кредита
          </label>
          <input onInput={handleInputChange} data-key="date" value={loanDate} type="date" placeholder="Дата взятия кредита"/>
        </div>
      </div>
      <div class={style.buttons}>
        <button>
          Cancel
        </button>
        <button type="submit">
          Save
        </button>
      </div>
    </form>
  </Modal>
)};

export default ModalForm;
