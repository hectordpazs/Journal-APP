import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    
    const {msgError} = useSelector(state => state.ui);

    const [values, handleInputChange] = useForm({
        name:'hector',
        email: 'hectordpazs@gmail.com',
        password: '123456',
        password2: '123456',
    })

    const {name, email, password, password2} = values;

    const dispatch = useDispatch();

    const handleRegister = (e)=>{
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = ()=>{

        if(name.trim().length===0){
            dispatch(setError('name is required'))
            return false;
        }else if ( !validator.isEmail(email) ){
            dispatch(setError('email is not valid'));
            return false;
        }else if (password !== password2 || password.length < 5){
            dispatch(setError('passwords should be equal and should have at least 6 characters'));
            return false
        }

            dispatch(removeError())

        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>

            <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>

                {   
                    (msgError&&
                    <div className='auth__alert-error'>
                        {msgError}
                    </div>
                    )
                }
                

                <input 
                    className='auth__input' 
                    type="text" 
                    name="name" 
                    placeholder='Name' 
                    autoComplete='off'
                    onChange={handleInputChange}
                    value={name} 
                />
                <input 
                    className='auth__input' 
                    type="email" 
                    name="email" 
                    placeholder='Email' 
                    autoComplete='off'
                    onChange={handleInputChange}
                    value={email} 
                />
                <input 
                    className='auth__input' 
                    type="password" 
                    name="password" 
                    placeholder='Password'
                    onChange={handleInputChange}
                    value={password} 
                />
                <input 
                    className='auth__input' 
                    type="password" 
                    name="password2" 
                    placeholder='Confirm Password'
                    onChange={handleInputChange}
                    value={password2} 
                />
                <button 
                    className='btn btn-primary btn-block mb-5' 
                    type='submit'
                >
                    Register
                </button>

                <Link to='/login' className='link'>
                    Already Registered?
                </Link>

            </form>
        </>
    )
}
