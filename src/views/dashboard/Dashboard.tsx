import {
  CloseCircleOutlined,
  CloudOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
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
          <Panel style={{ padding: 14 }}>
            <Spin spinning={isLoadingWeather}>
              <Row gutter={8}>
                <Col span={16}>
                  <Statistic
                    title={`Today's Weather`}
                    value={weatherInfo?.main?.temp ?? '-'}
                    suffix={
                      <Row style={{ fontSize: 12, width: '100%' }}>
                        {selectedUnit === 'imperial'
                          ? `ºF ${weatherInfo?.weather?.[0].main ?? '-'}`
                          : `ºC ${weatherInfo?.weather?.[0].main ?? '-'}`}
                      </Row>
                    }
                  />
                </Col>
                <Col span={8}>
                  {locationPermissionStatus === 'prompt' && (
                    <Badge
                      count={<CloudOutlined style={{ color: '#0077ff' }} />}
                    >
                      <small
                        style={{
                          color: '#1890FF',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                        onClick={() => setGeoLocation()}
                      >
                        Allow Location to view the weather
                      </small>
                    </Badge>
                  )}
                  {locationPermissionStatus === 'denied' && (
                    <Badge
                      count={<CloseCircleOutlined style={{ color: '#f00' }} />}
                    >
                      <small>Location denied by your browser</small>
                    </Badge>
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
