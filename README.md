School Management System
This is a Node.js-based backend application for managing a school system, featuring functionality for managing teachers, students, and classes. The application uses JWT authentication for secure API calls and integrates Cloudinary for managing profile pictures. An admin user is pre-configured (hardcoded) for initial setup.

Features
Teacher Management: Create, update, delete, and view teachers.
Student Management: Create, update, delete, and view students.
Class Management: Manage class information and relationships with teachers and students.
JWT Authentication: Secures all endpoints.
Cloudinary Integration: Handles profile image uploads.
Prerequisites
Node.js (v14 or above)
MongoDB (local or cloud-based)
Cloudinary Account (for image storage)
Setup Instructions
1. Clone the Repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
2. Install Dependencies
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add the following:

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
4. Generate a JWT Token for Authentication
Run the generateToken.js script to generate a JWT token:

node generateToken.js
The script will output a token in the terminal. Use this token for API authentication.

5. Start the Server
npm start
The server will run on http://localhost:3000 by default.

Authentication
All protected routes require a valid JWT token. Pass the token in the Authorization header as follows:

{
  "Authorization": "Bearer <your-jwt-token>"
}
