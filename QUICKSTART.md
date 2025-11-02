# Quick Start Guide

## Prerequisites Installation

### Node.js & npm

```bash
# Check if installed
node --version
npm --version

# If not installed, download from https://nodejs.org/
```

### Java & Maven

```bash
# Check if installed
java -version
mvn --version

# If not installed:
# Java 17: Download from https://adoptium.net/
# Maven: Download from https://maven.apache.org/download.cgi
```

## Running the Application

### Step 1: Start the Backend

1. Open a terminal and navigate to the backend directory:

```bash
cd backend
```

2. Build and run the Spring Boot application:

```bash
mvn spring-boot:run
```

Wait for the message: `Started WhatCodeApplication` - this means the backend is running on `http://localhost:8080`

### Step 2: Start the Frontend

1. Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies (first time only):

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The browser should automatically open to `http://localhost:3000`

## Using the Application

1. **Select a Language**: Use the dropdown to choose Python, Java, TypeScript, or React
2. **Write Code**: The editor will show a default template - you can edit it or write your own code
3. **Execute Code**: Click "Execute Code" to run your code and see the output
4. **Visualize Code**: Click "Visualize Code" to see step-by-step execution with variable tracking

## Troubleshooting

### Backend won't start

- Make sure Java 17+ is installed: `java -version`
- Make sure Maven is installed: `mvn --version`
- Check if port 8080 is already in use

### Frontend won't start

- Make sure Node.js 16+ is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is already in use

### API Connection Errors

- Make sure the backend is running first (check `http://localhost:8080/api/health`)
- Check that CORS is properly configured (should work out of the box)
- Verify the API URL in frontend `.env` file matches backend URL

## Next Steps

- Customize code execution logic in `backend/src/main/java/com/whatcode/service/CodeExecutionService.java`
- Enhance visualization in `frontend/src/components/VisualizationPanel/`
- Add more language support by extending the `SupportedLanguage` enum
