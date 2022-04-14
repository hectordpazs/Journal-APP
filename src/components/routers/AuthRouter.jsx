import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { RegisterScreen } from '../auth/RegisterScreen'

export const AuthRouter = () => {
    return (
        <div className='auth__main'>
            <div className='auth__box-container'>

                <Routes>
                    <Route path='/login' element={<LoginScreen/>} />
                    <Route path='/register' element={<RegisterScreen/>}/>
                    <Route path='*' element={<Navigate to='/login'/>} />
                </Routes>

            </div>
        </div>
            
    )
}
