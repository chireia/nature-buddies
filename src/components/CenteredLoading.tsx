import { Spin } from 'antd'
import React, { FunctionComponent } from 'react'

export const CenteredLoading: FunctionComponent = ({ children }) => {
  return <Spin spinning>{children}</Spin>
}
