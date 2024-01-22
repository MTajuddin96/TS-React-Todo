import { Button, Form, } from 'antd';
import './Login.style.scss'
import { useDispatch } from 'react-redux';
import { replace } from 'connected-react-router';
import { FormInput } from '../../components/FormItems/FormItems';
import { loginUser } from '../../services/auth.services';


const Login = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  const onFinishFailed = ({ errorFields }: { errorFields: any }) => {
    form.scrollToField(errorFields[0].name);
  };

  return (
    <div className='whole'>
      <div className='whole_left'>
        <img src={`https://media.istockphoto.com/photos/he-knows-his-brand-like-the-back-of-his-hand-picture-id1277353997?b=1&k=20&m=1277353997&s=170667a&w=0&h=T62SfbO130LbdJgLEU8Dg0VOqp1wraA-tQcleclrI50=`} alt='' width={'100%'} style={{ opacity: 0.1, position: 'absolute', width: '65%' }} />
        <div style={{ margin: '2%' }}>
          <p style={{ fontSize: '32pt', color: '#fff' }}> </p>
          {/* <img src='https://www.sudofy.com/wp-content/uploads/2018/08/sudofy-logo-white.png' width={160} /> */}
        </div>
      </div>
      <div className='whole_right'>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', }}>
          {/* <img src={logo} width={120} style={{ borderRadius: '60px', marginBottom: '15%' }} /> */}
          <p style={{ fontSize: '24pt', margin: 0, fontWeight: 600, color: '#000' }}>Welcome to</p>
          <p style={{ fontSize: '32pt', margin: 0, color: '#000', fontWeight: 600, marginBottom: '15%' }}><span style={{ background: '#3a9778', fontWeight: 'bold', color: '#fff' }}>Todo</span> Management Portal</p>
          <p style={{ fontSize: '20pt', margin: 0, marginBottom: '2%' }}>Login into your account</p>
          <Form className='loginForm' layout='vertical' form={form} preserve={false} onFinishFailed={onFinishFailed} onFinish={(values) => {
            form.validateFields().then(async (values) => {
              await dispatch(loginUser(values))
              dispatch(replace('/'))
            }).catch(err => {
              form.scrollToField(err?.errorFields[0])
            })
          }}>
            <FormInput label='Email' name='email' required placeholder='Email' initialValue={''} styles={null} type={'email'} />
            <FormInput label='Password' name='password' required placeholder='Password' initialValue={''} styles={null} type={'password'} />
            <Button onClick={() => {

            }} type='primary' htmlType="submit">{'Login'}</Button>
          </Form>

          <p style={{ fontSize: '10pt', margin: 0, marginBottom: '2%',marginTop: '2%', color: '#18889e' }}>Don't have an account?</p>

        </div>
        <div>
          {/* <div className="loginForm">
            <Logo />
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <Spin spinning={spinner}>
              <LoginForm form={props.form} dispatch={dispatch} setSpinner={(val) => setSpinner(val)} />
            </Spin>
          </div> */}

        </div>
      </div>
    </div>
  );
}


export default (Login);
