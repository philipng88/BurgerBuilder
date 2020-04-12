import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
  const { open, closed } = props;

  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div
        className={`${classes.SideDrawer} ${
          open ? classes.Open : classes.Close
        }`}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
