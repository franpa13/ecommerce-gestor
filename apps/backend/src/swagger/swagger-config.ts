import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Products",
            version: "1.0.0",
            description: "Documentación de la API de productos",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },

        },
    },
    apis: ["./src/routes/*.ts"],
};
export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export { swaggerUi };