import { HeartOutlined } from '@ant-design/icons'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useAsPage } from '../../hooks/useAsPage'
import { Plant } from '../../interfaces/plants'

const MyPlantsIndex: FunctionComponent = () => {
  useAsPage({
    title: 'My Plants',
    breadcrumbs: [{ title: 'My Plants', icon: <HeartOutlined /> }],
  })
  const getPlants = async () => await fetch('/api/plant')
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    getPlants()
      .then(res => res.json())
      .then(json => setPlants(json.plants))
  }, [])
  return (
    <>
      {plants.map(plant => (
        <li key={plant.id}>{plant.id + plant.name + plant.type}</li>
      ))}
    </>
  )
}

export default MyPlantsIndex
