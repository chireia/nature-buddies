import { LoadingOutlined } from '@ant-design/icons'
import { Auth0Provider } from '@auth0/auth0-react'
import { Spin } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />)

ReactDOM.render(
  <Auth0Provider
    domain='chireia.us.auth0.com'
    clientId='jzf5QNADhEIn3FXA7UiB0PFME4tRpI0z'
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
