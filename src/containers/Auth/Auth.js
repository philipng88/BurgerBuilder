import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: { type: 'email' },
      value: '',
      validation: { required: true, isEmail: true },
      valid: false,
      touched: false,
      label: 'Email',
    },
    password: {
      elementType: 'input',
      elementConfig: { type: 'password' },
      value: '',
      validation: { required: true, minLength: 6 },
      valid: false,
      touched: false,
      label: 'Password',
    },
  });

  const [isSignup, setIsSignup] = useState(false);

  const {
    buildingBurger,
    authRedirectPath,
    onSetAuthRedirectPath,
    onAuth,
    error,
    isAuthenticated,
    loading,
  } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') onSetAuthRedirectPath();
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => setIsSignup(!isSignup);

  const formElementsArray = [];
  for (const key in authForm) {
    formElementsArray.push({ id: key, config: authForm[key] });
  }
  let errorMessage;

  if (error) {
    switch (error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account';
        break;
      case 'MISSING_PASSWORD':
        errorMessage = 'Password is missing';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'A user with the entered email address does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is incorrect';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Email is incorrect';
        break;
      default:
        break;
    }
  }

  const authRedirect = isAuthenticated ? (
    <Redirect to={authRedirectPath} />
  ) : null;

  const { Auth, ErrorMessage, SwitchAuthModeButton } = classes;

  return (
    <div className={Auth}>
      {authRedirect}
      <h1>{isSignup ? 'Register' : 'Login'}</h1>
      {error && <p className={ErrorMessage}>{errorMessage || error.message}</p>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={submitHandler}>
            {formElementsArray.map((formElement) => {
              const { id } = formElement;
              const {
                elementType,
                elementConfig,
                value,
                valid,
                validation,
                touched,
                label,
              } = formElement.config;
              return (
                <Input
                  key={id}
                  elementType={elementType}
                  elementConfig={elementConfig}
                  value={value}
                  label={label}
                  invalid={!valid}
                  shouldValidate={isSignup && validation}
                  touched={touched}
                  changed={(event) => inputChangedHandler(event, id)}
                />
              );
            })}
            <Button btnType="Success">submit</Button>
          </form>
          <span style={{ color: '#944317' }}>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          </span>
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className={SwitchAuthModeButton}
          >
            {isSignup ? 'login.' : 'register.'}
          </button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, error, token, authRedirectPath } = state.auth;
  const { building } = state.burgerBuilder;
  return {
    loading,
    error,
    isAuthenticated: token !== null,
    buildingBurger: building,
    authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
