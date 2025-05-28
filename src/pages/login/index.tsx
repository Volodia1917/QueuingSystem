import React, { useState } from "react";
import './style.css';
import { getLogin } from "../../libraries/getLogin";
const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        let data = await getLogin('http://192.168.80.126:5013/api/Authenticate', userName, password);
        console.log(data);
    }
    return(
        <div className="container">
            <div className="left">
                <div>
                    <img src="./images/Logo.png" />
                </div>
                <div style={{marginTop:100}}>
                    <div className="formItem">
                    <label>Tên đăng nhập *</label>
                    <input type="text" onChange={(e)=>setUserName(e.currentTarget.value)} />
                    </div>
                    <div className="formItem">
                    <label>Mật khẩu *</label>
                    <input type="password" onChange={(e)=>setPassword(e.currentTarget.value)} />
                    </div>
                    <div className="formItem" style={{alignItems:'center'}}>
                        <button onClick={handleLogin}
                        ><img src="./images/Button.png" /></button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div>
                    <img className="welcome" src="./images/welcome.png" />
                </div>
                <div className="text">
                    <p>Hệ thống</p>
                    <p style={{fontWeight:800}}>Quản lý xếp hàng</p>
                </div>
            </div>
        </div>
    )
}
export default Login;