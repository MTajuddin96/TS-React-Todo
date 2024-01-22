import { createStore, compose, applyMiddleware } from 'redux';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import createRootReducer from '../reducers/index';
import { routerMiddleware } from 'connected-react-router'
import { enableBatching } from 'redux-batched-actions';



export const history = createBrowserHistory();
const router = routerMiddleware(history);
const middleware = [thunk, router];
const enhancers = compose(
  applyMiddleware(...middleware),
  (window.devToolsExtension && process.env.NODE_ENV !== 'production') ?
    window.devToolsExtension() : f => f
);


export default function configureStore(initialState = {}) {
  const store = createStore(enableBatching(createRootReducer(history)), initialState, enhancers);

  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('../reducers/index')) // eslint-disable-line
    );
  }

  return store;
}