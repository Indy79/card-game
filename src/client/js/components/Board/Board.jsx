import { Button, Layout, notification, Typography, Row, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { ApplicationContext } from '../../contexts/Application'
import { SocketContext } from '../../contexts/Socket'
import { useSelector, useSocketToListen } from '../../hooks'
import Card from '../Card'
import EventCatcher from '../EventCatcher'
import UserList from '../UserList'

const { Header, Content, Sider } = Layout
const { Title } = Typography

export const Board = () => {
  const [collapsed, setCollapsible] = useState(false)
  const [users, setUsers] = useState([])
  const socket = useSelector(SocketContext, 'socket')
  const currentUserId = useSelector(ApplicationContext, 'user.id')
  const refreshedUsers = useSocketToListen('REFRESH_USER')
  useEffect(() => {
    const subscription = refreshedUsers.subscribe(users => setUsers(users))
    return () => subscription.unsubscribe()
  }, [])
  const drawCard = () => {
    socket.emit('USER_DRAW_CARD', currentUserId, response => {
      if (response !== 'OK') notification.error({ title: 'An error occured' })
    })
  }
  return (
    <>
      <EventCatcher />
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsible}>
          <Header>
            <Title style={{ color: 'white' }}>Board</Title>
          </Header>
          <UserList />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <Button onClick={drawCard}>Draw</Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Row gutter={90}>
              {users.map(player => (
                <Col key={player.id} span={8}>
                  {player.nick}
                  <Row gutter={16}>
                    {player.cards.map(card => (
                      <Col span={6}>
                        <Card
                          key={`${card.name}_${card.suit}`}
                          rank={card.name}
                          suit={card.suit.substr(0, 1)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
