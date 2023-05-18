import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { setUserSession } from "./service/AuthService";


const loginUrl = 'https://u5bfuffgq6.execute-api.eu-north-1.amazonaws.com/production/login';


const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setErrorMessage('All fields are required');
            return;
        }

        const requestConfig = {
            headers: {
                'x-api-key': 'NNc9uvTM9c3LFRuiaUgQM90MUlO3z5cJ59ulXah8'
            }
        }

        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginUrl, requestBody, requestConfig).then((response) => {
            setUserSession(response.data.user, response.data.token);
            navigate('/');
        }).catch((err) => {
            if (err.response.status === 401 || err.response.status === 403) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('Sorry, the backend server returned an error');
            }
        });
    }

    return (
        // <div>
        //     <form onSubmit={submitHandler}>
        //         <h5>Login</h5>
        //         username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br />
        //         password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br />
        //         <input type="submit" value="Login" />
        //     </form>
        //     {errorMessage && <p className="message">{errorMessage}</p>}
        // </div>

        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="row flex-fill">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title mb-3">Login</h3>
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label className="form-label" for="username">Username</label>
                                    <input className="form-control" value={username} type="text" name="username" id="username" autofocus required onChange={event => setUsername(event.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" for="password">Password</label>
                                    <input className="form-control" type="password" name="password" id="password" value={password} onChange={event => setPassword(event.target.value)} required/>
                                </div>
                                {errorMessage && <p className="message">{errorMessage}</p>}
                                <div className="d-grid gap-2">
                                    <button className="btn btn-success" type="submit" value="Login">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;