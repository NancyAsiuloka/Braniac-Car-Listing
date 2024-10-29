const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Automobile Marketplace API",
      version: "1.0.0",
      description: "API documentation for the automobile marketplace application",
    },
    servers: [
      {
        url: "http://localhost:3030/api/v1",
      },
    ],
  },
  apis: ["./controllers/userController.js"],
};

module.exports = swaggerJsdoc(swaggerOptions);
