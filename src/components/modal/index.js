import { Fragment } from 'preact';
import { createPortal } from 'preact/compat';
import classNames from 'classnames';
import style from './style';

const Modal = ({ isOpen, children }) => {
  const container = document.getElementById('modals');

  if (!isOpen) {
    return null;
  }

  return (
    <Fragment>
      {createPortal(<div class={classNames(style.modal, style['modal-is-open'])}>
      <div class={style.modalContentContainer}>
        {children}
      </div>
    </div>, container)}
    </Fragment>
)};

export default Modal;
