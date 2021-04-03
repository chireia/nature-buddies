import { LoadingOutlined } from '@ant-design/icons'
import { Auth0Provider } from '@auth0/auth0-react'
import { Spin } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { configure } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { makeServer } from './server'

// Antd configs
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />)

// MobX configs
configure({
  enforceActions: 'never',
})

// Mirage Configs
makeServer()

ReactDOM.render(
  <Auth0Provider
    domain='chireia.us.auth0.com'
    clientId='jzf5QNADhEIn3FXA7UiB0PFME4tRpI0z'
    redirectUri={window.location.origin}
  >
    {/* Disable StrictMode while antd does not support it
      https://github.com/ant-design/ant-design/issues/26136
      <React.StrictMode> */}
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
    {/* </React.StrictMode> */}
  </Auth0Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
