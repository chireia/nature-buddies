import { Layout as AntdLayout } from 'antd'
import React, { FunctionComponent } from 'react'
import { LayoutFooter } from './Footer'
import { LayoutHeader } from './Header'
import { LayoutSidebar } from './Sidebar'
const { Content } = AntdLayout

const Layout: FunctionComponent = ({ children }) => {
  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <LayoutSidebar />
      <AntdLayout>
        <LayoutHeader />
        <Content
          style={{
            margin: '12px 12px 0',
            padding: 0,
          }}
        >
          {children}
        </Content>
        <LayoutFooter />
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout
