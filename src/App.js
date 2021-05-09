import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import routes from './routes';

import Container from './components/Container';
import AppBar from './components/AppBar';
import Loader from './components/Loader';

import { authOperations } from './redux-js/auth';
import { connect } from 'react-redux';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);

const RegisterPage = lazy(() =>
  import('./views/RegisterPage' /* webpackChunkName: "register-page" */),
);
const LoginPage = lazy(() =>
  import('./views/LoginPage' /* webpackChunkName: "login-page" */),
);
const ContactsPage = lazy(() =>
  import('./views/ContactsPage' /* webpackChunkName: "contacts-page" */),
);

const App = ({ onGetCurrentUser }) => {
  useEffect(() => {
    onGetCurrentUser();
  }, []);

  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route path={routes.register} component={RegisterPage} />
          <Route path={routes.login} component={LoginPage} />
          <Route exact path={routes.contacts} component={ContactsPage} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </Container>
  );
};

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);