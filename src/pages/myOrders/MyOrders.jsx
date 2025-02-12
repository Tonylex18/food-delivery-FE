import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {}, // Request body (empty object)
                {
                    headers: { 
                        token,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            setData(response.data.data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch orders');
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, url]);

    if (isLoading) {
        return <div className="my-orders">Loading orders...</div>;
    }

    if (error) {
        return (
            <div className="my-orders">
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={fetchOrders}>Retry</button>
            </div>
        );
    }

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    data.map((order, index) => (
                        <div key={order.id || index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel icon" />
                            <p>
                                {order.items?.map((item, idx) => 
                                    `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? '' : ', '}`
                                )}
                            </p>
                            <p>${order.amount?.toFixed(2)}</p>
                            <p>Items: {order.items?.length || 0}</p>
                            <p>
                                <span>&#x25cf;</span> <b>{order.status}</b>
                            </p>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchOrders();
                                }}
                            >
                                Track Order
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyOrders
