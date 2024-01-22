import TodoApp from './containers/TodoApp/TodoApp';
import './App.scss';
import './App.less'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getItem } from './utils/Storage';
import { setUser } from './redux/actions/user.actions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const prevUser = getItem('user')
    dispatch(setUser(prevUser))
  }, []) // eslint-disable-line

  return (
    <div className='app'>
      <TodoApp />
    </div>
  );
}

export default App;
