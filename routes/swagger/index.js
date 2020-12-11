module.exports = {
    // Import swaggerDefinitions
    swaggerDefinition: {
        info: {
            // API informations (required)
            title: "DevTarian",
            version: "1.0.0",
            description: "DevTarian API Doc \n [Website]: www.example.com",
        },
        host: "localhost:8000",
        basePath: "/",
        definitions: {
            User: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        format: "string",
                    },
                    email: {
                        type: "string",
                        format: "string",
                    },
                    pw: {
                        type: "string",
                        format: "string",
                    },
                    avatar: {
                        type: "string",
                        format: "string",
                    },
                },
                xml: {
                    name: "User",
                },
            },
        },
    },
    // Path to the API docs
    apis: [
        "./routes/auth/index.js",
        "./models/User/index.js",
        "./roles/index.js",
    ],
};

// https://editor.swagger.io/?_ga=2.119185673.1209193922.1607668896-1975227221.1605015253
