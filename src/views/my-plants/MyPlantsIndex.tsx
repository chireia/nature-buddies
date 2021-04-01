import { DeleteTwoTone, HeartOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Spin, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { observer } from 'mobx-react-lite'
import React, { FunctionComponent, useEffect } from 'react'
import { Panel, PanelTitle } from '../../components/styled/Panel'
import { useAsPage } from '../../hooks/useAsPage'
import { useStore } from '../../hooks/useStore'
import { Plant, PlantDataPoint } from '../../interfaces/plants'
import { MyPlantDataPointModal } from './MyPlantDataPointModal'
import { MyPlantFormModal } from './MyPlantFormModal'

const MyPlantsIndex: FunctionComponent = observer(() => {
  const { loadPlants, removePlant, isLoadingPlant, plants } = useStore('plant')

  const getLastDate = (dataPointList: PlantDataPoint[]) => {
    dataPointList
    return '-'
  }

  const handleRemovePlant = async (plantId: string) => {
    await removePlant(plantId)
    await loadPlants()
  }

  useAsPage({
    title: 'My Plants',
    breadcrumbs: [{ title: 'My Plants', icon: <HeartOutlined /> }],
  })

  useEffect(() => {
    loadPlants()
  }, [])

  return (
    <Panel>
      <PanelTitle>
        <span>My Plants</span>
        <MyPlantFormModal />
      </PanelTitle>
      <Spin spinning={isLoadingPlant}>
        <Table dataSource={plants} rowKey='id'>
          <Column title='Name' dataIndex='name' key='1' />
          <Column title='Type' dataIndex='type' key='2' />
          <Column<Plant>
            title='Last Update'
            key='3'
            align='center'
            render={(_, { dataPoints }) => getLastDate(dataPoints)}
          />
          <Column<Plant>
            key='4'
            title='Actions'
            dataIndex=''
            align='center'
            width={136}
            render={(_, plant) => {
              return (
                <>
                  <MyPlantDataPointModal plant={plant} />
                  <Popconfirm
                    placement='leftTop'
                    title='Are your sure?'
                    onConfirm={() => handleRemovePlant(plant.id)}
                    okText='Delete'
                    cancelText='Cancel'
                    okButtonProps={{ danger: true }}
                  >
                    <Button
                      style={{ marginLeft: 8 }}
                      icon={<DeleteTwoTone twoToneColor='#ff4242' />}
                      type='default'
                      shape='circle'
                    ></Button>
                  </Popconfirm>
                </>
              )
            }}
          />
        </Table>
      </Spin>
    </Panel>
  )
})

export default MyPlantsIndex
