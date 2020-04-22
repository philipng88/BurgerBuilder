import React, { memo } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const { show, modalClosed, children } = props;
  const { Modal, showModal, hideModal } = classes;
  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <div className={`${Modal} ${show ? showModal : hideModal}`}>
        {children}
      </div>
    </>
  );
};

export default memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
