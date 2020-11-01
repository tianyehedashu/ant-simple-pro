import React from 'react'
import { Form, Button, Input } from 'antd';
import InputComponent from '@/components/input'
import {login} from '@/api/login'
import { useHistory } from "react-router-dom";
import {requestCode} from '@/utils/varbile'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SvgIcon from '@/components/svgIcon'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Footer} from '@/components/layout/views'
import style from './login.module.scss'
export interface LoginProps extends loading{
    dispatch:Dispatch,
}
const Login:React.FC<LoginProps>=({loading})=>{
    const history=useHistory();
    const onFinish =async (values:any) => {
        const {email,password} = values
        let res=await login({email,password});
        if(res.code===requestCode.successCode){
            localStorage.setItem('token',res.data);
            history.push("/home");
        }
    }
    return (
        // <div className='warpLayout'>
        //   <div className="form"  >
        //         <div className="form-inner">
        //             <h2>欢迎来到;lgf-web</h2>
        //             <Form
        //             name="basic"
        //             initialValues={{ remember: true }}
        //             onFinish={onFinish}
        //             layout='vertical'
        //             >
        //             <Form.Item
        //                 label="邮箱"
        //                 name="email"
        //                 rules={[{ required: true, message: '请输入邮箱' }]}
        //             >
        //                 <InputComponent placeholder='请填写邮箱'/>
        //             </Form.Item>
        //             <Form.Item
        //                 label="密码"
        //                 name="password"
        //                 rules={[{ required: true, message: '请输入密码' }]}
        //             >
        //                 <InputComponent type='password' placeholder='请填写密码'/>
        //             </Form.Item>
        //             <Form.Item {...tailLayout}>
        //                 <Button type="primary" htmlType="submit" loading={loading}>
        //                 登录
        //                 </Button>
        //             </Form.Item>
        //             </Form>
        //         </div>
        //     </div>
        // </div>
        <div className={style.login}>
            <div className={style.content}>
                <div className={style.bg}>
                   <img src={require('../../assets/image/pic.svg')} alt="logon"/>
                </div>
                <div className={style.fill}>
                    <div className={style.logon}>
                        <SvgIcon iconClass='logon' fontSize='30px' className={style.img}/>
                        <h2>Ant Simple Pro</h2>
                    </div>
                    <div className={style.from}>
                        <Form name="basic" initialValues={{ remember: true }} layout='vertical'   onFinish={onFinish}>
                            <Form.Item  name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
                            <Input 
                                prefix={<UserOutlined  style={{color:'rgba(0, 0, 0, 0.25)'}}/>} 
                                placeholder="请填写邮箱" 
                                size='large'
                                allowClear
                                />
                            </Form.Item>
                            <Form.Item  name="password" rules={[{ required: true, message: '请输入密码' }]}>
                                <Input
                                    prefix={<LockOutlined style={{color:'rgba(0, 0, 0, 0.25)'}}/>}
                                    type="password"
                                    placeholder="请填写密码"
                                    size='large'
                                    allowClear
                                />
                        </Form.Item>
                            <Form.Item className={style.space}>
                                <Button type="primary" htmlType="submit" 
                                   loading={loading} 
                                   className={style.submit}
                                   size='large'
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <Footer name='Ant Simple Pro' ahthor='Lgf&qyh'/>
        </div>
    )
}
export default  connect(({other}:reduceStoreType)=>({
    loading:other.loading
}))(Login);

