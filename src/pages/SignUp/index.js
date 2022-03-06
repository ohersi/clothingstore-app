import { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
// Validations
import { userSchema } from '../../validations/Validations';
// CSS
import './signup.css'

const SignUp = () => {

    const navigate = useNavigate();

    const user = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema)
    });
    const [signUpSuccess, setSignupSuccess] = useState(false);

    const signUpUser = async (data) => {

        try {
            const response = await axios.post('https://ecommerce-backnd.herokuapp.com/api/v1/signup', data)
            user.setUser(response.data);
            if (response.status === 200) {
                console.log("user created")
                setSignupSuccess(true)
                setTimeout(() => {
                    setSignupSuccess(false)
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
            <div id="signup-container">
                <form onSubmit={handleSubmit(signUpUser)}>
                    <div className="field">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="username"
                            {...register("username", { required: true, max: 50, min: 3, maxLength: 50 })}
                        />
                        <span>{errors?.username?.message}</span>
                    </div>

                    <div className="field">
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            placeholder="firstname"
                            {...register("firstname", { required: true, max: 100, min: 1, maxLength: 100 })}
                        />
                        <span>{errors?.firstname?.message}</span>
                    </div>

                    <div className="field">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            placeholder="lastname"
                            {...register("lastname", { required: true, max: 100, min: 1, maxLength: 100 })}
                        />
                        <span>{errors?.lastname?.message}</span>
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="email" {...register("email", { required: true, max: 255, min: 5, maxLength: 255, pattern: /^\S+@\S+$/i })}
                        />
                        <span>{errors?.email?.message}</span>
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="password" {...register("password", { required: true, max: 100, min: 5, maxLength: 100 })}
                        />
                        <span>{errors?.password?.message}</span>
                    </div>
                    <input type="submit" />
                    <h1>{signUpSuccess ? "User has been registered" : null}</h1>
                </form>
            </div>
        </>
    );
}

export default SignUp;
