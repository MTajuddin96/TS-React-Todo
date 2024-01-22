import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { getItem } from '../../utils/Storage';
// import { setExistingUserOnLogRocket } from '../../actions/user';

export const PrivateRoute = (props: { component: any, path: string, exact: boolean, strict: boolean }) => {
  const Component = props.component
  const rest = { ...props }
  delete rest.component
  return (
    <Route {...rest} render={props => {
      if (getItem('user')) {
        // setExistingUserOnLogRocket(); 
        return <Component {...rest} />;
      }
      return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    }
    }
    />
  )
};
PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.any
}
