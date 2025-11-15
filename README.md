# Portfolio & Blog API

A RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio and blog.

## Live API URL
[Your Deployed API URL]

## Tech Stack
- Node.js & Express (Backend Framework)
- MongoDB Atlas (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Helmet (Security Headers)
- Dotenv (Environment Variables)

## API Endpoints

### Authentication
| Method | Endpoint          | Description                  | Access       | Body Params                  |
|--------|-------------------|------------------------------|--------------|------------------------------|
| POST   | /api/users/register | Register a new user        | Public       | username, email, password    |
| POST   | /api/users/login    | Login and get JWT           | Public       | email, password              |

### Projects
| Method | Endpoint          | Description                  | Access       | Body Params                  |
|--------|-------------------|------------------------------|--------------|------------------------------|
| GET    | /api/projects     | Get all projects             | Public       | -                            |
| GET    | /api/projects/:id | Get single project           | Public       | -                            |
| POST   | /api/projects     | Create new project           | Protected    | title, description, imageUrl (opt), repoUrl (opt), liveUrl (opt) |
| PUT    | /api/projects/:id | Update project               | Protected    | title, description, etc.     |
| DELETE | /api/projects/:id | Delete project               | Protected    | -                            |

### Blog
| Method | Endpoint          | Description                  | Access       | Body Params                  |
|--------|-------------------|------------------------------|--------------|------------------------------|
| GET    | /api/blog         | Get all blog posts           | Public       | -                            |
| GET    | /api/blog/:id     | Get single blog post         | Public       | -                            |
| POST   | /api/blog         | Create new blog post         | Protected    | title, content               |
| PUT    | /api/blog/:id     | Update blog post             | Author Only  | title, content               |
| DELETE | /api/blog/:id     | Delete blog post             | Author Only  | -                            |

### Comments
| Method | Endpoint                      | Description                  | Access       | Body Params                  |
|--------|-------------------------------|------------------------------|--------------|------------------------------|
| GET    | /api/blog/:postId/comments    | Get all comments for post    | Public       | -                            |
| POST   | /api/blog/:postId/comments    | Create new comment           | Protected    | body                         |

### Contact
| Method | Endpoint          | Description                  | Access       | Body Params                  |
|--------|-------------------|------------------------------|--------------|------------------------------|
| POST   | /api/contact      | Send contact message         | Public       | name, email, message         |

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   - PORT=5000
   - MONGO_URI=your_mongodb_atlas_connection_string
   - JWT_SECRET=your_jwt_secret_key
4. Run development server: `npm run dev`
5. Run production server: `npm start`

## Deployment
Deployed to [Your Deployment Platform, e.g., Render/Heroku]