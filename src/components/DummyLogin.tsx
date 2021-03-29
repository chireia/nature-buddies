import { Button, Divider } from 'antd'
import React, { FunctionComponent } from 'react'
import logo from '../assets/images/logo-default.png'
import {
  LoginButtonContainer,
  LoginContainer,
  LoginFormContainer,
  LoginImageContainer,
} from '../views/login/Login'

export const DummyLogin: FunctionComponent = () => {
  const LoginButton = () => <Button>Sign In</Button>

  return (
    <LoginContainer style={{ filter: 'blur(3px)' }}>
      <LoginFormContainer>
        <LoginImageContainer>
          <img src={logo} alt='' />
          <h2>Nature Buddies</h2>
          <Divider></Divider>
          <span>Insert your credentials to access</span>
        </LoginImageContainer>

        <LoginButtonContainer>
          <LoginButton />
        </LoginButtonContainer>
      </LoginFormContainer>
    </LoginContainer>
  )
}
