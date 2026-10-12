# ShopKart 🛒

ShopKart is a full-stack e-commerce web application where users can browse products, manage their wishlist and shopping cart, place orders, and complete checkout using Razorpay test payments.

## Features

- User registration and login
- Authentication using JWT and HTTP-only cookies
- Browse and view product details
- Add and remove products from the wishlist
- Add products to the cart and manage quantities
- Checkout and order placement
- Razorpay test-payment integration
- Payment verification on the backend
- View order history and order details

## Tech Stack

**Frontend**
- React
- Vite
- Redux Toolkit
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Tokens (JWT)
- Razorpay

## Project Structure

```text
ShopKart/
├── Backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   ├── package.json
│   └── .env (create locally)
├── Frontend/
│   └── shopkart/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB connection
- Razorpay test account credentials for testing payments

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ShopKart
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository's actual URL.

### 2. Start the backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and configure the environment variables required by the backend, including your MongoDB connection URL, JWT secret, and Razorpay credentials.

Start the backend using the script configured in `Backend/package.json`, for example:

```bash
npm run dev
```

### 3. Start the frontend

Open another terminal:

```bash
cd Frontend/shopkart
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Payments

ShopKart integrates Razorpay for checkout. Use test-mode credentials for development and testing. Never commit API secrets, database credentials, or other sensitive environment variables to GitHub.

## Future Improvements

- Deploy the frontend and backend
- Improve product search and filtering
- Add more automated tests
- Improve error handling and user experience

## Author

Developed as a full-stack web development project.