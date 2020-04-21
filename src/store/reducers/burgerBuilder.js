import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredientAdd = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredientsAdd = updateObject(
    state.ingredients,
    updatedIngredientAdd
  );
  const updatedStateAdd = {
    ingredients: updatedIngredientsAdd,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedStateAdd);
};

const removeIngredient = (state, action) => {
  const updatedIngredientRemove = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredientsRemove = updateObject(
    state.ingredients,
    updatedIngredientRemove
  );
  const updatedStateRemove = {
    ingredients: updatedIngredientsRemove,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedStateRemove);
};

const setIngredients = (state, action) =>
  updateObject(state, {
    ingredients: {
      lettuce: action.ingredients.lettuce,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: initialState.totalPrice,
    error: false,
    building: false,
  });

const fetchIngredientsFailed = (state, action) =>
  updateObject(state, { error: true });

const reducer = (state = initialState, action) => {
  const {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
  } = actionTypes;

  switch (action.type) {
    case ADD_INGREDIENT:
      return addIngredient(state, action);
    case REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case SET_INGREDIENTS:
      return setIngredients(state, action);
    case FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
