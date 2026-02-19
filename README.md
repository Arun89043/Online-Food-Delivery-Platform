# Online Food Delivery Platform

A full-stack web application for online food ordering, built with Django REST Framework for the backend and React for the frontend.

## Features

### User Management
- **Multi-role Authentication**: Support for customers, restaurant owners, delivery partners, and admins
- **JWT Authentication**: Secure token-based authentication system
- **User Profiles**: Phone number and address management

### Restaurant Management
- **Restaurant Registration**: Restaurant owners can register and manage their establishments
- **Menu Management**: Add, update, and categorize menu items (Food/Drink)
- **Availability Control**: Toggle item availability

### Order Management
- **Order Placement**: Customers can browse menus and place orders
- **Order Tracking**: Real-time order status updates (Pending, Confirmed, Preparing, Out for Delivery, Delivered, Cancelled)
- **Payment Tracking**: Monitor payment status (Paid/Unpaid)
- **Order History**: View past orders

### Admin Features
- **Admin Dashboard**: Beautiful admin interface powered by Jazzmin
- **User Management**: Admin controls over all users and roles
- **Content Management**: Oversee restaurants, orders, and menu items

## Tech Stack

### Backend
- **Django 6.0.2**: Web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Database (with SQLite for development)
- **JWT Authentication**: Secure authentication
- **CORS Headers**: Cross-origin resource sharing
- **Whitenoise**: Static file serving
- **Gunicorn**: WSGI server

### Frontend
- **React 19.2.4**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Testing Library**: Component testing

### Deployment
- **Heroku**: Cloud platform
- **Python 3.11.8**: Runtime environment

## Installation

### Prerequisites
- Python 3.11.8
- Node.js and npm
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arun89043/Online-Food-Delivery-Platform.git
   cd Online-Food-Delivery-Platform
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database setup**
   ```bash
   cd food_delivery
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the server**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd food-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Restaurants
- `GET /api/restaurants/` - List all restaurants
- `POST /api/restaurants/` - Create restaurant (restaurant owners)
- `GET /api/restaurants/{id}/` - Restaurant details
- `GET /api/restaurants/{id}/menu/` - Restaurant menu

### Orders
- `GET /api/orders/` - List user orders
- `POST /api/orders/` - Create new order
- `GET /api/orders/{id}/` - Order details
- `PATCH /api/orders/{id}/` - Update order status

### Users
- `GET /api/users/profile/` - User profile
- `PATCH /api/users/profile/` - Update profile

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Restaurants**: View available restaurants and their menus
3. **Place Orders**: Add items to cart and place orders
4. **Track Orders**: Monitor order status in real-time
5. **Manage Restaurant** (Restaurant owners): Add menu items, update availability
6. **Admin Panel**: Access `/admin/` for administrative controls

## Environment Variables

Create a `.env` file in the root directory for production:

```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=your-database-url
```

## Deployment

This project is configured for Heroku deployment:

1. **Install Heroku CLI**
2. **Login to Heroku**
   ```bash
   heroku login
   ```
3. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```
4. **Set environment variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set DEBUG=False
   ```
5. **Deploy**
   ```bash
   git push heroku main
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Arun - [GitHub](https://github.com/Arun89043)

Project Link: [https://github.com/Arun89043/Online-Food-Delivery-Platform](https://github.com/Arun89043/Online-Food-Delivery-Platform)