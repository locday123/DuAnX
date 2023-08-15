
import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import { useEffect, useState } from 'react';
import DataGrid from '../../components/DataGird';
import momen from 'moment'

import AccountAction from './AccountAction/AccountAction';
import {getAccount} from '../../Service/Account/AccountService'
import { Button } from '@mui/material';
import AddAccount from './AccountAction/AddAccount/AddAccount';

const cx = classNames.bind(styles);

function Account(){

    const [listAccount, setListAccount] = useState([])
    const [data, setData] = useState([])
    const [isChange, setisChange] = useState(false)

    function Group ({data}){
        return (
            <div className={cx('group-name')}>
                <p>{data.nameAccount}</p>
                <span>{data.emailAccount}</span>
            </div>
        )
    }/* Hiển thị Tên + Email */

    const columns= [
    { field: 'idAccount', headerName: 'ID', width: 90 },
    { field: 'nameAccount', headerName: 'HỌ TÊN & EMAIL', width: 300, 
    renderCell: ({value})=>{return(
        <Group data={value} key={value.idAccount}/>
    )}
    },
    { field: 'sexAccount', headerName: 'GIỚI TÍNH', width: 140 },
    { field: 'phoneAccount', headerName: 'ĐIỆN THOẠI', width: 150 },
    { field: 'dateAccount', headerName: 'NGÀY SINH', width: 150 },
    { field: 'handle', headerName: 'THAO TÁC', width: 150, renderCell: ({value}) => {
      return (
        <AccountAction userID={value.idAccount} /> /* Truyền userID thực hiện Xem, Sửa, Xóa */
      )}
        
    }
    ]/* Hiển thị header table */
    const rows = listAccount.map((row)=>({
        id: row.idAccount,
        idAccount: row.idAccount,
        nameAccount: row,
        sexAccount: row.sexAccount == 1? 'Nam': 'Nữ',
        phoneAccount: row.phoneAccount,
        dateAccount: momen(row.dateAccount).format('DD/MM/YYYY'),
        handle: row
        }))/* Hiển thị danh sách tài khoản */

    useEffect(()=>{
        getAccount().then((value)=>{
            setListAccount(value)
            setisChange(true)
        });
    },[])   

    return ( 
        <div className={cx('table-list')}>
            <div className={cx('button')}>
                <AddAccount/>
            </div> {/* Button thêm tài khoản */}
            <DataGrid 
                rows={rows} 
                columns={columns} 
            /> {/* Danh sách tài khoản */}
        </div>
    )

}

export default Account;