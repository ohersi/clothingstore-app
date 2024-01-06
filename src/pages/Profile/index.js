import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserContext from '../../context/UserContext';
// CSS
import './profile.css'

const Profile = () => {

    const user = useContext(UserContext);
    const [userProfile, setUserProfile] = useState([]);
    const [visible, setVisible] = useState(false);

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile()
            .catch(console.error)
        if (!user.user.length) {
            navigate('/');
        }
    }, [navigate]);

    const fetchProfile = async () => {
        const options = {
            method: 'GET',
            url: 'https://ecommerce-backend-z5ap.onrender.com/api/v1/profile',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${user.user[0].token}`
            }
        };

        const response = await axios.request(options);
        setUserProfile(response.data)
        setUsername(response.data.username)
        setFirstname(response.data.firstname)
        setLastname(response.data.lastname)
        setEmail(response.data.email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email
        }
        console.log("This is updated user", updatedUser);
        try {
            const options = {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${user.user[0].token}`
                }
            };
            const response = await axios.put('https://ecommerce-backend-z5ap.onrender.com/api/v1/updateuser', updatedUser, options)
            console.log(response)
        }
        catch (error) {
            console.error(error);
        }
    }
    const form = () => {
        {
            Object.entries(userProfile).map(([key, val]) => (
                <>
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder={userProfile?.username}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                    <li key={key}><strong>{key}</strong>: '{val}'</li>
                </>
            ))
        }
    }


    // console.log("rerender!")
    // console.log(userProfile)
    return (
        <>
            <div id='profile-main'>
                <h1 className='title'>PROFILE</h1>
                <div className="profile-container">
                    <button onClick={() => setVisible(!visible)}>{visible ? "X" : "Edit"}</button>
                    <form onSubmit={handleSubmit}>
                        <div className="user-info">
                            <label>Username: {userProfile?.username}</label>
                            {visible ?
                                <input
                                    type="text"
                                    name="username"
                                    placeholder={userProfile?.username}
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                : null}
                        </div>
                        <div className="user-info">
                            <label>First Name: {userProfile?.firstname}</label>
                            {visible ?
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder={userProfile?.firstname}
                                    value={firstname}
                                    onChange={e => setFirstname(e.target.value)}
                                />
                                : null}
                        </div>
                        <div className="user-info">
                            <label>Last Name: {userProfile?.lastname}</label>
                            {visible ?
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder={userProfile?.lastname}
                                    value={lastname}
                                    onChange={e => setLastname(e.target.value)}
                                />
                                : null}
                        </div>
                        <div className="user-info">
                            <label> Email: {userProfile?.email}</label>
                            {visible ?
                                <input
                                    type="text"
                                    name="email"
                                    placeholder={userProfile?.email}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                : null}
                        </div>
                        {visible ?
                            <button type='submit'>
                                Submit
                            </button>
                            : null}
                    </form>
                </div>
                <h1 className='title'>MY ORDERS</h1>
            </div>
        </>


    );
}

export default Profile;
