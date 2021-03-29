import {
  ControlOutlined,
  DashboardOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import { useAuth0 } from '@auth0/auth0-react'
import { Divider, Layout, Menu } from 'antd'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/images/logo-default.png'

const { Sider } = Layout
const { SubMenu } = Menu

export const LayoutSidebar: FunctionComponent = () => {
  const { user } = useAuth0()
  return (
    <Sider theme='light' breakpoint='lg' collapsedWidth='0'>
      <SidebarImageContainer
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <img src={logo} alt='' />
        <h2>Nature Buddies</h2>
        <Divider>Let&apos;s Grow!</Divider>
        <h3>{user.email === user.name ? user.nickname : user.name}</h3>
      </SidebarImageContainer>
      <Menu theme='light' mode='inline' defaultSelectedKeys={['4']}>
        <Menu.Item key='1' icon={<DashboardOutlined />}>
          <Link to='/'>Dashboard</Link>
        </Menu.Item>
        <SubMenu title='My Plants' icon={<HeartOutlined />}>
          <Menu.Item key='2' icon={<ControlOutlined />}>
            <Link to='/my-plants'>Manage</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

const SidebarImageContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 20px;
  img {
    width: 100px;
  }
  h2 {
    margin-bottom: 0;
  }
`
