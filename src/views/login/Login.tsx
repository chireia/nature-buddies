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
  const LoginButton = () => (
    <Button onClick={() => loginWithRedirect()}>Sign In</Button>
  )

  useEffect(() => {
    if (isAuthenticated) {
      push('/')
    }
  }, [isAuthenticated])

  return (
    <LoginContainer>
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

export default Login

const LoginContainer = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`
const LoginForm = styled.section`
  position: relative;
  right: 20vw;
  width: 350px;
  padding-top: 20px;
  border-radius: 5px;
  background-color: #fff;

  .form-container {
    width: 100%;
    height: auto;
    padding: 20px;
    display: flex;
    flex-flow: column wrap;

    .form {
      display: flex;
      flex-flow: column wrap;

      .btn-container {
        .form__btn {
          flex-basis: 100%;
          width: 100%;
        }
      }
    }
  }
`
const LoginImageContainer = styled.div`
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
