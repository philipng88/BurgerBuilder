import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
  const { history, match, ingredients, purchased } = props;
  const checkoutCancelledHandler = () => history.goBack();
  const checkoutContinuedHandler = () =>
    history.replace('/checkout/contact-data');

  return ingredients ? (
    <div>
      {purchased ? <Redirect to="/" /> : null}
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route path={`${match.path}/contact-data`} component={ContactData} />
    </div>
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = (state) => {
  const { ingredients } = state.burgerBuilder;
  const { purchased } = state.order;
  return { ingredients, purchased };
};

export default connect(mapStateToProps)(Checkout);
