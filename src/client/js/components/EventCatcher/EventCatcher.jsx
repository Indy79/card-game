import React, { useEffect } from 'react'
import { notification } from 'antd'

import { useSocketToListen } from '../../hooks'

export const EventCatcher = () => {
  const joinedEvent = useSocketToListen('USER_JOINED')
  const disconnectionEvent = useSocketToListen('USER_DISCONNECT')
  useEffect(() => {
    const subscription = disconnectionEvent.subscribe(user =>
      notification.warn({
        message: 'A user disconnect',
        description: `User ${user.nick} disconnect`,
      })
    )
    return () => subscription.unsubscribe()
  })
  useEffect(() => {
    const subscription = joinedEvent.subscribe(user =>
      notification.success({
        message: 'A user joined the game',
        description: `User ${user.nick} connect`,
      })
    )
    return () => subscription.unsubscribe()
  })
  return <></>
}
