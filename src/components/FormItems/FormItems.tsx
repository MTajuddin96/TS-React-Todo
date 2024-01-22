import { Input, Form, DatePicker, Select, Switch, Button, TimePicker } from "antd"
import './FormItems.scss'

const FormItem = Form.Item
const { Option } = Select;
const { TextArea } = Input;

export const FormInput = ({ name, required, type, label, placeholder, initialValue, styles }: { name: string, required: boolean, type: string, label: string, placeholder: string, initialValue: string, styles: any }) => {
  return <FormItem
    initialValue={initialValue}
    label={label}
    name={name}
    rules={[
      {
        required,
        message: 'Please input task',
      },

      {
        type: type === 'email' ? 'email' : null,
        message: 'The input is not valid E-mail!'
      },

    ]}
  >
    <Input placeholder={placeholder} className='form_item' style={styles} type={type === 'email' ? 'text' : type} />

  </FormItem>
}

export const FormDatePicker = ({ name, required, label, initialValue, styles }: { name: string, required: boolean, label: string, initialValue: any, styles: any }) => {
  return <FormItem
    initialValue={initialValue}
    label={label}
    name={name}
    rules={[
      {
        required,
        message: 'Please input task',
      },
    ]}
  >
    <DatePicker className='form_item' style={{ ...styles, marginRight: 12 }} />

  </FormItem>
}
export const FormTimePicker = ({ name, required, label, initialValue, styles }: { name: string, required: boolean, label: string, initialValue: any, styles: any }) => {
  return <FormItem
    initialValue={initialValue}
    label={label}
    name={name}
    rules={[
      {
        required,
        message: 'Please input task',
      },
    ]}
  >
    <TimePicker className='form_item' format={'HH:mm'} style={styles} />

  </FormItem>
}

export const FormSelect = ({ name, required, label, placeholder, options, initialValue, styles }: { name: string, required: boolean, label: string, placeholder: string, options: { value: string, label: string }[], initialValue: string, styles: any }) => {
  return <FormItem
    label={label}
    initialValue={initialValue}
    name={name}
    rules={[
      {
        required,
        message: 'Please input task',
      },
    ]}
  >
    <Select className='form_item' placeholder={placeholder} style={styles}>
      {options.length ? options.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>) : null}
    </Select>

  </FormItem>
}

export const FormSwitch = ({ name, required, label, initialValue }: { name: string, required: boolean, label: string, initialValue: boolean }) => {
  return <FormItem
    initialValue={initialValue}
    label={label}
    name={name}
    valuePropName="checked"
    rules={[
      {
        required,
        message: 'Please input task',
      },
    ]}
  >
    <Switch />

  </FormItem>
}
export const FormHiddenSubmitButton = ({ submitRef }: { submitRef: any }) => {
  return <Form.Item
    style={{ display: 'none' }}
    wrapperCol={{
      offset: 8,
      span: 16,
    }}
  >
    <Button ref={submitRef} type="primary" htmlType="submit">
    </Button>
  </Form.Item>
}

export const FormInputArea = ({ name, required, label, placeholder, message, initialValue, styles }: { name: string, required: boolean, label: string, placeholder: string, message: string, initialValue: string, styles: any }) => {
  return <FormItem
    initialValue={initialValue}
    label={label}
    name={name}
    rules={[
      {
        required,
        message
      },
    ]}
  >
    <TextArea placeholder={placeholder} style={styles} />

  </FormItem>
}