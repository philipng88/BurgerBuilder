import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

export default class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={`${classes.Modal} ${
            show ? classes.showModal : classes.hideModal
          }`}
        >
          {children}
        </div>
      </>
    );
  }
}
