# Online Food Delivery Platform

A full-stack web application for managing food delivery operations. Built with Django REST Framework for the backend, this platform connects customers with restaurants and delivery partners.

## Features

### User Management
- **Multi-role User System**: Support for Customers, Restaurants, Delivery Partners, and Admins
- **User Authentication**: Secure JWT-based authentication with Simple JWT
- **User Profiles**: Extended user model with phone numbers and addresses

### Restaurant Management
- **Restaurant Registration**: Restaurant owners can create and manage their profiles
- **Menu Management**: Add, update, and manage menu items with categories (Food/Drinks)
- **Restaurant Status**: Track active/inactive restaurant status
- **Item Availability**: Manage menu item availability

### Order Management
- **Order Placement**: Customers can place orders from restaurants
- **Order Tracking**: Real-time order status updates (Pending, Confirmed, Preparing, Out for Delivery, Delivered, Cancelled)
- **Payment Tracking**: Payment status management (Unpaid/Paid)
- **Order Items**: Detailed order items with quantities

## Tech Stack

### Backend
- **Framework**: Django 6.0.2
- **API**: Django REST Framework 3.16.1
- **Authentication**: djangorestframework-simplejwt 5.5.1
- **Database**: PostgreSQL (psycopg2-binary)
- **Admin Interface**: Django Jazzmin 3.0.2
- **CORS**: django-cors-headers 4.9.0

### Deployment
- **Server**: Gunicorn 21.2.0
- **Static Files**: WhiteNoise 6.6.0
- **Environment**: python-decouple 3.8
- **Database URL**: dj-database-url 2.1.0

## Installation

### Prerequisites
- Python 3.8+
- PostgreSQL (optional, SQLite for development)
- pip

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Arun89043/Online-Food-Delivery-Platform.git
   cd food_delivery
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv

   # On Windows
   venv\Scripts\activate

   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the `food_delivery` directory:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=postgresql://user:password@localhost/food_delivery
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

5. **Database Setup**
   ```bash
   cd food_delivery
   python manage.py migrate
   ```

6. **Create Superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

The application will be available at `http://localhost:8000`

## Project Structure

```
food_delivery/
├── food_delivery/          # Main project settings and configuration
│   ├── settings.py        # Django settings
│   ├── urls.py            # Main URL routing
│   └── wsgi.py            # WSGI configuration for deployment
├── users/                  # User management app
│   ├── models.py          # User model with role-based system
│   ├── views.py           # User views and endpoints
│   ├── urls.py            # User URL routing
├── restaurants/            # Restaurant management app
│   ├── models.py          # Restaurant and MenuItem models
│   ├── views.py           # Restaurant views and endpoints
│   ├── urls.py            # Restaurant URL routing
├── orders/                 # Order management app
│   ├── models.py          # Order and OrderItem models
│   ├── views.py           # Order views and endpoints
│   ├── urls.py            # Order URL routing
├── manage.py              # Django management script
└── requirements.txt       # Python dependencies
```

## API Endpoints

### User Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/register/` - User registration

### Restaurants
- `GET /api/restaurants/` - List all restaurants
- `POST /api/restaurants/` - Create restaurant (Restaurant user only)
- `GET /api/restaurants/{id}/` - Restaurant details
- `PUT /api/restaurants/{id}/` - Update restaurant
- `DELETE /api/restaurants/{id}/` - Delete restaurant

### Menu Items
- `GET /api/restaurants/{id}/menu-items/` - List menu items
- `POST /api/restaurants/{id}/menu-items/` - Add menu item
- `PUT /api/menu-items/{id}/` - Update menu item
- `DELETE /api/menu-items/{id}/` - Delete menu item

### Orders
- `GET /api/orders/` - List user orders
- `POST /api/orders/` - Place new order
- `GET /api/orders/{id}/` - Order details
- `PUT /api/orders/{id}/` - Update order status
- `DELETE /api/orders/{id}/` - Cancel order

## Admin Interface

Access the Django admin at `/admin/` using superuser credentials. Enhanced with Django Jazzmin for a modern admin interface.

## Development

### Running Tests
```bash
python manage.py test
```

### Code Style
The project follows PEP 8 Python style guidelines.

## Deployment

The project is configured for deployment on Render. Key configuration files:
- `Procfile` - Specifies the web process
- `runtime.txt` - Python version specification
- `requirements.txt` - All dependencies

### Deploy to Render
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Render will automatically deploy on each push to main branch

## Environment Variables

Key environment variables needed:
- `DEBUG` - Set to False in production
- `SECRET_KEY` - Django secret key for security
- `DATABASE_URL` - Database connection string
- `ALLOWED_HOSTS` - Comma-separated list of allowed hosts

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please reach out to the project maintainer.

---

**Last Updated**: February 2025
