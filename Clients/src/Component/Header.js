import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const url = "";

const Header = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('ltk');
        if (token) {
            fetch(`${url}`, {
                method: 'GET',
                headers: {
                    'x-access-token': token,
                },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch user information');
                }
                return res.json();
            })
            .then((data) => {
                setUserData(data);
                sessionStorage.setItem('userInfo', JSON.stringify(data));
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('userInfo');
        setUserData(null);
        navigate('/');
    };

    const conditionalHeader = () => {
        if (loading) {
            return <span>Loading...</span>;
        }

        if (error) {
            return <span style={{ color: 'red' }}>{error}</span>;
        }

        if (userData && userData.name) {
            return (
                <>
                    <Link to="/register" className='btn btn-primary'>
                        <span className="glyphicon glyphicon-user"></span> Hi {userData.name}
                    </Link> &nbsp;
                    <button onClick={handleLogout} className='btn btn-success'>
                        <span className="glyphicon glyphicon-log-out"></span> Logout
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <Link to="/register" className='btn btn-primary'>
                        <span className="glyphicon glyphicon-user"></span> SignUp
                    </Link> &nbsp;
                    <Link to="/login" className='btn btn-success'>
                        <span className="glyphicon glyphicon-log-in"></span> Login
                    </Link>
                </>
            );
        }
    };

    return (
        <header>
            <div id="brand">
             Tomato &nbsp;&nbsp;
            </div>
            <Link to="/" className="btn btn-info" style={{marginTop:'1%'}}>Home</Link>
            <div id="social">
                {conditionalHeader()}
            </div>
        </header>
    );
};

export default Header;
