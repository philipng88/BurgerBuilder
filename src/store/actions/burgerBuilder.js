import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} = actionTypes;

export const addIngredient = (name) => {
  return {
    type: ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => (dispatch) => {
  axios
    .get('/ingredients.json')
    .then((response) => dispatch(setIngredients(response.data)))
    .catch((error) => dispatch(fetchIngredientsFailed()));
};
