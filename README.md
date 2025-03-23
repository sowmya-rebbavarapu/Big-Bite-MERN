
# Big-Bite Full Stack Food  Delivery Website 

This is a **full-stack  application** built using **React.js, Node.js, Express, and MongoDB**. The project includes:  
- **Frontend** (User Panel)  
- **Backend** (API & Database Management)  
- **Admin Panel** (Product & Order Management)  

---

##  Features  

### **Frontend (User Panel)**  
- **Home Page** → Browse available items.  
- **Login & Signup** → Users must log in to access features.  
- **Cart Page** → Add and manage items in the cart.  
- **Place Order Page** → Checkout and confirm orders.  
- **My Orders Page** → View order history.  
- **Logout** → Securely log out of the system.  

### **Backend (API & Database)**  
- Manages **user authentication** and sessions.  
- Handles **data storage** using MongoDB.  
- Provides RESTful APIs for **frontend & admin panel**.  

### **Admin Panel**  
- **Add Items** → Admins can add new products.  
- **View All Orders** → See and manage all user orders.  
- **Manage Items** → View and update all available products.  

---

##  Tech Stack  
- **Frontend** → React.js, JavaScript  
- **Backend** → Node.js, Express.js  
- **Database** → MongoDB  
- **Authentication** → JWT & Cookies  
- **Styling** → CSS  

---

##  Environment Variables  

Create a `.env` file inside the **backend** folder and add:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

##  Run the Application  

#### **Backend**  
```sh
cd backend
npm run server
```
#### **Frontend**  
```sh
cd frontend
npm run dev
```

**Open your browser** → `http://localhost:5173/`  

---

## API Endpoints  

| Method | Endpoint          | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/food`      | Fetch all food items     |
| POST   | `/api/user/login` | User login               |
| POST   | `/api/user/signup` | User signup              |
| POST   | `/api/cart`      | Add item to cart         |
| GET    | `/api/cart`      | View cart items          |
| POST   | `/api/order`     | Place an order           |
| GET    | `/api/order`     | View user orders         |

---
