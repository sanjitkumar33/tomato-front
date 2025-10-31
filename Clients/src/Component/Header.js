import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const url = "http://localhost:9120/api/auth/userInfo"

const Header = () => {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('ltk') !== null) {
            fetch(url, {
                method: 'GET',
                headers: {
                    'x-access-token': sessionStorage.getItem('ltk')
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setUserData(data)
                })
                .catch(() => {
                    setUserData(null)
                })
        }
    }, [])

    // keep sessionStorage in sync with userData without causing side-effects during render
    useEffect(() => {
        if (userData && userData.name) {
            sessionStorage.setItem('userInfo', JSON.stringify(userData))
        } else {
            sessionStorage.removeItem('userInfo')
        }
    }, [userData])

    const handleLogout = () => {
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('userInfo');
        setUserData(null);
        navigate('/');
    }

    const ConditionalHeader = () => {
        if (userData && userData.name) {
            return (
                <>
                    <Link to="" className='btn btn-primary'>
                        <span className="glyphicon glyphicon-user"></span> Hi {userData.name}
                    </Link> &nbsp;
                    <button onClick={handleLogout} className='btn btn-danger'>
                        <span className="glyphicon glyphicon-log-out"></span> Logout
                    </button>
                </>

            )
        }

        return (
           <>
                <Link to="/register" className="btn btn-primary">
                    <span className="glyphicon glyphicon-user"></span> Sign Up
                </Link>{" "}
                &nbsp;
                <Link to="/login" className="btn btn-success">
                    <span className="glyphicon glyphicon-log-in"></span> Login
                </Link>
            </>

        )
    }

    return (
        <>
            <header>
                <div id="brand">
                    Developer Funnel &nbsp;&nbsp;
                    <Link className='btn btn-info' to="/">Home</Link>
                </div>
                <div id="social">
                    {ConditionalHeader()}
                </div>
            </header>
        </>
    )
}

export default Header;