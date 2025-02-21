import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import Sidebar from './SideBar/Sidebar';
import HeaderView from './Header/HeaderView'

import axios from 'axios';
import {useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';

const cx = classNames.bind(styles);

function AdminPage({children}){
    
    const [auth, setAuth] = useState(false)
    const [userID, setUserID] = useState('');
    const [menu, setMenu] = useState('');
    const navigate = useNavigate('/');

    

    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:8081/login')
        .then(res=>{
            if(res.data.status === "SUCCESS"){
                setAuth(true);
                setMenu(res.data.menu)
                setUserID(res.data.username)
            }
            else{
                navigate('/login')
                setAuth(false);
            }
        })
    },[])
    return (
        auth?
        <div className={cx('main')}> 
            <Sidebar data={menu}/>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <HeaderView data={{userID}}/>
                </div>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
            <AlertMessage/>
        </div>
        :
        <></>
    )

}

export default AdminPage;