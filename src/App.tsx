import { useAuth0 } from '@auth0/auth0-react'
import React, { Suspense } from 'react'
import { FullScreenLoading } from './components/FullScreenLoading'
import Layout from './components/Layout'
import { Routes } from './components/SwitchRoutes'

function App() {
  const { isAuthenticated, isLoading } = useAuth0()
  console.log(': isAuthenticated', isAuthenticated)

  if (isLoading) return <FullScreenLoading />
  return (
    <Suspense fallback={<FullScreenLoading />}>
      {isAuthenticated ? (
        <Layout>
          <Routes />
        </Layout>
      ) : (
        <Routes />
      )}
    </Suspense>
  )
}

export default App
