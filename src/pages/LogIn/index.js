import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Context
import UserContext from '../../context/UserContext';
// Validations
import { logInSchema } from '../../validations/Validations';
// CSS
import './login.css'
import axios from 'axios';

const LogIn = () => {

    const navigate = useNavigate();
    const user = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(logInSchema)
    });
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false)

    const logInUser = async (data) => {

        try {
            const response = await axios.post('https://ecommerce-backnd.herokuapp.com/api/v1/signin', data)
            user.setUser(response.data);
            if (response.status === 200) {
                console.log("user created")
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    navigate('/')
                }, 2000);
            }
        }
        catch (error) {
            console.error(error)
            setFailed(true)
            setTimeout(() => {
                setFailed(false)
            }, 2000);
        }
    }
    console.log(user.user)

    return (
        <>
            <div id="login-main">
                <div id="image">
                   This way...
                </div>
                <div id="login-container">
                    <div id='login-text'>
                        LOG IN
                    </div>
                    <form onSubmit={handleSubmit(logInUser)}>
                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <input
                                className='input'
                                type="text"
                                placeholder="username"
                                autoComplete="off"
                                {...register("username", { required: true, max: 50, min: 3, maxLength: 50 })}
                            />
                            <span className='error'>{errors?.username?.message}</span>
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input
                                className='input'
                                type="password"
                                placeholder="password"
                                {...register("password", { required: true, max: 100, min: 5, maxLength: 100 })}
                            />
                            <Link to='/signup'>Don't have an account? Sign Up.</Link>
                            <span className='error'>{errors?.password?.message}</span>
                        </div>
                        <button className='submit-btn'>
                            <input type="submit" />
                        </button>
                        <h3 className='popup-txt'>{success ? "Logged In" : null}</h3>
                        <h3 className='popup-txt'>{failed ? "Invalid log-in, please try again" : null}</h3>
                    </form>
                </div>
            </div>

        </>
    );
}

export default LogIn;
