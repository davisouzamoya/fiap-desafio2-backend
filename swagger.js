import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Minha API',
            version: '1.0.0',
            description: 'Documentação da minha API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Caminho para os arquivos de rota
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
