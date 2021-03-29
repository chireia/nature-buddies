import { Button, Divider } from 'antd'
import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../../assets/images/logo-default.png'
import background from '../../assets/images/login-background.jpg'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from 'react-router'

const Login: FunctionComponent = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const { push } = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      push('/')
    }
  }, [isAuthenticated])

  return (
    <LoginContainer>
      <LoginFormContainer>
        <LoginImageContainer>
          <img src={logo} alt='' />
          <h2>Nature Buddies</h2>
          <Divider></Divider>
          <span>Insert your credentials to access</span>
        </LoginImageContainer>

        <LoginButtonContainer>
          <Button onClick={() => loginWithRedirect()}>Sign In</Button>
        </LoginButtonContainer>
      </LoginFormContainer>
    </LoginContainer>
  )
}

export default Login

export const LoginContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const LoginFormContainer = styled.section`
  position: relative;
  right: 20vw;
  width: 350px;
  padding-top: 20px;
  border-radius: 5px;
  background-color: #fff;
`
export const LoginImageContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  img {
    width: 100px;
  }
  h2 {
    margin-bottom: 0;
  }
`
export const LoginButtonContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-flow: column wrap;
  flex-basis: 100%;
  width: 100%;
`
