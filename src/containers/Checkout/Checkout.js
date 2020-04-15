import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => this.props.history.goBack();
  checkoutContinuedHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    let checkoutSummary = <Redirect to="/" />;
    if (this.props.ingredients) {
      checkoutSummary = (
        <div>
          {this.props.purchased ? <Redirect to="/" /> : null}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return checkoutSummary;
  }
}

const mapStateToProps = (state) => {
  const { ingredients } = state.burgerBuilder;
  const { purchased } = state.order;
  return { ingredients, purchased };
};

export default connect(mapStateToProps)(Checkout);
