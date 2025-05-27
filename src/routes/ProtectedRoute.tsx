import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface ProtectedRouteProps{
    children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    // Tài khoản mặc định để đăng nhập
    const defaultUsername = 'dino123';

    const navigate = useNavigate();
    
    const checkIsLogined = localStorage.getItem("isLogined") === "true";
    console.log(`Kiểm tra trạng thái khi đăng nhập: ${checkIsLogined}`);

    const checkUsername = localStorage.getItem("username") === defaultUsername;
    console.log(`Kiểm tra username khi đăng nhập: ${checkUsername}`);

    useEffect(() => {
        if(!checkIsLogined && !checkUsername){
            navigate("/");
        }

    }, [checkIsLogined, checkUsername, navigate]);

    return (checkIsLogined && checkUsername) ? children : null;
}


export default ProtectedRoute;