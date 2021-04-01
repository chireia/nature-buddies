import { HeartOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { FunctionComponent, useState } from 'react'
import * as Yup from 'yup'
import { useStore } from '../../hooks/useStore'
import { PlantFormData } from '../../interfaces/plants'

export const MyPlantFormModal: FunctionComponent = observer(() => {
  const { isAddingPlant, addPlant, loadPlants } = useStore('plant')
  const [visible, setVisible] = useState(false)
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      type: '',
    } as PlantFormData,
    onSubmit: async formValues => {
      await addPlant(formValues)
      await loadPlants()
      resetForm()
    },
  })

  return (
    <>
      <Modal
        title={`Fill with your plant's information:`}
        width={360}
        okText='Save'
        visible={visible}
        onCancel={() => {
          setVisible(false)
          resetForm()
        }}
        onOk={() => handleSubmit()}
        confirmLoading={isAddingPlant}
      >
        <Form layout={'vertical'} requiredMark='optional'>
          <Form.Item
            required
            hasFeedback
            label='Plant Name'
            help={!!touched.name && errors.name}
            validateStatus={
              !!touched.name && !!errors.name ? 'error' : undefined
            }
          >
            <Input
              name='name'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Lettuce'
              value={values.name}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            label='Plant Type'
            help={!!touched.type && errors.type}
            validateStatus={
              !!touched.type && !!errors.type ? 'error' : undefined
            }
          >
            <Input
              name='type'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Iceberg'
              value={values.type}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button type='primary' onClick={() => setVisible(true)}>
        <HeartOutlined style={{ marginRight: 8 }} /> Add a Plant
      </Button>
    </>
  )
})

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().optional(),
})
