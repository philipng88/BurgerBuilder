import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  const { ingredients, checkoutCancelled, checkoutContinued } = props;

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you enjoy it!</h1>
      <div>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        cancel
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
