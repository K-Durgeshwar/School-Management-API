<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School Management System API</title>
</head>
<body>

<h1>School Management System API</h1>

<p>This is a <strong>Node.js</strong> and <strong>Express.js</strong>-based REST API for managing a school system with <strong>Teachers</strong>, <strong>Students</strong>, and <strong>Classes</strong>. It includes <strong>authentication</strong> with JWT tokens, file uploads for profile pictures using <strong>Multer</strong> and <strong>Cloudinary</strong>, and hardcoded admin credentials for simplicity.</p>

<h2>Features</h2>
<ul>
    <li><strong>Authentication</strong>: Secure routes with JWT tokens.</li>
    <li><strong>CRUD Operations</strong>: Full support for Teachers, Students, and Classes.</li>
    <li><strong>Image Uploads</strong>: Profile pictures are uploaded to <strong>Cloudinary</strong>.</li>
    <li><strong>Hardcoded Admin</strong>: An admin user is pre-defined for testing purposes.</li>
</ul>

<h2>Setup Instructions</h2>

<h3>Prerequisites</h3>
<ul>
    <li><strong>Node.js</strong> and <strong>npm</strong> installed.</li>
    <li><strong>MongoDB</strong> (local or cloud-hosted).</li>
    <li><strong>Cloudinary</strong> account for image hosting.</li>
</ul>

<h3>Installation</h3>
<pre>
1. Clone the repository:
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>

2. Install dependencies:
   npm install

3. Create a .env file in the root directory and add the following environment variables:
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

4. Generate a JWT token:
   Run the generateToken.js script to generate a token for authentication:
   node generateToken.js
   Use the generated <strong>JWT token</strong> in the Authorization header for all authenticated API calls.

5. Start the server:
   npm start
</pre>

<h2>API Endpoints</h2>

<h3>Teachers</h3>
<table border="1" cellpadding="10">
    <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
        <th>Authentication</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/teachers</td>
        <td>Get all teachers</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/teachers</td>
        <td>Create a new teacher</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/teachers/:id</td>
        <td>Get a teacher by ID</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/api/teachers/:id</td>
        <td>Update a teacher by ID</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/teachers/:id</td>
        <td>Delete a teacher by ID</td>
        <td>Required</td>
    </tr>
</table>

<h3>Students</h3>
<table border="1" cellpadding="10">
    <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
        <th>Authentication</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/students</td>
        <td>Get all students</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/students</td>
        <td>Create a new student</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/students/:id</td>
        <td>Get a student by ID</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/api/students/:id</td>
        <td>Update a student by ID</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/students/:id</td>
        <td>Delete a student by ID</td>
        <td>Required</td>
    </tr>
</table>

<h3>Classes</h3>
<table border="1" cellpadding="10">
    <tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Description</th>
        <th>Authentication</th>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/classes</td>
        <td>Get all classes</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>/api/classes</td>
        <td>Create a new class</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>/api/classes/:id</td>
        <td>Get a class by ID</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>PUT</td>
        <td>/api/classes/:id</td>
        <td>Update a class by ID</td>
        <td>Required</td>
    </tr>
    <tr>
        <td>DELETE</td>
        <td>/api/classes/:id</td>
        <td>Delete a class by ID</td>
        <td>Required</td>
    </tr>
</table>

<h2>Authentication</h2>
<p>This API uses <strong>JWT-based authentication</strong>. To access protected routes:</p>
<ol>
    <li>Generate a JWT token using:
        <pre>node generateToken.js</pre>
    </li>
    <li>Use the token in the <strong>Authorization</strong> header of your API requests:
        <pre>Authorization: Bearer &lt;your-jwt-token&gt;</pre>
    </li>
</ol>

<h2>Routes Explained</h2>

<h3>Teachers</h3>
<ul>
    <li><strong>GET /api/teachers</strong>: Retrieves all teachers.</li>
    <li><strong>POST /api/teachers</strong>: Creates a new teacher. Include `name`, `email`, and `subject` in the request body.</li>
    <li><strong>GET /api/teachers/:id</strong>: Fetches a specific teacher by ID.</li>
    <li><strong>PUT /api/teachers/:id</strong>: Updates a teacher's details.</li>
    <li><strong>DELETE /api/teachers/:id</strong>: Deletes a teacher by ID.</li>
</ul>

<h3>Students</h3>
<ul>
    <li><strong>GET /api/students</strong>: Retrieves all students, with optional pagination and class filtering.</li>
    <li><strong>POST /api/students</strong>: Creates a new student. Requires `name`, `email`, and `classId` in the request body.</li>
    <li><strong>GET /api/students/:id</strong>: Fetches a specific student by ID.</li>
    <li><strong>PUT /api/students/:id</strong>: Updates a student's details.</li>
    <li><strong>DELETE /api/students/:id</strong>: Deletes a student by ID.</li>
</ul>

<h3>Classes</h3>
<ul>
    <li><strong>GET /api/classes</strong>: Retrieves all classes.</li>
    <li><strong>POST /api/classes</strong>: Creates a new class. Requires `name` in the request body.</li>
    <li><strong>GET /api/classes/:id</strong>: Fetches a specific class by ID.</li>
    <li><strong>PUT /api/classes/:id</strong>: Updates a class's details.</li>
    <li><strong>DELETE /api/classes/:id</strong>: Deletes a class by ID.</li>
</ul>

<h2>Notes</h2>
<ul>
    <li><strong>Hardcoded Admin</strong>: An admin user is pre-defined for testing purposes.</li>
    <li><strong>Cloudinary</strong>: Profile pictures are hosted on Cloudinary. Make sure you have the correct configuration in the .env file.</li>
    <li><strong>JWT</strong>: This API uses JWT-based authentication for security purposes.</li>
</ul>

<h2>License</h2>
<p>This project is licensed under the MIT License.</p>

</body>
</html>
