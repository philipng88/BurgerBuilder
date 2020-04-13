import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
  const { link, exact, children } = props;
  const { NavigationItem, active } = classes;

  return (
    <li className={NavigationItem}>
      <NavLink exact={exact} to={link} activeClassName={active}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
