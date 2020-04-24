import React, { useContext } from 'react'
import { ApplicationContext } from '../../contexts/Application'
import { Route, Redirect } from 'react-router-dom'

export const AuthorizedRoute = (props) => {
  const { state } = useContext(ApplicationContext)
  const { isConnected } = state
  if (isConnected) return <Route {...props} />
  return <Redirect to="/login" />
}
