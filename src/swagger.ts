import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API da Academia",
      version: "1.0.0",
      description: "Documentação da minha API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "server local"
      },
      {
        url: "https://api-typescript-pi.vercel.app",
        description: "server de produção"  
      },
      {
        url: "https://api-typescript-jk9zy086z-kennedyjuniors-projects.vercel.app",
        description: "server de produção 2"  
      },
      {
        url: "https://api-typescript-346sgh02t-brenomflima7436-1787s-projects.vercel.app",
        description: "server de produção 3"  
      },
    ],
  },
  apis: [__dirname + "/routes/*.ts", __dirname + "/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js"
    ]
  }));
};
