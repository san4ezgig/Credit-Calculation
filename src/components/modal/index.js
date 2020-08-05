import { Fragment } from 'preact';
import { createPortal } from 'preact/compat';
import classNames from 'classnames';
import cross from './close.svg';
import style from './style';

const Modal = ({ isOpen, children, title, handleClose }) => {
  const container = document.getElementById('modals');

  if (!isOpen) {
    return null;
  }

  return (
    <Fragment>
      {createPortal(<div class={classNames(style.modal, style['modal-is-open'])}>
        <div class={style.modalContentContainer}>
          <div class={style.header}>
            <div class={style.title}>
              {title}
            </div>
            {handleClose && <img src={cross} onClick={handleClose} class={style.close} />}
          </div>
          <div class={style.children}>
            {children}
          </div>
        </div>
    </div>, container)}
    </Fragment>
)};

export default Modal;
