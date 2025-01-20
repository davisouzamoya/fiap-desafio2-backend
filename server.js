const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.js');
const router = require('./routes');

const app = express();

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
