# Gaming API

A REST API for user registration, login, score management, and leaderboard functionality using Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Score management for players
- Leaderboard functionality
- API key authentication for protected routes
- Input validation and error handling
- MongoDB integration with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Gaming-API
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/gaming-api
API_KEY=your-secret-api-key-here
PORT=4000
JWT_SECRET=your-jwt-secret-here
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Base URL
```
http://localhost:4000
```

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Score Management Endpoints
*Requires API Key in header: `x-api-key: your-secret-api-key-here`*

#### Get All Scores
- **GET** `/api/scores`
- **Headers:** `x-api-key: your-secret-api-key-here`

#### Add/Update Score
- **POST** `/api/scores`
- **Headers:** `x-api-key: your-secret-api-key-here`
- **Body:**
```json
{
  "playerName": "johndoe",
  "score": 1500
}
```

### Leaderboard Endpoints
*Requires API Key in header: `x-api-key: your-secret-api-key-here`*

#### Get Leaderboard
- **GET** `/api/leaderboard`
- **Headers:** `x-api-key: your-secret-api-key-here`
- Returns top 10 players sorted by score (highest first)

#### Add Score to Leaderboard
- **POST** `/api/leaderboard`
- **Headers:** `x-api-key: your-secret-api-key-here`
- **Body:**
```json
{
  "playerName": "johndoe",
  "score": 1500
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Database Models

### User Model
```javascript
{
  username: String (required, unique, min: 3 chars)
  email: String (required, unique, valid email)
  password: String (required, min: 6 chars, hashed)
  score: Number (default: 0)
  timestamps: true
}
```

### Score Model
```javascript
{
  playerName: String (required)
  score: Number (required, min: 0)
  timestamps: true
}
```

## Security Features

- Password hashing using bcryptjs
- API key authentication for protected routes
- Input validation and sanitization
- Error handling middleware
- Environment variable configuration

## Testing the API

You can test the API using tools like Postman, curl, or any HTTP client.

### Example curl commands:

```bash
# Register a user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Add a score (requires API key)
curl -X POST http://localhost:4000/api/scores \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key-here" \
  -d '{"playerName":"testuser","score":1000}'

# Get leaderboard (requires API key)
curl -X GET http://localhost:4000/api/leaderboard \
  -H "x-api-key: your-secret-api-key-here"
```

## Project Structure

```
Gaming-API/
├── package.json
├── server.js
├── .env
├── src/
│   ├── db.js
│   ├── validators.js
│   ├── middleware/
│   │   └── authApiKey.js
│   ├── models/
│   │   ├── Score.js
│   │   ├── User.js
│   │   └── user.model.js
│   └── routes/
│       ├── auth.routes.js
│       ├── leaderboardroutes.js
│       └── score.routes.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.