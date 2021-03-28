import { Spin } from 'antd'
import React, { FunctionComponent } from 'react'
import { antIcon } from './CenteredLoading'
import { FullHeightCenterScreen } from './styled/FullHeightCenterScreen'

export const FullScreenLoading: FunctionComponent = () => {
  return (
    <FullHeightCenterScreen>
      <Spin spinning indicator={antIcon}></Spin>
    </FullHeightCenterScreen>
  )
}
