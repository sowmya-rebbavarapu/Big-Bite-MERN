import React, { useContext, useState ,useEffect} from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItem, token } = useContext(StoreContext); 
  const [orderDetails, setOrderDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const navigate=useNavigate();
  useEffect(()=>{
     if(!token)
      {
         navigate('/cart')
      }
      else if(getTotalCartAmount()===0)
        {
          navigate('/cart');
        }
  },[token])

  // Handling input change
  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  // Placing Order
  const handlePlaceOrder = async () => {
    if (!token) {
      setMessage('Please log in to place an order.');
      return;
    }

    const orderData = {
      items: cartItem, 
      amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2),
      address: orderDetails,
    };

    try {
      const response = await fetch('http://localhost:4000/api/order/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,  // Using token from StoreContext
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Order placed successfully!');
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage('Failed to place order. Please try again.');
    }
  };
    
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
        </div>
        <input type="email" name="email" placeholder="Email address" onChange={handleChange} />
        <input type="text" name="street" placeholder="Street" onChange={handleChange} />
        <div className="multi-fields">
          <input type="text" name="city" placeholder="City" onChange={handleChange} />
          <input type="text" name="state" placeholder="State" onChange={handleChange} />
        </div>
        <div className="multi-fields">
          <input type="text" name="zip" placeholder="Zip Code" onChange={handleChange} />
          <input type="text" name="country" placeholder="Country" onChange={handleChange} />
        </div>
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="button" onClick={handlePlaceOrder}>PROCEED TO PAYMENT</button>
          {message && <p className="order-message">{message}</p>}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
