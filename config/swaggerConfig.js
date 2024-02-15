// swaggerConfig.js

const swaggerDefinition = {
    openapi: '3.0.0', // Specifies the OpenAPI Specification version being used
    info: {
      title: 'Express API with Swagger', // Title of the documentation
      version: '1.0.0', // Version of the app
      description: 'This is a simple CRUD API application made with Express and documented with Swagger', // Description of the API
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL of the service
        description: 'Development server',
      },
    ],
    // Define security schemes here
    components: {
      securitySchemes: {
        bearerAuth: { // JWT authentication
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // Global security definitions, applied to all endpoints
    security: [{
      bearerAuth: [],
    }],
  };
  
module.exports = swaggerDefinition;
  