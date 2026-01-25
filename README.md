# MERN Stack Portfolio

A full-stack portfolio application built with MongoDB, Express.js, React, and Node.js.

## Project Structure
```
PortFolio/
├── backend/     # Node.js/Express API
└── frontend/    # React application
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

**Environment Variables (.env):**
- Replace `<username>` and `<password>` with your MongoDB Atlas credentials
- Update `EMAIL_USER` and `EMAIL_PASS` for contact form emails

**Start Backend:**
```bash
npm run dev    # Development
npm start      # Production
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

**Environment Variables (.env):**
- For local development: `REACT_APP_API_URL=http://localhost:5000/api`
- For production: Update with your Render backend URL

**Start Frontend:**
```bash
npm start
```

## MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `.env` file
4. Whitelist your IP address

## Deployment on Render

### Backend Deployment:
1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy as Web Service

### Frontend Deployment:
1. Update `REACT_APP_API_URL` in frontend `.env`
2. Connect GitHub repo to Render
3. Deploy as Static Site
4. Build command: `npm run build`
5. Publish directory: `build`

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get single project
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all contacts

## Features

- Responsive design
- Contact form with email notifications
- Project showcase
- MongoDB integration
- RESTful API
- MVC architecture

## Technologies Used

**Frontend:**
- React 18
- React Router
- Axios
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB/Mongoose
- Nodemailer
- CORS

## Adding Projects

You can add projects via API or directly in MongoDB:

```javascript
{
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://project-demo.com",
  "imageUrl": "https://image-url.com"
}
```