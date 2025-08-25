import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const url = "http://localhost:9120/api/login";

const Login = () => {
    let navigate = useNavigate();
    const initialValues = {
        email: "",
        password: ""
    };

    const [values, setValues] = useState(initialValues);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!values.email || !values.password) {
            return false;
        }
        return true;
    };

    const checkOut = () => {
        if (!validateForm()) {
            setMessage("Please fill out all fields.");
            return;
        }

        setLoading(true);
        setMessage("");

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Login failed");
            }
            return res.json();
        })
        .then((data) => {
            if (data.auth === false) {
                setMessage(data.token);
            } else {
                sessionStorage.setItem('ltk', data.token);
                navigate('/');
            }
        })
        .catch((err) => setMessage(err.message))
        .finally(() => setLoading(false));
    };
     // Function to navigate to the register page
        const registerUser = () => {
        navigate('/register');
        };
  

    return (
        <>
            <Header />
            <div className='container'>
                <hr />
                <div className='panel panel-warning'>
                    <div className='panel-heading'>
                        <h1>Login</h1>
                    </div>
                    <div className='panel-body'>
                        {message && <h2 style={{ color: 'red' }}>{message}</h2>}
                        <div className='row'>
                            <div className='col-md-6 form-group'>
                                <label htmlFor="email" className='control-label'>Email</label>
                                <input 
                                    className='form-control' 
                                    id='email' 
                                    name='email' 
                                    value={values.email}  
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col-md-6 form-group'>
                                <label htmlFor="password" className='control-label'>Password</label>
                                <input 
                                    className='form-control' 
                                    id='password' 
                                    name='password' 
                                    type='password' 
                                    value={values.password}  
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button className='btn btn-danger' onClick={checkOut} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>&nbsp;
                        <button className='btn btn-success' onClick={registerUser} disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
