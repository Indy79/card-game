import 'antd/dist/antd.css'
import React, { lazy, Suspense } from 'react'
import ReacDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthorizedRoute from './components/AuthorizedRoute'
import { ApplicationContextProvider } from './contexts/Application'
import { SocketContextProvider } from './contexts/Socket'


const Login = lazy(() => import('./components/Login'))
const Board = lazy(() => import('./components/Board'))

const App = () => {
  return (
    <ApplicationContextProvider>
      <SocketContextProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/login" component={Login} />
              <AuthorizedRoute path="/game" component={Board} />
              <AuthorizedRoute exact path="/" />
            </Switch>
          </Suspense>
        </Router>
      </SocketContextProvider>
    </ApplicationContextProvider>
  )
}

export const render = id =>
  ReacDOM.render(<App />, document.getElementById(id), () =>
    console.log('Application rendered')
  )
