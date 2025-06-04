import React from "react";
import './style.css';
const Login = () => {
    return(
        <div className="container">
            <div className="left">
                <div>
                    <img src="./images/Logo.png" />
                </div>
                <div style={{marginTop:100}}>
                    <div className="formItem">
                    <label>Tên đăng nhập *</label>
                    <input type="text" />
                    </div>
                    <div className="formItem">
                    <label>Mật khẩu *</label>
                    <input type="password" />
                    </div>
                    <div className="formItem" style={{alignItems:'center'}}>
                        <button><img src="./images/Button.png" /></button>
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