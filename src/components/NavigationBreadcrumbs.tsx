import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../hooks/useStore'

const NavigationBreadcrumbs: FunctionComponent = observer(() => {
  const { breadcrumbs } = useStore('layout')

  const items = breadcrumbs.map(item => (
    <Breadcrumb.Item key={item.title + item.routePath}>
      {item?.icon}
      {item.routePath ? (
        <Link to={item.routePath}>
          <span style={{ marginLeft: 8 }}>{item.title}</span>
        </Link>
      ) : (
        <span style={{ marginLeft: 8 }}>{item.title}</span>
      )}
    </Breadcrumb.Item>
  ))

  return (
    <Breadcrumb style={{ fontSize: 12 }}>
      <Breadcrumb.Item key={'home'}>
        <Link to='/'>
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>
      {items}
    </Breadcrumb>
  )
})

export default NavigationBreadcrumbs
