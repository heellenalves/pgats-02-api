const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controllers/userController');
const transferController = require('./controllers/transferController');

const app = express();
app.use(express.json());

app.use('/api/users', userController);
app.use('/api/transfers', transferController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
