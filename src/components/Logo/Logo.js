import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Logo" />
  </div>
);

export default Logo;
