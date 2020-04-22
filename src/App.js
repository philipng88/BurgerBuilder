import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = ({ onTryAutoSignIn, isAuthenticated }) => {
  useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn]);

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>
          {isAuthenticated ? (
            <Switch>
              <Route
                path="/checkout"
                render={(props) => <Checkout {...props} />}
              />
              <Route path="/orders" render={(props) => <Orders {...props} />} />
              <Route path="/logout" component={Logout} />
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/auth" render={(props) => <Auth {...props} />} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )}
        </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.token !== null };
};

const mapDispatchToProps = (dispatch) => {
  return { onTryAutoSignIn: () => dispatch(actions.authCheckState()) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
