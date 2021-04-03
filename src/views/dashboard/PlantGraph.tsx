import { Col, Empty, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Panel, PanelTitle } from '../../components/styled/Panel'
import { useStore } from '../../hooks/useStore'
import { Plant } from '../../interfaces/plant'

interface PlantGraphProps {
  plant: Plant
}

export const PlantGraph: FunctionComponent<PlantGraphProps> = observer(
  ({ plant }) => {
    const { isLoadingPlant } = useStore('plant')
    const { selectedUnit } = useStore('weather')

    return (
      <Col key={plant.id} span={12}>
        <Spin spinning={isLoadingPlant}>
          <Panel style={{ height: 350 }}>
            <PanelTitle>
              <Link style={{ color: 'inherit' }} to='/my-plants'>
                {plant.name} <small>{plant.type}</small>
              </Link>
              <small>
                Last update:{' '}
                {plant.dataPoints.length
                  ? moment(
                      plant.dataPoints[plant.dataPoints.length - 1].date
                    ).format('L')
                  : 'No data'}
              </small>
            </PanelTitle>
            {!plant.dataPoints.length ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{
                  height: 292,
                  margin: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  flexFlow: 'column nowrap',
                }}
              />
            ) : (
              <ResponsiveContainer height={292}>
                <LineChart
                  data={plant.dataPoints}
                  margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
                >
                  <Line
                    type='monotone'
                    dataKey='soilMoisture'
                    stroke='#A97C50'
                  />
                  <Line
                    type='monotone'
                    dataKey={
                      selectedUnit === 'imperial'
                        ? 'soilTemperatureF'
                        : 'soilTemperatureC'
                    }
                    stroke='#8763ec'
                  />
                  <Line
                    onChange={props => console.log(props)}
                    type='monotone'
                    dataKey={
                      selectedUnit === 'imperial'
                        ? 'airTemperatureF'
                        : 'airTemperatureC'
                    }
                    stroke='#256eff'
                  />
                  <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
                  <Tooltip
                    labelStyle={{ fontWeight: 'bold' }}
                    labelFormatter={(label: string) =>
                      moment(label).format('L')
                    }
                    formatter={(value: number, name: string) => [
                      value,
                      formatLegend(name),
                    ]}
                  />
                  <Legend
                    width={556}
                    verticalAlign='top'
                    height={36}
                    formatter={value => formatLegend(value)}
                  />
                  <XAxis
                    fontSize='12'
                    dataKey='date'
                    tickFormatter={value => moment(value).format('MM/DD')}
                  />
                  <YAxis fontSize='12' />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Panel>
        </Spin>
      </Col>
    )
  }
)

const formatLegend = (rawLegend: string) => {
  switch (rawLegend) {
    case 'soilMoisture':
      return 'Soil Moisture (%)'
    case 'airTemperatureF':
      return 'Air Temperature (F)'
    case 'airTemperatureC':
      return 'Air Temperature (C)'
    case 'soilTemperatureF':
      return 'Soil Temperature (F)'
    case 'soilTemperatureC':
      return 'Soil Temperature (C)'
    default:
      return '-'
  }
}
