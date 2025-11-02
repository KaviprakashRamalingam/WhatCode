# WhatCode - Code Visualization Platform

WhatCode is an enterprise-level platform that helps developers visualize their code snippets step-by-step to understand how code executes and what it means. It provides a simple, intuitive way to visualize code execution for Python, Java, TypeScript, and React.

## Features

- **Multi-Language Support**: Currently supports Python, Java, TypeScript, and React
- **Step-by-Step Visualization**: See how your code executes line by line
- **Variable State Tracking**: Track variable values throughout execution
- **Real-time Code Execution**: Execute code and see output instantly
- **Modern UI**: Beautiful, responsive interface built with React and TypeScript
- **Enterprise Architecture**: Separated frontend and backend with proper folder structure

## Tech Stack

### Frontend

- **React 18** with **TypeScript**
- **Monaco Editor** for code editing
- **Axios** for API communication
- Modern CSS with responsive design

### Backend

- **Java 17**
- **Spring Boot 3.2.0**
- **Maven** for dependency management
- RESTful API architecture

## Project Structure

```
WhatCode/
├── frontend/                 # React TypeScript Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── CodeEditor/
│   │   │   ├── CodeVisualizer/
│   │   │   ├── LanguageSelector/
│   │   │   ├── OutputPanel/
│   │   │   └── VisualizationPanel/
│   │   ├── services/        # API services
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS files
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                 # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/whatcode/
│   │       │   ├── config/      # Configuration classes
│   │       │   ├── controller/  # REST controllers
│   │       │   ├── dto/         # Data Transfer Objects
│   │       │   ├── exception/   # Exception handlers
│   │       │   ├── model/       # Domain models
│   │       │   └── service/     # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Java 17** or higher
- **Maven 3.6+**

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (optional, defaults to `http://localhost:8080/api`):

```bash
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

4. Start the development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Build the project:

```bash
mvn clean install
```

3. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Or run the `WhatCodeApplication` class directly from your IDE.

The backend API will be available at `http://localhost:8080`

### API Endpoints

- `POST /api/execute` - Execute code and get output
- `POST /api/visualize` - Execute code and get step-by-step visualization
- `GET /api/health` - Health check endpoint

## Usage

1. **Select Language**: Choose from Python, Java, TypeScript, or React from the dropdown
2. **Write/Edit Code**: Use the code editor to write or modify your code
3. **Execute Code**: Click "Execute Code" to run your code and see the output
4. **Visualize Code**: Click "Visualize Code" to see step-by-step execution with variable states
5. **Navigate Steps**: Use Previous/Next buttons or click on step indicators to navigate through visualization steps

## Future Enhancements

The system is designed to be extensible for future features:

1. **AI Assistance**: Integration points are prepared for AI-powered code suggestions and explanations
2. **User Authentication**: Database integration points ready for user login and profile management
3. **Code Saving**: Architecture supports saving user code snippets
4. **Advanced Visualizations**: Framework supports complex data structure visualizations

## Contributing

This is an enterprise-level project with proper separation of concerns. When contributing:

- Follow the existing folder structure
- Maintain TypeScript types in the frontend
- Follow Spring Boot best practices in the backend
- Write meaningful commit messages
- Test your changes before submitting

## License

See LICENSE file for details.

## Support

For issues, questions, or contributions, please open an issue on the repository.
