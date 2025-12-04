"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css",
        customJs: [
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js",
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js"
        ]
    }));
};
exports.setupSwagger = setupSwagger;
