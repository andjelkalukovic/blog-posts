import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import Input from './Input'
import { AUTH } from '../../constants/actionTypes'
import { signin, signup } from '../../actions/auth'
import './login.css'

const initialState = { firstName: '', lastName: '', email: '', password: '', repeatPassword: '' }

const Login = () => {
    const [isSignedup, setIsSignedup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignedup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
        window.location.reload();
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => { setShowPassword(!showPassword) }

    const googleSuccess = async (res) => {
        const result = res.profileObj;
        const token = res.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log('Failed Google Sign In. Please, try again.');
    }

    const handleSwitch = () => {
        setIsSignedup(!isSignedup)
        setShowPassword(false);
    }

    return (
        <div className='login-section'>
            <div className='login-card'>
                <div className='login-content'>
                    <h5>{isSignedup ? 'Sign Up' : 'Sign In'}</h5>
                    <form onSubmit={handleSubmit}>
                        {isSignedup && (
                            <>
                                <Input name='firstName' placeholder='First Name' type='text' handleChange={handleChange} />
                                <Input name='lastName' placeholder='Last Name' type='text' handleChange={handleChange} />
                            </>
                        )}

                        <Input name='email' placeholder='Email' type='email' handleChange={handleChange} />
                        <Input name='password' placeholder='Password' type={showPassword ? 'text' : 'password'}
                            handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        {isSignedup && <Input name='repeatPassword' placeholder='Repeat Password' type='password' handleChange={handleChange} />}

                        <div>
                            <button type='submit' className='button'>{isSignedup ? 'Sign Up' : 'Sign In'}</button>
                        </div>

                        <div>
                            <GoogleLogin clientId='735506411947-9erjfn19drftm9suqbj9pbh7a61t4cdq.apps.googleusercontent.com' render={(renderProps) => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='button'>Sign In with Google</button>)}
                                onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy='single_host_origin' />
                        </div>

                        <div>
                            <button onClick={handleSwitch} className='button-link'>
                                {isSignedup ? 'Already have an account?' : "Don't have an account?"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;