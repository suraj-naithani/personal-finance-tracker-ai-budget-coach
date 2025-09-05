#!/bin/bash

# Initialize a new Git repository
git init

# Create project structure
mkdir -p client/src/components
mkdir -p client/public
mkdir -p server/src/controllers
mkdir -p server/src/models
mkdir -p server/src/routes
mkdir -p server/src/middleware
mkdir -p server/config

# Create package.json for client and server
echo '{
  "name": "client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "bootstrap": "^5.1.3",
    "chart.js": "^3.6.0",
    "jwt-decode": "^3.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}' > client/package.json

echo '{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.10.9",
    "dotenv": "^8.2.0",
    "jsonwebtoken": "^8.5.1",
    "axios": "^0.21.1"
  }
}' > server/package.json

# Create index.js for server entry point
echo 'const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});' > server/src/index.js

# Create .gitignore files
echo 'node_modules
build
.env' > client/.gitignore

echo 'node_modules
.env' > server/.gitignore

# Initialize client and server
cd client && npm install
cd ../server && npm install

# Final message
echo "Project structure created and Git repository initialized."