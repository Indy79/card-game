import Button from 'antd/es/button'
import Checkbox from 'antd/es/checkbox'
import Col from 'antd/es/col'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Row from 'antd/es/row'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ApplicationContext, connectUser, disconnectUser } from '../../contexts/Application'
import { connectWithNickname, SocketContext } from '../../contexts/Socket'

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
