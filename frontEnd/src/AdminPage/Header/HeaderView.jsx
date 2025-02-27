import classNames from 'classnames/bind';
import styles from './HeaderView.module.scss';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAccountID } from '../../Service/Account/AccountService';
import { Avatar, Badge, Space } from 'antd';

const cx = classNames.bind(styles);

function HeaderView({ data }) {

    const navigate = useNavigate('/');
    const [account, setAccount] = useState([])
    const handleLogout = (event) => {
        event.preventDefault();
        axios.get('http://localhost:8081/logout')
            .then(res => {
                if (res.data.status == 'LOGOUT') {
                    navigate('/login');

                }
                else {
                    alert('Xảy ra lỗi');
                }
            })
            .catch(err => console.log(err))


    }

    useEffect(() => {
        getAccountID(data.userID).then((value) => {
            setAccount(value.info)
            console.log(value.info);
        });
    }, [])

    return (
        <div className={cx('header')}>
            <div className={cx('content')}>
                <span onClick={handleLogout}>Đăng xuất</span>
            </div>
            <Link to={"/account/edit/"+ data.userID} style={{textDecoration:"none", color:'black'}}>
                <div className={cx('account')}>
                   
                    <Space size={24}>
                        <Badge>
                            <Avatar size="large" icon={<img className={cx('img-account')} src={"http://localhost:8081/images/Images/" + (account ? account.imagesAccount : "img_avatar.png")} />} />
                        </Badge>
                        <span>{account ? account.nameAccount:""}</span>
                    </Space>
                    
                </div>
            </Link>
            
        </div>
    )

}

export default HeaderView;