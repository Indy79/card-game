import React, { createContext, useReducer } from 'react'
import io from 'socket.io-client'

const initialValue = { socket: null }

export const SocketContext = createContext(initialValue)

export const connectWithNickname = nick => ({
  type: 'connect',
  payload: nick,
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'connect':
      return { ...state, socket: io({ query: 'nick=' + action.payload }) }
    default:
      return state
  }
}

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue)
  return (
    <SocketContext.Provider value={{ state, dispatch }}>
      {children}
    </SocketContext.Provider>
  )
}
