import { Button, Divider } from 'antd'
import React, { FunctionComponent } from 'react'
import logo from '../assets/images/logo-default.png'
import {
  LoginContainer,
  LoginForm,
  LoginImageContainer,
} from '../views/login/Login'

export const DummyLogin: FunctionComponent = () => {
  const LoginButton = () => <Button>Sign In</Button>

  return (
    <LoginContainer style={{ filter: 'blur(3px)' }}>
      <LoginForm>
        <LoginImageContainer>
          <img src={logo} alt='' />
          <h2>Nature Buddies</h2>
          <Divider></Divider>
          <span>Insert your credentials to access</span>
        </LoginImageContainer>

        <div className='form-container'>
          <LoginButton />
        </div>
      </LoginForm>
    </LoginContainer>
  )
}
