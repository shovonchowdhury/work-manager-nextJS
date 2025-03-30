# Work Manager

Work Manager is a task management application that allows users to sign up, add tasks, and track their task completion rate. Built with Next.js, MongoDB, Mongoose, Cloudinary, Tailwind CSS, bcrypt, JWT, and Redux, this application provides a smooth user experience for managing tasks and deadlines.

## Features

- **User Signup and Login**: Users can sign up with a username, email, and profile picture. They can log in using their credentials and access the task management features.
- **Add Tasks**: Users can add tasks with a title, content, status (pending/completed), and deadline.
- **Task Filtering**: Users can filter tasks by status (pending or completed) to quickly find tasks that need attention.
- **Remaining Time**: For each task, the remaining time until the deadline is displayed, helping users prioritize tasks.
- **Task Management Insights**: On the home route, users can see:
  - Total tasks completed
  - Task completion rate
  - Recently added tasks
- **Redux Integration**: The app uses Redux for state management, ensuring smooth task management and authentication handling.

## Quick Access

For demo purposes, you can use the following credentials:
- **Email**: `user123@gmail.com`
- **Password**: `1234`

## Technologies Used

- **Next.js**: A React framework for building the front-end and handling server-side rendering.
- **MongoDB**: A NoSQL database used to store user data and tasks.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Cloudinary**: A cloud service for storing user profile pictures.
- **Tailwind CSS**: A utility-first CSS framework for styling the app.
- **bcrypt**: A library for hashing passwords and ensuring secure authentication.
- **JWT (JSON Web Tokens)**: A method for securely transmitting information between the server and the client.
- **Redux**: A state management library for managing user authentication and tasks across the application.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/shovonchowdhury/work-manager.git
   ```
2. Navigate into the project directory:
   ```bash
   cd work-manager
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables. Create a `.env.local` file in the root of the project and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret_key

   ```

5. Run the development server:

   ```bash
   npm run dev

   ```

6. Open your browser and go to `http://localhost:3000`.
