import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withDataProvider } from './DataProvider'

function ProtectedRoute(props) {
    const { component: Component, path, token, redirectTo, ...rest } = props

  return (
    token ? 
        <Route path={path} render={rProps => <Component {...rProps} {...rest} />}/>
        :
        <Redirect to={redirectTo} />
  )
}

export default withDataProvider(ProtectedRoute)