import React, { FunctionComponent } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

export const LayoutFooter: FunctionComponent = () => {
  return (
    <Footer style={{ textAlign: 'center', padding: 12 }}>
      Nature Buddies @chireia
    </Footer>
  )
}
