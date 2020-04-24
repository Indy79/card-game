import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { SubMenu } = Menu

import { useSocketToListen } from '../../hooks'

export const UserList = () => {
  const [users, setUsers] = useState([])
  const refreshedUsers = useSocketToListen('REFRESH_USER')
  useEffect(() => {
    const subscription = refreshedUsers.subscribe(users => setUsers(users))
    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <Menu mode="inline">
        <SubMenu
          key="user"
          title={
            <span>
              <UserOutlined />
              <span>Users</span>
            </span>
          }
        >
          {users.map(user => (
            <Menu.Item key={user.id}>{user.nick}</Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </>
  )
}
