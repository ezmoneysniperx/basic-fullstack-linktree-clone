import React, { useState } from "react";
import axios from "axios";

const registerUrl = 'https://u5bfuffgq6.execute-api.eu-north-1.amazonaws.com/production/register';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '' || email.trim() === '' || name.trim() === '') {
            setMessage('All fields are required');
            return;
        }

        const requestConfig = {
            headers: {
                'x-api-key': 'NNc9uvTM9c3LFRuiaUgQM90MUlO3z5cJ59ulXah8'
            }
        }

        const requestBody = {
            name: name,
            email: email,
            username: username,
            password: password
        }

        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setMessage('Register Success');
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
                            <h3 className="card-title">Register</h3>
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label className="form-label" for="username">Username</label>
                                    <input className="form-control" value={username} onChange={event => setUsername(event.target.value)}  name="username" id="username" autofocus required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" for="email">Email</label>
                                    <input className="form-control" type="email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" for="name">Name</label>
                                    <input className="form-control" type="text" name="name" id="name" value={name} onChange={event => setName(event.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" for="password">Password</label>
                                    <input className="form-control" type="password" name="password" id="password" value={password} onChange={event => setPassword(event.target.value)} required />
                                </div>
                                {message && <p className="message">{message}</p>}
                                <div className="d-grid gap-2">
                                    <button className="btn btn-success" type="submit" value="Register">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;