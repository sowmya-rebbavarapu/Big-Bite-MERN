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
                      // Convert the object `item` into an array of food details
                      return await Promise.all(
                        Object.entries(item).map(async ([foodId, quantity]) => {
                          try {
                            // Fetch item details from the API
                            const foodResponse = await axios.get(`${url}/api/food/${foodId}`);
                            const foodData = foodResponse.data.data;
              
                            return {
                              name: foodData.name || "Unknown Item", // Ensure name is safely retrieved
                              quantity: quantity,
                            };
                          } catch (error) {
                            console.error("Error fetching food details:", error);
                            return { name: "Unknown Item", quantity };
                          }
                        })
                      );
                    })
                  );
              
                  return { ...order, items: updatedItems.flat() }; // Flatten nested arrays
                })
              );
              

            console.log(updatedOrders)


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
