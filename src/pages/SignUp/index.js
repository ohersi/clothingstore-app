import { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
// Validations
import { signUpSchema } from '../../validations/Validations';
// CSS
import './signup.css'

const SignUp = () => {

    const navigate = useNavigate();

    const user = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema)
    });
    const [success, setSuccess] = useState(false);

    const signUpUser = async (data) => {

        try {
            const response = await axios.post('https://ecommerce-backend-z5ap.onrender.com/api/v1/register', data)
            user.setUser([response.data]);
            if (response.status === 200) {
                console.log("user created")
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    navigate('/collection')
                }, 2000);
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div id="signup-main">
                <div className='txt-1'>
                    Hello
                </div>
                <div className='txt-2'>
                    There
                </div>
                <div id="signup-container">
                    <form onSubmit={handleSubmit(signUpUser)}>
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
                            <label htmlFor="firstname">First Name</label>
                            <input
                                className='input'
                                type="text"
                                placeholder="firstname"
                                autoComplete="off"
                                {...register("firstname", { required: true, max: 100, min: 1, maxLength: 100 })}
                            />
                            <span className='error'>{errors?.firstname?.message}</span>
                        </div>

                        <div className="field">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                className='input'
                                type="text"
                                placeholder="lastname"
                                autoComplete="off"
                                {...register("lastname", { required: true, max: 100, min: 1, maxLength: 100 })}
                            />
                            <span className='error'>{errors?.lastname?.message}</span>
                        </div>

                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                className='input'
                                type="email"
                                placeholder="email"
                                autoComplete="off"
                                {...register("email", { required: true, max: 255, min: 5, maxLength: 255, pattern: /^\S+@\S+$/i })}
                            />
                            <span className='error'>{errors?.email?.message}</span>
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input
                                className='input'
                                type="password"
                                placeholder="password"
                                {...register("password", { required: true, max: 100, min: 5, maxLength: 100 })}
                            />
                            <Link to='/login'>Already have an account? Log in.</Link>
                            <span className='error'>{errors?.password?.message}</span>
                        </div>
                        <button className='submit-btn'>
                            <input type="submit" />
                        </button>
                        <h1>{success ? "User has been registered" : null}</h1>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
