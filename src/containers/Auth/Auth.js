import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: false,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/')
      this.props.onSetAuthRedirectPath();
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () =>
    this.setState({ isSignup: !this.state.isSignup });

  render() {
    const formElementsArray = [];
    for (const key in this.state.controls) {
      formElementsArray.push({ id: key, config: this.state.controls[key] });
    }
    let errorMessage;

    if (this.props.error) {
      switch (this.props.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage =
            'The email address is already in use by another account';
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

    const authRedirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : null;

    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h1>{this.state.isSignup ? 'Register' : 'Login'}</h1>
        {this.props.error && (
          <p className={classes.ErrorMessage}>
            {errorMessage || this.props.error.message}
          </p>
        )}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <form onSubmit={this.submitHandler}>
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
                    shouldValidate={this.state.isSignup && validation}
                    touched={touched}
                    changed={(event) => this.inputChangedHandler(event, id)}
                  />
                );
              })}
              <Button btnType="Success">submit</Button>
            </form>
            <span style={{ color: '#944317' }}>
              {this.state.isSignup
                ? 'Already have an account? '
                : "Don't have an account? "}
            </span>
            <button
              type="button"
              onClick={this.switchAuthModeHandler}
              className={classes.SwitchAuthModeButton}
            >
              {this.state.isSignup ? 'login.' : 'register.'}
            </button>
          </>
        )}
      </div>
    );
  }
}

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
