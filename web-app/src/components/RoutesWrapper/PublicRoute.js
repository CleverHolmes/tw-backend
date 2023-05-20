import React from 'react';
import {Route} from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        return <Component {...props} {...rest}/>;
    }}/>
);

export default PublicRoute;
