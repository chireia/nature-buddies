import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React, { FunctionComponent } from 'react'

export const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />

export const CenteredLoading: FunctionComponent = ({ children }) => {
  return (
    <Spin spinning indicator={antIcon}>
      {children}
    </Spin>
  )
}
