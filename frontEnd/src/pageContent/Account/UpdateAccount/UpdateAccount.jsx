import { Box, Grid, Paper, Tab } from "@mui/material"
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList';
import { AccountCircle, SecurityOutlined } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import PageUpdate from "./pageUpdate";
import { getAccountID } from "../../../Service/Account/AccountService";


function UpdateAccount() {
    const location = useLocation()
    const idUser = location.pathname.split('/').filter(crumbs => crumbs !== '')[2]
    const [tabValue, settabValue] = useState("1")
    const [checkUser, setCheckUser] = useState()
    const [dataID, setdataID] = useState([])
    const handleChange = (event, newValue) => {
        settabValue(newValue);
    };
    useEffect(() => {
        getAccountID(idUser).then((value) => {
            if (value.getStatus === "SUCCESS") {
                setdataID(value.info);
                setCheckUser(true)
            }
            else {
                setCheckUser(false)
            }
        })
    }, [])

    const TabContent = [
        { nameTabPanel: "TÀI KHOẢN", icon: <AccountCircle />, value: "1", pageContent: <PageUpdate dataID={dataID} /> },
        { nameTabPanel: "ĐỔI MẬT KHẨU", icon: <SecurityOutlined />, value: "2", pageContent: "ab" }
    ]



    return (
        <Box>
            <Paper elevation={3} sx={{ borderRadius: '10px' }}>
                {
                    checkUser ?
                        <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                                <TabList onChange={handleChange}>
                                    {TabContent.map((value, key) => (
                                        <Tab key={key} sx={{ color: "rgb(145, 85, 253)" }}
                                            label={
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    {value.icon}
                                                    <span style={{ marginLeft: "5px" }}>{value.nameTabPanel}</span>
                                                </Box>
                                            }
                                            value={value.value}
                                            id={"tabs" + value.value}
                                            aria-controls={"tabs" + value.value}
                                            iconPosition="start"
                                        />
                                    ))}
                                </TabList>
                            </Box>
                            <Box>
                                {TabContent.map((value, key) => (
                                    <TabPanel key={key} value={value.value}>
                                        {value.pageContent}
                                    </TabPanel>
                                ))}
                            </Box>
                        </TabContext>
                        :
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                            TÀI KHOẢN KHÔNG TỒN TẠI
                        </Box>
                }
            </Paper>
        </Box>
    )
}

export default UpdateAccount