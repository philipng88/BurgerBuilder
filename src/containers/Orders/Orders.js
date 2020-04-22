import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
  const { onFetchOrders, token, userId, loading, orders } = props;

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {orders.map((order) => {
        const { id, ingredients, price } = order;
        return <Order key={id} ingredients={ingredients} price={+price} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { orders, loading } = state.order;
  const { token, userId } = state.auth;
  return { orders, loading, token, userId };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
