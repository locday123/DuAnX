import { Button, TextField } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { updateAccount } from "../../../Service/Account/AccountService";
import { useContext, useState } from "react";
import Context from "../../../Context";


function ChangePassword({ dataID }){
    const [password, setPassword] = useState([])
    const { setAlert, setMessage } = useContext(Context)
    const checkPassword = (inputPassword)=>{
        console.log(inputPassword);
        if(inputPassword["newPassword"] == inputPassword["confirmPassword"]){
            if(dataID["passAccount"] == inputPassword["currenPassword"])
            {
                return true
            }
            else{
                setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                setMessage("Kiểm tra lại mật khẩu")
                return false
            }
        }
        else{
            setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
            setMessage("Kiểm tra lại mật khẩu")
            return false
        };
    }
    const inputValue = [
        { nameInput: 'currenPassword', placehoder: 'Mật khẩu cũ', labelInput: 'Mật khẩu cũ', typeInput: 'password', width: 12 },
        { nameInput: 'newPassword', placehoder: 'Mật khẩu mới', labelInput: 'Mật khẩu mới', typeInput: 'password', width: 12 },
        { nameInput: 'confirmPassword', placehoder: 'Nhập lại mật khẩu mới', labelInput: 'Nhật lại mật khẩu mới', typeInput: 'password', width: 12 },
    ]
    
    return(
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {inputValue.map((value, key)=>(
                <Grid key={key} xs={value.width}>
                    <TextField
                        label={value.labelInput}
                        placeholder={value.placehoder}
                        name={value.nameInput}
                        type={value.typeInput}
                        sx={{width:"400px"}}
                        onChange={(e)=>setPassword({...password, [value.nameInput]: e.target.value})}
                    />
                </Grid>
            ))}

            <Grid>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ marginRight: "10px" }}
                    onClick={() => 
                        checkPassword(password)&&
                        updateAccount(dataID.idAccount, "", {"passAccount":password.newPassword}).then((value) => {
                            setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                            setMessage("Đổi mật khẩu thành công")
                        })
                    }
                >
                    CẬP NHẬT
                </Button> {/* Cập nhật */}
            </Grid>
        </Grid>
    )
}

export default ChangePassword