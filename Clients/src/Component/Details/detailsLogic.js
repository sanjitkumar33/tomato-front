import React, { useState, useEffect } from 'react';
import './details.css';
import axios from 'axios';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../Header';

const base_url = "http://localhost:9120";

const DetailDisplay = () => {
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();
    let [restDetails, setRestDetails] = useState({});
    let [mealId] = useState(sessionStorage.getItem('mealId'));
    let restId = searchParams.get('restId');

    const restDetail = async () => {
        try {
            const response = await axios.get(`${base_url}/details/${restId}`);
            setRestDetails(response.data[0]);
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };

    useEffect(() => {
        restDetail();
    }, [restId]);

    const proceed = () => {
        const token = sessionStorage.getItem('ltk');
        if (token) {
            navigate(`/placeOrder/${restDetails.restaurant_name}`);
        } else {
            navigate('/login');
        }
    };

    const renderDetails = () => {
        if (!restDetails.restaurant_name) {
            return <div>Loading...</div>;
        }

        return (
            <>
                <Header/>
                <div className='tileImage'>
                    <div className='imageClass'>
                        <img src={restDetails.restaurant_thumb}
                            alt={restDetails.restaurant_name} />
                    </div>
                </div>
                <div className='tileContent'>
                    <div className='content'>
                        <h1>{restDetails.restaurant_name}</h1>
                        <span id="cfeedback">231 Customers Rating Average</span>
                        <h3>Old Price <del>Rs. 450</del></h3>
                        <h3>Offer Price Rs. {restDetails.cost}</h3>
                        <h3>Best Taste of Fresh Chai with Samosa At your Door or DineIn</h3>
                        <div>
                            <div className="icons">
                                <img src="https://i.ibb.co/wJvrhYg/veg.png" alt="Veg" />
                            </div>
                            <div className="icons">
                                <img src="https://i.ibb.co/mD3jpgc/sentizied.png" alt="Sanitized" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="col-md-12">
                        <Link className="btn btn-danger"
                            to={`/listing/${mealId}`}>Back</Link>&nbsp;&nbsp;
                        <button className='btn btn-success'
                            onClick={proceed}>Proceed</button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className='main'>
            {renderDetails()}
        </div>
    );
};

export default DetailDisplay;
