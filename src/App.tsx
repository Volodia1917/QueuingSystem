import React from 'react';
// import Login from './pages/login';
import LoginForm from './components/loginForm/LoginForm';
import Login from './pages/Login.view';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard.view';
import ResetPassword from './pages/resetPassword/ResetPassword.view';

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
      <Route 
        path='/dashboard'
        element= {
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );

}

export default App;
