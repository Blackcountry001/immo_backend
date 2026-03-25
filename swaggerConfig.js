const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Blog Agence Immobilière',
            version: '1.0.0',
            description: 'Documentation interactive connectée à Railway',
        },
        servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./server.js'],  //Il continue de lire les commentaires dans server.js
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Cette fonction sera appelée par ton serveur principal
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
        customCss: `
            .swagger-ui .topbar { background-color: #FF8C00; } 
            .swagger-ui .info .title { color: #4A4A4A; }
            body { background-color: #FFFFFF; }
        `
    }));
};

module.exports = setupSwagger;
