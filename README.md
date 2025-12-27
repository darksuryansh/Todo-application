# Todo Application

A full-stack Todo application built with React, Node.js, Express, and MongoDB. Features user authentication, CRUD operations for todos, and containerized deployment with Docker.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT
- **Todo Management**: Create, read, update, and delete todos
- **Modern UI**: Built with React, Tailwind CSS, and Radix UI components
- **Real-time Updates**: Efficient state management
- **Responsive Design**: Mobile-friendly interface
- **Redis Caching**: Improved performance with Redis integration
- **Dockerized**: Easy deployment with Docker Compose

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** 4.1 - Styling framework
- **Radix UI** - Accessible component primitives
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Sonner/React Hot Toast** - Toast notifications

### Backend
- **Node.js** with **Express** 5.2 - Server framework
- **MongoDB** with **Mongoose** 9.0 - Database
- **Redis** with **ioredis** - Caching layer
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### DevOps
- **Docker** & **Docker Compose** - Containerization
- **MongoDB** - Database container
- **Nodemon** - Development auto-reload

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- Docker and Docker Compose
- MongoDB (if running without Docker)
- Redis (if running without Docker)

## 🏗️ Project Structure

```
todoapp/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (Home, Login, Navbar)
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service layer
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── Dockerfile         # Client Docker configuration
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers (todo, user)
│   ├── models/            # Mongoose models (todo, user)
│   ├── routes/            # API routes (todo, user)
│   ├── middleware/        # Custom middleware (isAuthenticated)
│   ├── db/                # Database connection
│   └── Dockerfile         # Server Docker configuration
│
└── docker-compose.yml     # Docker orchestration
```

## 🚀 Getting Started

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/darksuryansh/Todo-application.git
   cd todoapp
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:lication
   ```env
   PORT=3000
   MONGODB_URI=mongodb://mongo:27017/todoapp
   JWT_SECRET=your_jwt_secret_key_here
   REDIS_URL=redis://localhost:6379
   NODE_ENV=development
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

5. **Stop the application**
   ```bash
   docker-compose down
   ```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/todoapp
   JWT_SECRET=your_jwt_secret_key_here
   REDIS_URL=redis://localhost:6379
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 Available Scripts

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server

- `npm run dev` - Start development server with nodemon

## 🔌 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user
- `POST /api/user/logout` - Logout user
- `GET /api/user/profile` - Get user profile

### Todos
- `GET /api/todo` - Get all todos for authenticated user
- `GET /alltodos` - Get all todos (cached with Redis)
- `POST /api/todo` - Create new todo
- `PUT /api/todo/:id` - Update todo
- `DELETE /api/todo/:id` - Delete todo

## 🐳 Docker Services

The application uses three Docker services:

1. **MongoDB** - Database service (port 27017)
2. **Server** - Backend API service (port 3000)
3. **Client** - Frontend React app (port 5173)

All services are connected via a custom Docker network (`todoapp-network`).

## 🔒 Environment Variables

### Server (.env)
```env
PORT=3000
MONGODB_URI=mongodb://mongo:27017/todoapp
JWT_SECRET=your_jwt_secret_key_here
REDIS_URL=redis://localhost:6379
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

GitHub: [@darksuryansh](https://github.com/darksuryansh)

## 🙏 Acknowledgments

- Radix UI for accessible component primitives
- Tailwind CSS for utility-first styling
- shadcn/ui for component inspiration
- Lucide for beautiful icons

## 📧 Support

For issues and questions, please create an issue in the [GitHub repository](https://github.com/darksuryansh/Todo-application/issues).

---

**Note**: Make sure to update the `JWT_SECRET` in your `.env` file with a secure random string before deploying to production.
