import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // Fetch User Orders
    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            const orders = response.data.data; // User orders list

            // Fetch item details for each order
            const updatedOrders = await Promise.all(
                orders.map(async (order) => {
                    const updatedItems = await Promise.all(

                        order.items.map(async (item) => {

                            console.log(item);
                            const itemId = Object.keys(item)[0]; // Extracting item ID
                            const quantity = item[itemId]; // Extracting quantity

                            try {
                                // Fetch item details from the food database using ID
                                const foodResponse = await axios.get(`${url}/api/food/${itemId}`);
                                const foodData = foodResponse.data.data; // Ensure accessing `.data`

                                return {
                                    name: foodData.name || "Unknown Item", // Get the item name safely
                                    quantity: quantity,
                                };
                            } catch (error) {
                                console.error("Error fetching food details:", error);
                                return { name: "Unknown Item", quantity };
                            }
                        })
                    );

                    return { ...order, items: updatedItems };
                })
            );

            setData(updatedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                            <p>
                                {order.items.map((item, idx) => (
                                    <span key={idx}>
                                        {item.name} X {item.quantity}
                                        {idx !== order.items.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
