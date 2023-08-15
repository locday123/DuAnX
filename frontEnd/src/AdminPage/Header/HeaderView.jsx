import classNames from 'classnames/bind';
import styles from './HeaderView.module.scss';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Context';

const cx = classNames.bind(styles);

function HeaderView({data}){
    const navigate = useNavigate('/');
    const {breadCrumb} = useContext(Context)

    const handleLogout = (event)=>{
        event.preventDefault();
        axios.get('http://localhost:8081/logout')
        .then(res =>{
            if(res.data.status == 'LOGOUT')
            {
                navigate('/login');
                
            }
            else{
                alert('Xảy ra lỗi');
            }
        })
        .catch(err=>console.log(err))


    }

    return (
        <div className={cx('header')}>
            <div className={cx('content')}>
                {breadCrumb.urlName}
                <span onClick={handleLogout}>Đăng xuất</span>
            </div>
            <div className={cx('account')}>
                <img className={cx('img-account')} src='https://www.w3schools.com/howto/img_avatar.png'/>
                <span>{data}</span>
            </div>
        </div>
    )

}

export default HeaderView;