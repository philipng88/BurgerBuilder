import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) =>
  updateObject(state, { purchased: false });

const purchaseBurgerStart = (state, action) =>
  updateObject(state, { loading: true });

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state, action) =>
  updateObject(state, { loading: false });

const fetchOrdersStart = (state, action) =>
  updateObject(state, { loading: true });

const fetchOrdersSuccess = (state, action) =>
  updateObject(state, { orders: action.orders, loading: false });

const fetchOrdersFail = (state, action) =>
  updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  const {
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
  } = actionTypes;

  switch (action.type) {
    case PURCHASE_INIT:
      return purchaseInit(state, action);
    case PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
