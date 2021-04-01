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
            padding: '12px 12px 0',
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
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
