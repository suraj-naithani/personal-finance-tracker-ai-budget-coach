# Personal Finance Tracker + AI Budget Coach  ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-yellowgreen)

## Project Description
The **Personal Finance Tracker + AI Budget Coach** is a full-stack web application designed to empower users in managing their personal finances effectively. This application allows users to track income and expenses, set budget goals, visualize financial progress, and receive personalized insights through an AI-powered chatbot.

## Features
- 🔒 Secure user authentication and profile management
- 💰 Income and expense tracking with categorization
- 📊 Budget creation and monitoring with progress indicators
- 📈 Visual financial reports with export options (PDF/CSV)
- 🤖 AI-powered chatbot for personalized financial insights and money-saving strategies
- 📱 Responsive design for mobile and desktop users
- ⚙️ Centralized error handling and validation middleware
- 🔑 Role-based access control for free vs premium users

## Tech Stack
### Frontend
- React
- Bootstrap

### Backend
- Node.js
- Express
- JWT

### Database
- MongoDB

### DevOps
- OpenAI API
- Chart.js

## Installation
To set up the project locally, follow these steps:

- Clone the repository
bash
git clone https://github.com/suraj-naithani/personal-finance-tracker-ai-budget-coach.git
- Navigate to the project directory
bash
cd personal-finance-tracker-ai-budget-coach
- Install dependencies for the backend
bash
cd backend
npm install
- Install dependencies for the frontend
bash
cd ../frontend
npm install
- Set up environment variables (create a `.env` file in the backend directory)
bash
touch .env
- Start the backend server
bash
cd ../backend
npm start
- Start the frontend server
bash
cd ../frontend
npm start
## Usage
Once the application is running, navigate to `http://localhost:3000` in your web browser. You can create an account, log in, and start tracking your finances. Use the AI chatbot for personalized financial advice.

## API Documentation
For detailed API documentation, please refer to the [API Documentation](https://github.com/suraj-naithani/personal-finance-tracker-ai-budget-coach/wiki/API-Documentation).

## Testing
To run tests for the application, follow these steps:

- Navigate to the backend directory
bash
cd backend
- Run the tests
bash
npm test
## Deployment
To deploy the application, you can use platforms like Heroku or Vercel. Ensure that you set the necessary environment variables and build the frontend for production.

## Contributing
We welcome contributions! Please follow these steps to contribute:

- Fork the repository
- Create a new branch (`git checkout -b feature/YourFeature`)
- Make your changes and commit them (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/YourFeature`)
- Open a pull request

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Special thanks to the contributors and the open-source community for their invaluable resources and support.