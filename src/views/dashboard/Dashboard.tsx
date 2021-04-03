import { CloudTwoTone, DashboardOutlined } from '@ant-design/icons'
import { Badge, Col, Row, Spin, Statistic, Switch } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { FunctionComponent, useEffect, useLayoutEffect } from 'react'
import { Panel } from '../../components/styled/Panel'
import { useAsPage } from '../../hooks/useAsPage'
import { useStore } from '../../hooks/useStore'
import { PlantGraph } from './PlantGraph'

const Dashboard: FunctionComponent = observer(() => {
  const { isLoadingPlant, plants, loadPlants } = useStore('plant')
  const {
    weatherInfo,
    selectedUnit,
    isLoadingWeather,
    locationPermissionStatus,
    setSelectedUnit,
    setGeoLocation,
    loadWeather,
  } = useStore('weather')

  useAsPage({
    title: 'Dashboard',
    breadcrumbs: [{ title: 'Dashboard', icon: <DashboardOutlined /> }],
  })

  useEffect(() => {
    loadPlants()
  }, [])

  useLayoutEffect(() => {
    loadWeather({ units: selectedUnit })
  }, [locationPermissionStatus, selectedUnit])

  return (
    <>
      <Row gutter={14} style={{ marginBottom: 14 }} justify='space-between'>
        <Col span={6}>
          <Panel style={{ padding: 14 }}>
            <Statistic title='Total Plants' value={plants.length} />
          </Panel>
        </Col>
        <Col span={6}>
          <Panel style={{ padding: 14 }}>
            <Statistic
              title='Active Plants'
              value={plants.filter(plant => plant.dataPoints.length).length}
            />
          </Panel>
        </Col>
        <Col span={6}>
          <Panel style={{ padding: 14 }}>
            <Statistic
              title='Total Data Points'
              value={plants.flatMap(plant => plant.dataPoints).length}
            />
          </Panel>
        </Col>
        <Col span={6}>
          <Badge
            className='ant-col ant-col-24'
            style={{ fontSize: 20 }}
            count={renderBadgeIcon(locationPermissionStatus)}
          >
            <Panel
              onClick={() => setGeoLocation()}
              style={{ padding: 14, width: '100%', cursor: 'pointer' }}
            >
              <Spin spinning={isLoadingWeather}>
                <Row gutter={8}>
                  <Col span={16}>
                    <Statistic
                      title={weatherInfo?.name ?? `Today's Weather`}
                      value={weatherInfo?.main?.temp ?? '-'}
                      suffix={
                        <Row style={{ fontSize: 12, width: '100%' }}>
                          {selectedUnit === 'imperial'
                            ? `ºF ${weatherInfo?.weather?.[0].main ?? ''}`
                            : `ºC ${weatherInfo?.weather?.[0].main ?? ''}`}
                        </Row>
                      }
                    />
                  </Col>
                  <Col span={8}>
                    {locationPermissionStatus === 'prompt' && (
                      <small>Allow browser location to view the weather</small>
                    )}
                    {locationPermissionStatus === 'granted' && (
                      <Row justify='end'>
                        <Switch
                          checked={selectedUnit === 'imperial'}
                          checkedChildren='F'
                          unCheckedChildren='C'
                          onChange={checked =>
                            setSelectedUnit(checked ? 'imperial' : 'metric')
                          }
                        />
                      </Row>
                    )}
                  </Col>
                </Row>
              </Spin>
            </Panel>
          </Badge>
        </Col>
      </Row>
      <Spin spinning={isLoadingPlant}>
        <Row
          style={{ minHeight: '80%' }}
          gutter={[14, 14]}
          justify='space-around'
          align='middle'
        >
          {!isLoadingPlant &&
            plants.map(plant => <PlantGraph key={plant.id} plant={plant} />)}
        </Row>
      </Spin>
    </>
  )
})

export default Dashboard

const renderBadgeIcon = (permission?: PermissionState) => {
  if (!permission) return
  if (permission === 'denied') return <CloudTwoTone twoToneColor='#f00' />
  if (permission === 'prompt') return <CloudTwoTone twoToneColor='#ff9900' />
  return <CloudTwoTone twoToneColor='#4BBB47' />
}
