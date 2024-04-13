const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'Documentation for Express API with Swagger',
        },
    },
    apis: [path.resolve(__dirname, './src/router/*.ts')], // Specify the paths to your TypeScript API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
