import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import {Form, FormGroup, Input, Button} from 'reactstrap'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function Login(){

    const [values, setValues] = useState({username:'', password:''});
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate('/');

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:8081/login')
        .then(res=>{
            if(res.data.status === "SUCCESS"){
                setAuth(true);
                navigate('/');
            }
            else{
                setAuth(false);
            }
        })
    },[auth])

    const handleSubmit = (event)=>{
        event.preventDefault();
        
        axios.post('http://localhost:8081/login',values)
        .then(res =>{
            if(res.data.status == 'SUCCESS')
            {
                navigate('/');
                alert(res.data.thongbao);
            }
            else{
                alert(res.data.thongbao);
            }
        })
        .catch(err=>console.log(err))
    }
 
    return (
            <div className={cx('main')}>
                <div className={cx('box-login')}>
                    <span className={cx('title-login')}>ĐĂNG NHẬP</span>
                    <Form method='POST' onSubmit={handleSubmit}  className={cx('form-login')}>
                        <FormGroup>
                            <Input 
                                type='text' 
                                name='username' 
                                placeholder='Nhập mã nhân viên VQ-Server'
                                onChange={e=>setValues({...values, username:e.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type='password' 
                                name='password' 
                                placeholder='Nhập mật khẩu'
                                onChange={e=>setValues({...values, password:e.target.value})}
                            />
                        </FormGroup>     
                        <FormGroup>
                            <Button name='submit' color='primary'>ĐĂNG NHẬP</Button>
                        </FormGroup>        
                    </Form>
                </div>
            </div>
    )
}

export default Login;