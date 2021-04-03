import { CalendarTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import {
  Alert,
  Badge,
  Button,
  Calendar,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Spin,
} from 'antd'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useStore } from '../../hooks/useStore'
import {
  Plant,
  PlantDataPoint,
  PlantDataPointFormData,
} from '../../interfaces/plant'

interface MyPlantDataPointModalProps {
  plant: Plant
}

export const MyPlantDataPointModal: FunctionComponent<MyPlantDataPointModalProps> = observer(
  ({ plant }) => {
    const [visible, setVisible] = useState(false)
    const {
      isLoadingPlant,
      isRemovingDataPoint,
      isAddingDataPoint,
      loadPlants,
      addDataPoint,
      removePlantDataPoint,
    } = useStore('plant')
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      resetForm,
    } = useFormik({
      validationSchema,
      initialValues: {
        plantId: plant.id,
        id: undefined,
        date: moment().toISOString(),
        soilMoisture: undefined,
        soilTemperatureF: undefined,
        soilTemperatureC: undefined,
        airTemperatureF: undefined,
        airTemperatureC: undefined,
      } as PlantDataPointFormData,
      onSubmit: async formValues => {
        const point = await addDataPoint(formValues)
        await loadPlants()
        setFieldValue('id', point.id)
      },
    })

    const handleDateChange = (date: moment.Moment) => {
      setFieldValue('date', date.toISOString())
      const filteredPoint = plant.dataPoints.find(point => {
        const pointDate = moment(point.date).format('MM/DD/YYYY')
        const actualDate = date.format('MM/DD/YYYY')
        return pointDate === actualDate
      })

      if (filteredPoint)
        return resetForm({
          values: { ...filteredPoint, plantId: plant.id },
        })
      return resetForm({
        values: { plantId: plant.id, date: date.toISOString() },
      })
    }

    const handleRemoveDataPoint = async (dataPoint: PlantDataPointFormData) => {
      const { id, plantId, date } = dataPoint
      if (!id) return
      await removePlantDataPoint(id)
      await loadPlants()
      resetForm({ values: { plantId, date } })
    }

    const ModalFooter = (
      <>
        {values.id && (
          <Popconfirm
            placement='leftTop'
            title='Are your sure?'
            onConfirm={() => handleRemoveDataPoint(values)}
            okText='Delete'
            cancelText='Cancel'
            okButtonProps={{ danger: true }}
          >
            <Button danger loading={isRemovingDataPoint}>
              Remove
            </Button>
          </Popconfirm>
        )}
        <Button
          style={{ marginLeft: 8 }}
          loading={isAddingDataPoint}
          type='primary'
          onClick={() => {
            handleSubmit()
          }}
        >
          Save
        </Button>
      </>
    )

    useEffect(() => {
      handleDateChange(moment())
    }, [visible])

    return (
      <>
        <Modal
          title={`${plant.name} - Status`}
          width={780}
          okText='Submit'
          cancelText='Close'
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={ModalFooter}
        >
          <Form layout='vertical'>
            <Input name='id' hidden value={values.id} />
            <Input name='plantId' hidden value={plant.id} />
            <Spin spinning={isLoadingPlant}>
              <Row>
                <Col span={10}>
                  <Calendar
                    mode='month'
                    fullscreen={false}
                    onChange={handleDateChange}
                    value={values.date ? moment(values.date) : undefined}
                    dateFullCellRender={date =>
                      dateFullCellRender(date, plant.dataPoints)
                    }
                  />
                </Col>
                <Col>
                  <Divider type='vertical' style={{ height: '100%' }} />
                </Col>
                <Col span={13}>
                  <Form.Item
                    hasFeedback
                    label='Selected Date'
                    help={!!touched.date && errors.date}
                    validateStatus={
                      !!touched.date && !!errors.date ? 'error' : undefined
                    }
                  >
                    <DatePicker
                      disabled
                      allowClear={false}
                      style={{ width: '100%' }}
                      name='date'
                      format='MM/DD/YYYY'
                      onChange={date =>
                        setFieldValue('date', date ?? undefined)
                      }
                      onBlur={handleBlur}
                      value={values.date ? moment(values.date) : undefined}
                    />
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    label='Soil Moisture (%)'
                    help={!!touched.soilMoisture && errors.soilMoisture}
                    validateStatus={
                      !!touched.soilMoisture && !!errors.soilMoisture
                        ? 'error'
                        : undefined
                    }
                  >
                    <Input
                      type='number'
                      name='soilMoisture'
                      placeholder='Percentage'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.soilMoisture}
                    />
                  </Form.Item>
                  <Row gutter={14} justify='space-between'>
                    <Col>
                      <Form.Item
                        hasFeedback
                        label='Soil Temperature (Celcius)'
                        help={
                          !!touched.soilTemperatureC && errors.soilTemperatureC
                        }
                        validateStatus={
                          !!touched.soilTemperatureC &&
                          !!errors.soilTemperatureC
                            ? 'error'
                            : undefined
                        }
                      >
                        <Input
                          type='number'
                          name='soilTemperatureC'
                          onChange={event => {
                            handleChange(event)
                            setFieldValue(
                              'soilTemperatureF',
                              computedTemperature(event.target.value, 'c')
                            )
                          }}
                          onBlur={handleBlur}
                          value={values.soilTemperatureC}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        hasFeedback
                        label='Soil Temperature (Fahrenheit)'
                        help={
                          !!touched.soilTemperatureF && errors.soilTemperatureF
                        }
                        validateStatus={
                          !!touched.soilTemperatureF &&
                          !!errors.soilTemperatureF
                            ? 'error'
                            : undefined
                        }
                      >
                        <Input
                          type='number'
                          name='soilTemperatureF'
                          onChange={event => {
                            handleChange(event)
                            setFieldValue(
                              'soilTemperatureC',
                              computedTemperature(event.target.value, 'f')
                            )
                          }}
                          onBlur={handleBlur}
                          value={values.soilTemperatureF}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        hasFeedback
                        label='Air Temperature (Celcius)'
                        help={
                          !!touched.airTemperatureC && errors.airTemperatureC
                        }
                        validateStatus={
                          !!touched.airTemperatureC && !!errors.airTemperatureC
                            ? 'error'
                            : undefined
                        }
                      >
                        <Input
                          type='number'
                          name='airTemperatureC'
                          onChange={event => {
                            handleChange(event)
                            setFieldValue(
                              'airTemperatureF',
                              computedTemperature(event.target.value, 'c')
                            )
                          }}
                          onBlur={handleBlur}
                          value={values.airTemperatureC}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        hasFeedback
                        label='Air Temperature (Fahrenheit)'
                        help={
                          !!touched.airTemperatureF && errors.airTemperatureF
                        }
                        validateStatus={
                          !!touched.airTemperatureF && !!errors.airTemperatureF
                            ? 'error'
                            : undefined
                        }
                      >
                        <Input
                          type='number'
                          name='airTemperatureF'
                          onChange={event => {
                            handleChange(event)
                            setFieldValue(
                              'airTemperatureC',
                              computedTemperature(event.target.value, 'f')
                            )
                          }}
                          value={values.airTemperatureF}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {errors.plantId && touched.plantId && (
                    <Alert type='error' message={errors.plantId} banner />
                  )}
                </Col>
              </Row>
            </Spin>
          </Form>
        </Modal>
        <Button
          icon={<CalendarTwoTone twoToneColor='#1890FF' />}
          type='default'
          shape='circle'
          onClick={() => setVisible(true)}
        />
      </>
    )
  }
)

const validationSchema = Yup.object()
  .shape({
    plantId: Yup.string().required(),
    date: Yup.date().required(),
    soilMoisture: Yup.number().min(0).max(100),
    soilTemperatureF: Yup.number(),
    soilTemperatureC: Yup.number(),
    airTemperatureF: Yup.number(),
    airTemperatureC: Yup.number(),
  })
  .test(
    'at-least-one',
    'you must provide at least one value',
    (values, context) => {
      if (
        !(
          values.soilMoisture !== undefined ||
          values.airTemperatureC ||
          values.airTemperatureF ||
          values.soilTemperatureC ||
          values.soilTemperatureF
        )
      )
        return context.createError({
          path: `plantId`,
          message: 'You must provide at least one status',
        })
      return true
    }
  )

const computedTemperature = (temp: string, actualMetric: 'c' | 'f') => {
  if (!temp) return undefined
  if (actualMetric === 'c')
    return parseFloat(
      Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2,
      }).format(parseFloat(temp) * (9 / 5) + 32)
    )
  return parseFloat(
    Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format((parseFloat(temp) - 32) * (5 / 9))
  )
}

const dateFullCellRender = (
  current: moment.Moment,
  dataPoints: PlantDataPoint[]
) => {
  const showBadge = dataPoints
    .map(point => moment(point.date).format('MM/DD/YYYY'))
    .includes(current.format('MM/DD/YYYY'))

  if (showBadge)
    return (
      <Badge
        style={{ zIndex: 2 }}
        className='ant-picker-cell-inner'
        count={<CheckCircleTwoTone twoToneColor='#52c41a' />}
      >
        {current.date()}
      </Badge>
    )
  return <div className='ant-picker-cell-inner'>{current.date()}</div>
}
