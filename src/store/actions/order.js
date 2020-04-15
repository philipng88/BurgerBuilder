import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const {
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_INIT,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
} = actionTypes;

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return { type: PURCHASE_BURGER_FAIL, error };
};

export const purchaseBurgerStart = () => {
  return { type: PURCHASE_BURGER_START };
};

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then((response) =>
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    )
    .catch((error) => purchaseBurgerFail(error));
};

export const purchaseInit = () => {
  return { type: PURCHASE_INIT };
};

export const fetchOrdersSuccess = (orders) => {
  return { type: FETCH_ORDERS_SUCCESS, orders };
};

export const fetchOrdersFail = (error) => {
  return { type: FETCH_ORDERS_FAIL, error };
};

export const fetchOrdersStart = () => {
  return { type: FETCH_ORDERS_START };
};

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios
    .get('/orders.json')
    .then((response) => {
      const fetchedOrders = [];
      for (const key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((error) => dispatch(fetchOrdersFail(error)));
};
