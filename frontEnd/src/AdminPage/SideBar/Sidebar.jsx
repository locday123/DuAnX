import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuBox from './MenuBox/MenuBox';
const cx = classNames.bind(styles);

function Sidebar({data}){
    return (
        <div className={cx('sidebar')}>
            <div className={cx('store')}>VIỄN QUANG</div>
            <div className={cx('menu')}>
                <MenuBox data={data}/>
            </div>
        </div>
    )

}

export default Sidebar;