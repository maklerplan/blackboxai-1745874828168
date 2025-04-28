

```markdown
# Geo-Lead Distribution System

## Project Overview
The Geo-Lead Distribution System is a web application designed to manage lead distribution based on geographical location. It incorporates various functionalities such as secure authentication, integration with external APIs (OpenAI, WhatsApp), and a MongoDB database for data storage. The application is built using Node.js and Express, and it aims to provide a seamless lead management experience.

## Features
- **Secure Authentication**: Utilizes JWT for user authentication and authorization.
- **API Integrations**: Connects with OpenAI and WhatsApp APIs for enhanced functionalities.
- **MongoDB Database**: Stores lead information and other related data securely.
- **RESTful API**: Provides a set of endpoints to interact with the application.
- **Configurable Environment Variables**: Easily manage configuration settings through a `.env` file.
- **Hot Reloading**: Developed with Nodemon for faster development iterations.

## Installation
To install and run the Geo-Lead Distribution System, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/geo-lead-distribution.git
   cd geo-lead-distribution
   ```

2. **Install Dependencies**:
   First, ensure you have Node.js and Docker installed. Then, install the required Node.js packages:
   ```bash
   npm install
   ```

3. **Set Up Docker**:
   You can run the application using Docker. Make sure you have Docker and Docker Compose installed. Then run:
   ```bash
   docker-compose up -d
   ```

4. **Configure Environment Variables**:
   Rename the `.env.example` file to `.env` and fill in the necessary configuration details such as database credentials and API keys.

## Usage
- Start the server by running:
  ```bash
  npm run dev
  ```
  This will run the application in development mode.

- Access the application through your browser at:
  ```
  http://localhost:3000
  ```

- You can interact with the API via RESTful endpoints provided in the application (Documentation for these endpoints would typically be included within the project).

## Dependencies
The application requires the following dependencies which are specified in `package.json`:

- **axios**: "^1.9.0"
- **bcrypt**: "^5.1.1"
- **cors**: "^2.8.5"
- **dotenv**: "^16.5.0"
- **express**: "^4.21.2"
- **jsonwebtoken**: "^9.0.2"
- **jssip**: "^3.10.1"
- **mongoose**: "^8.14.0"
- **openai**: "^4.96.0"
- **winston**: "^3.17.0"
- **nodemon** (development): "^3.0.3"

## Project Structure
```
geo-lead-distribution/
├── docker-compose.yml   # Docker configuration for services
├── package.json         # Node.js dependencies and scripts
├── package-lock.json    # Package lock file for reproducible builds
├── src/                 # Source code directory
│   ├── index.js         # Main entry point for the application
│   └── ...              # Other Backend logic files and modules
└── .env.example         # Environment variable template
```

## Contributing
Contributions to the Geo-Lead Distribution System are welcome. If you'd like to contribute, please fork the repository and create a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
```
