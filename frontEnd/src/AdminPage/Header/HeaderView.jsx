import classNames from 'classnames/bind';
import styles from './HeaderView.module.scss';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderView({ data }) {

    const navigate = useNavigate('/');
    console.log(data);
    const location = useLocation()
    const crumbs = location.pathname.split('/').filter(crumbs => crumbs !== '')
    const images = "http://localhost:8081/images/Images/" + (data.imagesID ? data.imagesID : "img_avatar.png")
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

    return (
        <div className={cx('header')}>
            <div className={cx('content')}>
                <span onClick={handleLogout}>Đăng xuất</span>
            </div>
            <Link to={"/account/edit/"+ data.userID} style={{textDecoration:"none", color:'black'}}>
                <div className={cx('account')}>
                    <img className={cx('img-account')} src={images} />
                    <span>{data.name}</span>
                </div>
            </Link>
            
        </div>
    )

}

export default HeaderView;