import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../../utils/Storage';
// import { setExistingUserOnLogRocket } from '../../actions/user';

export const PublicRoute = (props: { component: any, path: string, exact: boolean, strict: boolean }) => {
  const Component = props.component
  const rest = { ...props }
  delete rest.component
  return (
    <Route {...rest} render={props => {
      if (getItem('user')) {
        // setExistingUserOnLogRocket();
        return <Redirect to={{ pathname: '/app', state: { from: props.location } }} />;
      }
      return <Component {...props} />;
    }
    }
    />
  )
};
PublicRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.any
}
