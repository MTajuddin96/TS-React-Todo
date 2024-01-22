
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore, { history } from './redux/store/configureStore';
import Login from './containers/Login/Login.index';

// import './App.less';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';



const store = configureStore()
// console.log(history)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <PublicRoute path="/" component={App} exact strict />

          {/* <Route path="/" component={Login} strict /> */}
          {/* <PublicRoute path="/verify" component={verifyCode} exact strict /> */}
          <PrivateRoute path="/app" component={App} exact strict />
          <PrivateRoute path="*" component={null} exact strict />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
