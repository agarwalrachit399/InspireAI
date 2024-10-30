# [InspireAI](https://inspire-ai-xi.vercel.app)

A responsive Next.js application that allows users to create profiles, create prompts, share them with others, and filter prompts by tags, text, or users.

## Table of Contents

1. [Architectural Overview](#architectural-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)

### Architectural Overview

![Project Logo](https://www.interviewbit.com/blog/wp-content/uploads/2022/06/Client-and-Server-1024x427.png)

The application utilizes a `Client-Server Architecture` where the Next.js frontend interacts with a backend API for user authentication, prompt management, and data storage. This architecture facilitates the separation of concerns and enhances the scalability and maintainability of the application.

- The frontend handles user interactions and presents the UI using `reusable React components`.
- The backend manages `authentication` and `data persistence`, ensuring secure access to user profiles and prompts.
- The application leverages Next.js features for `server-side rendering` and API routes for efficient data handling.


### Features

- **User Profiles**: Users can create and manage their profiles.
- **Prompt Creation**: Users can create prompts to share with others.
- **Prompt Sharing**: Users can share their prompts and view prompts created by others.
- **Filtering Prompts**: Prompts can be filtered by tags, text, or the user who created them.
- **Profile and Prompt Editing**: Users can easily edit their profile information and prompts.
- **Authentication**: The app implements secure user authentication.

### Technologies Used
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **API**: REST API for user and prompt management
- **Database**: MongoDB for storing user information and prompts
### Getting Started

These instructions will help you set up and run the project locally.

#### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)
- [MongoDB](https://www.mongodb.com/) (v4+)

#### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/agarwalrachit399/InspireAI.git
   cd InspireAI
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **API Configuration**:
- To set up Google Provider for authentication, you need to create a project on the [Google Cloud Console](https://console.cloud.google.com/).
- Obtain your Client ID and Client Secret from the Google Cloud Console.
- Create a .env.local file in the root directory and add your Google credentials:

  ```bash
  GOOGLE_CLIENT_ID=your_google_client_id_here
  GOOGLE_CLIENT_SECRET=your_google_client_secret_here
  NEXTAUTH_URL=http://localhost:3000
  NEXTUTH_URL_INTERNAL=http://localhost:3000
  NEXTAUTH_SECRET=your_secret_key
4. **Set up MongoDB**:
- Ensure MongoDB is running locally or connect to a MongoDB Atlas cluster.
- Create a Database called "share_prompt"
- In the .env file, add your MongoDB connection string.

  ```bash
  MONGO_URI= your_connection_string

#### Usage

1. **Development Server**:
- To start your application in development mode, run:

  ```bash
  npm run dev
  ```
  The application will be available at `http://localhost:3000`.

2. **Build for Production**:
- To build the project for production, use:

   ```bash
   npm run build
   ```
3. **Start the Production Server**:
- After building, you can start the production server with:

  ```bash
  npm start
  ```
