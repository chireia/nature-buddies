import { useAuth0 } from '@auth0/auth0-react'
import React, { Suspense } from 'react'
import { FullScreenLoading } from './components/FullScreenLoading'
import Layout from './components/Layout'
import { Routes } from './components/SwitchRoutes'

function App() {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <FullScreenLoading dummyLogin />
  return isAuthenticated ? (
    <Layout>
      <Suspense fallback={<FullScreenLoading />}>
        <Routes />
      </Suspense>
    </Layout>
  ) : (
    <Suspense fallback={<FullScreenLoading dummyLogin />}>
      <Routes />
    </Suspense>
  )
}

export default App
