import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayOrder from './DisplayOrder';
import Header from '../Header';

const url = "https://tomapi1.onrender.com/orders";

const ViewOrder = () => {
    const [orders, setOrder] = useState([]);
    let sessionData = sessionStorage.getItem('userInfo');
    let data = JSON.parse(sessionData);

    // Fetch orders
    const fetchOrders = () => {
        axios.get(`${url}?email=${data.email}`)
            .then((res) => setOrder(res.data))
            .catch(err => console.log("Error fetching orders", err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Delete order by ID
    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:9120/deleteOrder/${orderId}`);
            
            fetchOrders(); // Refresh list after deletion
        } catch (err) {
            console.log("Error deleting order", err);
        }
    };

    return (
        <>
            <Header />
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order._id} className="order-item">
                        <DisplayOrder orderData={[order]} />
                        <button className='btn btn-danger' onClick={() => deleteOrder(order._id)}>
                            Delete Order
                        </button>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </>
    );
};

export default ViewOrder;
