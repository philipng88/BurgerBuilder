import axios from 'axios';
import * as actionTypes from './actionTypes';

const {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
} = actionTypes;

export const authStart = () => {
  return { type: AUTH_START };
};

export const authSuccess = (token, userId) => {
  return { type: AUTH_SUCCESS, idToken: token, userId };
};

export const authFail = (error) => {
  return { type: AUTH_FAIL, error };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  const authData = { email, password, returnSecureToken: true };
  const url = isSignup
    ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_DB_API_KEY}`
    : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_DB_API_KEY}`;
  axios
    .post(url, authData)
    .then((response) => {
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((error) => dispatch(authFail(error.response.data.error)));
};

export const setAuthRedirectPath = (path) => {
  return { type: SET_AUTH_REDIRECT_PATH, path };
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  const userId = localStorage.getItem('userId');
  if (!token) {
    dispatch(logout());
  } else {
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
