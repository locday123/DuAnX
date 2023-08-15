import classNames from 'classnames/bind';
import styles from './MenuBox.module.scss';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../../Context/';
const cx = classNames.bind(styles);

function MenuBox({data}){

    const {SetBreadcrumb} = useContext(Context)

    return (
        (data.map((rs)=>(
            <div className={cx('menu-box')}>
                <div className={cx('menu-title')}>
                    <span key={rs.nameMenu}>{rs.nameMenu}</span>
                </div>   
            {
                rs.childMenu ?
                <ul className='menu-mini'>
                {rs.childMenu.map((result, index)=>(
                    <Link 
                        to={rs.linkMenu+result.linkMenu} 
                        key={index}
                        >
                            <li onClick={()=>SetBreadcrumb(result.linkMenu,result.nameMenu)}><span>{result.nameMenu}</span></li>
                    </Link>
                    )
                )}
                </ul>
                :
                <></>
            }
            </div>
        ))
    ))  
}

export default MenuBox;