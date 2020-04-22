import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
  const { isAuthenticated, children } = props;
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const closeSideDrawerHandler = () => setShowSideDrawer(false);
  const toggleSideDrawerHandler = () => setShowSideDrawer(!showSideDrawer);

  return (
    <>
      <Toolbar
        isAuth={isAuthenticated}
        drawerToggleClicked={toggleSideDrawerHandler}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={closeSideDrawerHandler}
      />
      <main className={classes.Content}>{children}</main>
    </>
  );
};

const mapStateToProps = (state) => {
  const { token } = state.auth;
  return { isAuthenticated: token !== null };
};

export default connect(mapStateToProps)(Layout);
