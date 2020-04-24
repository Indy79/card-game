import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import {
  ApplicationContext,
  disconnectUser,
  connectUser,
} from '../../contexts/Application'
import { SocketContext, connectWithNickname } from '../../contexts/Socket'
import { useHistory } from 'react-router-dom'

const { Item } = Form

export const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState(null)
  const applicationContext = useContext(ApplicationContext)
  const socketContext = useContext(SocketContext)
  const applicationDispatch = applicationContext.dispatch
  const socketDispatch = socketContext.dispatch

  if (applicationContext.state.isconnected) history.push('/game')

  useEffect(() => {
    if (username === null) return
    const socket = socketContext.state.socket
    socket.on('UPDATE_SELF', user => {
      applicationDispatch(connectUser(user))
      history.push('/game')
    })
  }, [username])

  const onFinish = values => {
    socketDispatch(connectWithNickname(values.username))
    setUsername(values.username)
  }
  const onFinishFailed = errorInfo => {
    applicationDispatch(disconnectUser())
    console.error('Failed:', errorInfo)
  }
  return (
    <Row>
      <Col span={6} offset={8}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Item>
          <Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      </Col>
    </Row>
  )
}
