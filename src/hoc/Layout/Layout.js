import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHandler = () => this.setState({ showSideDrawer: false });
  toggleSideDrawerHandler = () =>
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });

  render() {
    return (
      <>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.toggleSideDrawerHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.closeSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { token } = state.auth;
  return { isAuthenticated: token !== null };
};

export default connect(mapStateToProps)(Layout);
