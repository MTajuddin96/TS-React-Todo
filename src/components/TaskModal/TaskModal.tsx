import { DeleteOutlined } from "@ant-design/icons";
import { Form, Button, Popconfirm } from "antd"
import Modal from "antd/lib/modal/Modal"
import moment from "moment";
import { useRef } from "react";
import { FormDatePicker, FormHiddenSubmitButton, FormInput, FormInputArea, FormSelect, FormTimePicker } from "../FormItems/FormItems"
import './TaskModal.scss'
import proptypes from 'prop-types'
import { TodoTask } from "../TodoTask/Todo.interface";


const TaskModal = ({ modalVisible, setModalVisible, onAdd, currentTask, setCurrentTask, onUpdate, onDelete }:
  { modalVisible: boolean, setModalVisible: Function, onAdd: Function, currentTask: { values: TodoTask, id: string }, setCurrentTask: Function, onUpdate: Function, onDelete: Function }
) => {
  const [form] = Form.useForm();
  const submitRef = useRef<any>()

  const onFinishFailed = ({ errorFields }: { errorFields: any }) => {
    form.scrollToField(errorFields[0].name);
  };

  const options = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ]
  const onClose = () => {
    setCurrentTask(null)
    setModalVisible(false)
    form.resetFields()
  }
  return (
    <Modal
      className='todo_modal'
      style={{ borderRadius: 8 }}
      bodyStyle={{ borderRadius: 8 }}
      destroyOnClose
      title={currentTask ? 'Update Todo' : 'Add Todo'}
      onOk={() => currentTask ? !currentTask.values.isCompleted ? submitRef.current.click() : onClose() : submitRef.current.click()}
      visible={modalVisible}
      onCancel={onClose}>
      <Form className='form' layout='vertical' form={form} preserve={false} onFinishFailed={onFinishFailed} onFinish={(values) => {
        if (currentTask) {
          onUpdate(values, currentTask.id)
          onClose()
        } else {
          onAdd(values)
          onClose()
        }
        setModalVisible(false)
      }}>
        <FormInput label='Task' name='task' required type='text' placeholder='Enter Task' initialValue={currentTask ? currentTask.values.task : ''} styles={null}  />
        <div className='todo_date_container'>
          <FormDatePicker label='Date' name='date' required initialValue={currentTask ? moment(currentTask.values.date) : null} styles={null} />
          <FormTimePicker label='Time' name='time' required initialValue={currentTask ? moment(currentTask.values.time) : null} styles={null} />
        </div>
        <FormSelect label='Priority' name='priority' options={options} placeholder='Select Priority' required initialValue={currentTask ? currentTask.values.priority : ''} styles={null} />
        <FormInputArea label='description' name='description' placeholder='description' initialValue={currentTask ? currentTask.values.description : ''} styles={null} message="" required={false} />
        <FormHiddenSubmitButton submitRef={submitRef} />
        {currentTask ?
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Popconfirm title='Are you sure to delete this task?' onConfirm={() => {
              onDelete(currentTask.id)
              setModalVisible(false)
            }}>
              <Button icon={<DeleteOutlined />} type={'text'} style={{ marginRight: 8 }}>
              </Button>
            </Popconfirm>
            <Button onClick={() => {
              form.validateFields().then(values => {
                onUpdate({ ...values, isCompleted: !currentTask.values.isCompleted }, currentTask.id)
                onClose()
              }).catch(err => {
                form.scrollToField(err?.errorFields[0])
              })
            }} type='primary'>{currentTask && !currentTask.values.isCompleted ? 'Mark Complete' : 'Mark Incomplete'}</Button>
          </div> : null}
      </Form>
    </Modal >
  )
}

TaskModal.propTypes = {
  modalVisible: proptypes.bool.isRequired,
  setModalVisible: proptypes.func.isRequired,
  onAdd: proptypes.func.isRequired,
  currentTask: proptypes.object.isRequired,
  setCurrentTask: proptypes.func.isRequired,
  onUpdate: proptypes.func.isRequired,
  onDelete: proptypes.func.isRequired
};

export default TaskModal
