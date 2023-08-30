import { Box, Paper, Tab } from "@mui/material"
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList';
import { AccountCircle, SecurityOutlined } from '@mui/icons-material';
import { useState } from "react";
import PageUpdate from "./PageUpdate";


function UpdateAccount() {
    const [tabValue, settabValue] = useState("1")
    const handleChange = (event, newValue) => {
        settabValue(newValue);
    };

    const TabContent = [
        { nameTabPanel: "TÀI KHOẢN", icon: <AccountCircle />, value: "1", pageContent: <PageUpdate /> },
        { nameTabPanel: "ĐỔI MẬT KHẨU", icon: <SecurityOutlined />, value: "2", pageContent: "ab" }
    ]
    return (
        <Box>
            <Paper elevation={3} sx={{ borderRadius: '10px' }}>
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
            </Paper>
        </Box>
    )
}

export default UpdateAccount