import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const url = "http://localhost:9120/api/register";

const Register = () => {
    let navigate = useNavigate();
    const initialValues = {
        name: "",
        email: "",
        password: "",
        phone: ""
    };

    const [values, setValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validateForm = () => {
        if (!values.name && !values.email && !values.password && !values.phone) {
            return false;
        }
        return true;
    };

    const checkOut = () => {
        if (!validateForm()) {
            setError("Please fill out all fields.");
            return;
        }

        setLoading(true);
        setError("");

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            if (response.ok) {
                navigate(`/login`);
            } else {
                throw new Error("Registration failed");
            }
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    };
     // Navigate to Login Page
     const loginUser = () => {
        navigate('/mobileotp');
    };


    return (
        <>
            <Header />
            <div className='container'>
                <hr />
                <div className='panel panel-info'>
                    <div className='panel-heading'>
                        <h1>Register</h1>
                    </div>
                    <div className='panel-body'>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className='row'>
                            <div className='col-md-6 form-group'>
                                <label htmlFor="fname" className='control-label'>Name</label>
                                <input className='form-control' id='fname' name='name'
                                    value={values.name} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6 form-group'>
                                <label htmlFor="email" className='control-label'>Email</label>
                                <input className='form-control' id='email' name='email'
                                    value={values.email} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6 form-group'>
                                <label htmlFor="password" className='control-label'>Password</label>
                                <input className='form-control' id='password' name='password'
                                    type='password' value={values.password} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6 form-group'>
                                <label htmlFor="phone" className='control-label'>Phone</label>
                                <input className='form-control' id='phone' name='phone'
                                    value={values.phone} onChange={handleInputChange} />
                            </div>
                        </div>
                        <button className='btn btn-success' onClick={checkOut} disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>&nbsp;
                        <button className='btn btn-danger' onClick={loginUser} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
