import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import todo from './todo.reducer';
import user from './user.reducer';


// Root Reducer.
const reducer = history => combineReducers({
  router: connectRouter(history),
  todo,
  user
});

export default reducer