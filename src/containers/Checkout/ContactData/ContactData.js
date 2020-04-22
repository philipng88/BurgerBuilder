import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: { type: 'text' },
      value: '',
      label: 'Name',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: { type: 'text' },
      value: '',
      label: 'Street Address',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: { type: 'text' },
      value: '',
      label: 'Zip Code',
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: { type: 'text' },
      value: '',
      label: 'Country',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: { type: 'email' },
      value: '',
      label: 'Email',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      validation: {},
      valid: true,
      label: 'Delivery Method',
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const {
    ingredients,
    totalPrice,
    userId,
    onOrderBurger,
    token,
    loading,
  } = props;

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (const formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients,
      price: totalPrice,
      customerData: formData,
      userId,
    };
    onOrderBurger(order, token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm)
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (const key in orderForm) {
    formElementsArray.push({ id: key, config: orderForm[key] });
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Data</h4>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={orderHandler}>
          {formElementsArray.map((formElement) => {
            const {
              elementType,
              elementConfig,
              label,
              value,
              valid,
              validation,
              touched,
            } = formElement.config;
            return (
              <Input
                key={formElement.id}
                elementType={elementType}
                elementConfig={elementConfig}
                label={label}
                value={value}
                invalid={!valid}
                shouldValidate={validation}
                touched={touched}
                changed={(event) => inputChangedHandler(event, formElement.id)}
              />
            );
          })}
          <Button btnType="Success" disabled={!formIsValid}>
            submit order
          </Button>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { ingredients, totalPrice } = state.burgerBuilder;
  const { loading } = state.order;
  const { token, userId } = state.auth;
  return { ingredients, totalPrice, loading, token, userId };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
