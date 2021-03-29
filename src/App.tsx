import { useAuth0 } from '@auth0/auth0-react'
import React, { Suspense } from 'react'
import { FullScreenLoading } from './components/FullScreenLoading'
import Layout from './components/Layout'
import { Routes } from './components/SwitchRoutes'
import { useStore } from './hooks/useStore'
import { Helmet } from 'react-helmet-async'
import { observer } from 'mobx-react-lite'

const App = observer(() => {
  const { isAuthenticated, isLoading } = useAuth0()
  const { pageTitle } = useStore('layout')
  const title = pageTitle ? `${pageTitle} - Nature Buddies` : 'Nature Buddies'

  if (isLoading) return <FullScreenLoading dummyLogin />
  return isAuthenticated ? (
    <Layout>
      <Helmet title={title} />
      <Suspense fallback={<FullScreenLoading />}>
        <Routes />
      </Suspense>
    </Layout>
  ) : (
    <>
      <Helmet title={title} />
      <Suspense fallback={<FullScreenLoading dummyLogin />}>
        <Routes />
      </Suspense>
    </>
  )
})

export default App
