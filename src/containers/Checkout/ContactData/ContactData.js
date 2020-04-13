import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: '<Name>',
        address: {
          street: '<Street Address>',
          zipCode: '<Zip Code>',
          country: '<Country>',
        },
        email: '<Email>',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => this.setState({ loading: false }));
  };

  render() {
    const { ContactData, Input } = classes;
    return (
      <div className={ContactData}>
        <h4>Enter Your Contact Data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            <input
              className={Input}
              type="text"
              name="name"
              placeholder="Your Name"
            />
            <input
              className={Input}
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <input
              className={Input}
              type="text"
              name="street"
              placeholder="Street Address"
            />
            <input
              className={Input}
              type="text"
              name="postal"
              placeholder="Postal Code"
            />
            <Button btnType="Success" clicked={this.orderHandler}>
              submit order
            </Button>
          </form>
        )}
      </div>
    );
  }
}
