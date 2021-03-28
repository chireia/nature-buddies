import { Spin } from 'antd'
import React, { FunctionComponent } from 'react'
import { DummyLogin } from './DummyLogin'

export const FullScreenLoading: FunctionComponent = () => {
  return (
    <Spin spinning style={{ minHeight: '100vh' }}>
      <DummyLogin />
    </Spin>
  )
}
