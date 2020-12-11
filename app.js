require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const db = require("./models");

const app = express();
const port = 8000;

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(require("./routes/swagger"));

// [ DB ]
db.sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        //return db.sequelize.sync();
        //return db.sequelize.drop();
    })
    .then(() => {
        console.log("DB Sync complete.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
// [ Swagger ]
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// [ Middleware ]
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// [ Static ]
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
// [ Routes ]
app.use(require("./routes"));

app.listen(process.env.PORT || port, () => {
    console.log("express listening on port", port);
});
