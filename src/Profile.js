import React, { useState } from "react";
import axios from "axios";
import {getUser} from './service/AuthService';
import { NavLink } from 'react-router-dom'

const updateInfoUrl = 'https://u5bfuffgq6.execute-api.eu-north-1.amazonaws.com/production/updateinfo';

const Profile = () => {
    const user = getUser();
    const defaultName = user.name;
    const defaultEmail = user.email;
    const defaultUsername = user.username;
    const profilePic = user.profilePic;

    console.log(user)
    console.log(profilePic)

    const [name, setName] = useState(defaultName);
    const [email, setEmail] = useState(defaultEmail);
    const [username, setUsername] = useState(defaultUsername);
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' ||  email.trim() === '' || name.trim() === '') {
            setMessage('All fields are required');
            return;
        }

        const requestBody = {
            username: username,
            name: name,
            email: email
        }

        console.log(requestBody);
        
        axios.post(updateInfoUrl, requestBody).then(response => {
            setMessage('Success');
        }).catch(err => {
            if (err.response.status === 401) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Sorry, the backend server returned an error');
            }
        });
    }

    return (
        // <div>
        //     <form onSubmit={submitHandler}>
        //         <h5>Register</h5>
        //         name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br />
        //         email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br />
        //         username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br />
        //         password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br />
        //         <input type="submit" value="Register" />
        //     </form>
        //     {message && <p classNameName="message">{message}</p>}
        // </div>

        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="row flex-fill">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center">Profile</h3>
                            {profilePic && <img src={profilePic} className="img-thumbnail " alt="..."></img>}
                            {!profilePic && <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" className="img-thumbnail"></img>}
                            <NavLink activeClassName="active" style={{ textDecoration: 'none' }} to="/uploadpic"><a className="nav-link btn btn-navbar btn-primary text-white profile-btn">Update Profile Picture</a></NavLink>
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label className="form-label" for="username">Username</label>
                                    <input className="form-control" value={username} onChange={event => setUsername(event.target.value)}  name="username" id="username" required readOnly/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" for="email">Email</label>
                                    <input className="form-control" type="email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" for="name">Name</label>
                                    <input className="form-control" type="text" name="name" id="name" value={name} onChange={event => setName(event.target.value)} required />
                                </div>
                                {message && <p className="message">{message}</p>}
                                <div className="d-grid gap-2 mb-3">
                                    <button className="btn btn-success" type="submit" value="Register">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;