import { Result, Button } from 'antd'
import React, { FunctionComponent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FullHeightCenterScreen } from '../../components/styled/FullHeightCenterScreen'

const NotAuthenticated: FunctionComponent = () => {
  const { goBack } = useHistory()
  const extraOptions = (
    <>
      <Button onClick={goBack} type='default'>
        Back
      </Button>
      <Link to='/login'>
        <Button type='link'>Login</Button>
      </Link>
    </>
  )
  return (
    <FullHeightCenterScreen>
      <Result
        status='403'
        title='403'
        subTitle='Sorry, you are not authorized to access this page.'
        extra={extraOptions}
      />
    </FullHeightCenterScreen>
  )
}

export default NotAuthenticated
