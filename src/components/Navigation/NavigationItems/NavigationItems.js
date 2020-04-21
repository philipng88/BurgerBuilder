import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">
      Burger Builder <i className="fas fa-hamburger"></i>
    </NavigationItem>
    {props.isAuthenticated && (
      <NavigationItem link="/orders">
        My Orders <i className="fas fa-receipt"></i>
      </NavigationItem>
    )}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">
        Logout <i className="fas fa-sign-out-alt"></i>
      </NavigationItem>
    ) : (
      <NavigationItem link="/auth">
        Login / Register <i className="fas fa-user-circle"></i>
      </NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
