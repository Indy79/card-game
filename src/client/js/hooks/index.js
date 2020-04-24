import { useContext } from 'react'
import { SocketContext } from '../contexts/Socket'
import { Observable } from 'rxjs'
import { get } from 'lodash'

export const useSocketToListen = topic => {
  const { state } = useContext(SocketContext)
  const { socket } = state
  return new Observable(subscriber => {
    if (state.socket === null) subscriber.error('Socket not initialized')
    else socket.on(topic, data => subscriber.next(data))
  })
}

export const useSelector = (context, path) => {
    const { state } = useContext(context)
    return get(state, path)
}