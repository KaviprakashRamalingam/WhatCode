# Architecture Overview

## System Design

WhatCode follows an enterprise-level architecture with clear separation between frontend and backend.

## Frontend Architecture

### Technology Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Monaco Editor** - Code editor component
- **Axios** - HTTP client for API communication

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── CodeEditor/     # Monaco-based code editor
│   ├── CodeVisualizer/ # Main orchestrator component
│   ├── LanguageSelector/ # Language dropdown
│   ├── OutputPanel/    # Output display area
│   └── VisualizationPanel/ # Step-by-step visualization
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and configs
└── styles/             # CSS styling
```

### Key Features

- Component-based architecture
- Type-safe with TypeScript
- Responsive design
- Real-time code editing
- Step-by-step visualization navigation

## Backend Architecture

### Technology Stack

- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Application framework
- **Maven** - Build and dependency management
- **Lombok** - Boilerplate reduction

### Package Structure

```
com.whatcode/
├── config/             # Configuration classes (CORS, etc.)
├── controller/         # REST API endpoints
├── dto/                # Data Transfer Objects
├── exception/          # Global exception handling
├── model/              # Domain models and enums
└── service/            # Business logic layer
```

### API Design

- RESTful API design
- JSON request/response format
- CORS enabled for frontend communication
- Global exception handling
- Input validation

## Data Flow

1. **User Input**: User selects language and writes code in frontend
2. **API Request**: Frontend sends POST request to backend with code and language
3. **Code Processing**: Backend service processes code execution/visualization
4. **Response**: Backend returns execution results or visualization steps
5. **UI Update**: Frontend displays results in visualization panel and output panel

## Extensibility Points

### Adding New Languages

1. Update `SupportedLanguage` enum in both frontend and backend
2. Add language template in `frontend/src/utils/languageConfig.ts`
3. Implement language-specific execution logic in `CodeExecutionService`

### AI Integration

- Service layer can be extended with AI service integration
- API endpoints can be added for AI-powered suggestions
- DTOs are structured to support AI responses

### Database Integration

- Service layer can be extended with repository pattern
- DTOs support user-related data
- Authentication can be added via Spring Security

## Security Considerations

- CORS configuration limits origins
- Input validation on all API endpoints
- Error messages don't expose internal details
- Code execution is sandboxed (to be implemented in production)

## Performance Optimizations

- Frontend code splitting ready
- API response caching can be added
- Code execution timeout configuration
- Efficient state management in React components
