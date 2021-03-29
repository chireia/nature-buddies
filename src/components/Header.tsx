import { LogoutOutlined } from '@ant-design/icons'
import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const { Header } = Layout

export const LayoutHeader: FunctionComponent = () => {
  const { logout, user } = useAuth0()

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
  //
  return (
    <Header style={{ padding: '0 14px', background: '#fff' }}>
      <UserOptionsContainer>
        <Dropdown
          trigger={['click']}
          placement='bottomLeft'
          overlay={PopOverOptions}
        >
          <Avatar
            style={{ border: '1px solid #00000020', cursor: 'pointer' }}
            size='large'
            src={user.picture}
          />
        </Dropdown>
      </UserOptionsContainer>
    </Header>
  )
}

const UserOptionsContainer = styled.div`
  height: inherit;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
`
