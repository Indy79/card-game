import React, { createContext, useReducer } from 'react'

const initialState = {
  user: null,
  isConnected: false,
}

export const ApplicationContext = createContext(initialState)

export const connectUser = user => ({
  type: 'connect',
  payload: user,
})
export const disconnectUser = () => ({ type: 'disconnect' })

const reducer = (state, action) => {
  switch (action.type) {
    case 'connect':
      return { ...state, isConnected: true, user: action.payload || null }
    case 'disconnect':
      return { ...state, isConnected: false, user: null }
    default:
      return state
  }
}

export const ApplicationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  )
}
