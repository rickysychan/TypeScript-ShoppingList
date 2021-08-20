import ReactDOM from 'react-dom';
import { Suspense, lazy, ComponentType } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import LandingPage from './pages/Home';

const HistoryPage = lazy(
  (): Promise<{ default: ComponentType<{}> }> => import('./pages/History')
);
const ShoppingListPage = lazy(
  (): Promise<{ default: ComponentType<{}> }> => import('./pages/ShoppingList')
);

const NavContainterStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  height: '10vh',
  alignItems: 'center',
  borderBottom: 'black solid 1px',
  marginBottom: '1em',
};

const navItemStyle = {
  color: 'black',
  textDecoration: 'none',
  borderBottom: 'black solid 1px',
};

const pageContainerStyle = {
  height: '90vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'scroll',
};
const App = () => {
  return (
    <Router>
      <nav>
        <div style={NavContainterStyle}>
          <div>
            <Link style={navItemStyle} to="/">
              Home
            </Link>
          </div>
          <div>
            <Link style={navItemStyle} to="/history">
              Shopping list history
            </Link>
          </div>
          <div>
            <Link style={navItemStyle} to="/gallery">
              Gallery
            </Link>
          </div>
        </div>
      </nav>
      <div style={pageContainerStyle}>
        <Switch>
          <Route path="/gallery">
            <Suspense fallback={<div>Loading...</div>}>
              <ShoppingListPage />
            </Suspense>
          </Route>
          <Route path="/history">
            <Suspense fallback={<div>Loading...</div>}>
              <HistoryPage />
            </Suspense>
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
