import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {  
  const [orders, setOrders] = useState([]);
  const [itemDetails, setItemDetails] = useState({});

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders.");
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated!");
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      toast.error("An error occurred while updating order status.");
      console.error("Error updating status:", error);
    }
  };

  // Fetch item names in bulk
  useEffect(() => {
    const fetchItemNames = async () => {
      const missingItems = new Set();
      orders.forEach(order => {
        order.items.forEach(item => {
          const itemId = Object.keys(item)[0];
          if (!itemDetails[itemId]) {
            missingItems.add(itemId);
          }
        });
      });

      if (missingItems.size > 0) {
        try {
          const responses = await Promise.all(
            [...missingItems].map(id => axios.get(`${url}/api/food/${id}`))
          );

          const newItemDetails = {};
          responses.forEach((res, index) => {
            if (res.data.success) {
              newItemDetails[[...missingItems][index]] = res.data.data.name;
            }
          });

          setItemDetails(prev => ({ ...prev, ...newItemDetails }));
        } catch (error) {
          console.error("Error fetching food items:", error);
        }
      }
    };

    fetchItemNames();
  }, [orders, url]);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => {
                  const itemId = Object.keys(item)[0];
                  const quantity = item[itemId];
                  return (
                    <span key={idx}>
                      {itemDetails[itemId] || "Loading..."} x {quantity}
                      {idx !== order.items.length - 1 && ", "}
                    </span>
                  );
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zip}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
