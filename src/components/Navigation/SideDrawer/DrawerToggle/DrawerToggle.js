import React from 'react';
import classes from './DrawerToggle.module.css';

const DrawerToggle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <i className="fas fa-bars fa-2x" style={{ color: 'white' }}></i>
  </div>
);

export default DrawerToggle;
