import { LogoutOutlined } from '@ant-design/icons'
import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { useStore } from '../hooks/useStore'
import NavigationBreadcrumbs from './NavigationBreadcrumbs'

const { Header } = Layout

export const LayoutHeader: FunctionComponent = () => {
  const { logout, user } = useAuth0()
  const { pageTitle } = useStore('layout')

  const PopOverOptions = (
    <Menu>
      <Menu.Item>
        <Button
          icon={<LogoutOutlined />}
          type='link'
          onClick={() =>
            logout({ returnTo: window.location.origin + '/login' })
          }
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header style={{ padding: '0 14px', background: '#fff' }}>
      <Row
        style={{ minHeight: '100%', lineHeight: '1.5715' }}
        justify='space-between'
        align='middle'
      >
        <Col>
          <h1 style={{ marginBottom: 0 }}>{pageTitle}</h1>
          <NavigationBreadcrumbs />
        </Col>
        <Col>
          <Dropdown
            trigger={['click']}
            placement='bottomRight'
            overlay={PopOverOptions}
          >
            <Avatar
              style={{ border: '1px solid #00000020', cursor: 'pointer' }}
              size='large'
              src={user.picture}
            />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  )
}
