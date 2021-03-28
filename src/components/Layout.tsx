import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Divider, Layout as AntdLayout, Menu } from 'antd'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import logo from '../assets/images/logo-default.png'
const { Header, Content, Footer, Sider } = AntdLayout

const Layout: FunctionComponent = ({ children }) => {
  const { logout, user } = useAuth0()
  const LogoutButton = () => (
    <Button
      onClick={() => logout({ returnTo: window.location.origin + '/login' })}
    >
      Logout
    </Button>
  )

  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Sider
        theme='light'
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={broken => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <SidebarImageContainer>
          <img src={logo} alt='' />
          <h2>Nature Buddies</h2>
          <Divider>Let&apos;s Grow!</Divider>
          <h3>{user?.name || user?.email}</h3>
        </SidebarImageContainer>
        <Menu theme='light' mode='inline' defaultSelectedKeys={['4']}>
          <Menu.Item key='1' icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key='2' icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key='3' icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key='4' icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <AntdLayout>
        <Header
          className='site-layout-sub-header-background'
          style={{ padding: 0, background: '#fff' }}
        >
          <LogoutButton />
        </Header>
        <Content style={{ margin: '12px 12px 0' }}>
          <div
            className='site-layout-background'
            style={{ padding: 0, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', padding: 12 }}>
          Nature Buddies @chireia
        </Footer>
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout

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
