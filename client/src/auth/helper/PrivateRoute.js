import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuthenticated } from './index'

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}  // for now "rest" is not required for us
            render={props => isAuthenticated() ? <Component {...props} /> : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
            }
        />
    )
}

