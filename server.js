require("dotenv").config();
const express = require("express");
const http = require("http");
const { dbConnect } = require("./src/config/db");
const bodyParser = require("body-parser")
const userRouter = require('./src/routes/userRoute');
const AppError = require('./src/utils/appError')
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swaggerOptions");

const app = express();
const server = http.createServer(app);

dbConnect();

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/api/v1', userRouter);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Handling 404 Errors
app.all('*', (req, res) => {
    res.status(500).json({ message: `Can't find ${req.originalUrl} on this server!` });
});

// Global error handler
app.use(require('./src/controllers/error'));

const port = process.env.PORT || 3032;
server.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

module.exports = app;