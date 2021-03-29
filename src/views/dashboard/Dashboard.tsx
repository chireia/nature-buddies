import React, { FunctionComponent } from 'react'
import { useAsPage } from '../../hooks/useAsPage'

const Dashboard: FunctionComponent = () => {
  useAsPage({
    title: 'Dashboard',
    breadcrumbs: [{ title: 'Dashboard' }],
  })

  return <>Dashboard</>
}

export default Dashboard
