import { Observable } from "rxjs"

export const __PRODUCTION__ = process.env.NODE_ENV === 'production'
export const __DEV__ = !__PRODUCTION__

export const listenEvents = (socket, name) => new Observable(subscriber => {
    if (socket === null) return subscriber.error('Socket not initialized')
    socket.on(name, data => subscriber.next(data))
})