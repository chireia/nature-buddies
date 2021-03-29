import { Spin } from 'antd'
import React, { FunctionComponent } from 'react'
import { DummyLogin } from './DummyLogin'

interface FullScreenLoadingProps {
  dummyLogin?: boolean
}

export const FullScreenLoading: FunctionComponent<FullScreenLoadingProps> = ({
  dummyLogin,
}) => {
  return (
    <Spin
      spinning
      style={{
        minHeight: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {dummyLogin && <DummyLogin />}
    </Spin>
  )
}
