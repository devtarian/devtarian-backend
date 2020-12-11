let Sequelize = require("sequelize");
let path = require("path");
let fs = require("fs");
// let { Client } = require("pg");

// const client = new Client({
//     connectionString: process.env.HEROKU_POSTGRESQL_MAROON_URL,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });
// client.connect();

const sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_MAROON_URL, {
    dialect: "postgres",
    protocol: "postgres",
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false, // This line will fix new error
        },
    },
});

let db = {};
fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf(".js") && file !== "index.js";
    })
    .forEach((file) => {
        // let model = sequelize['import'](path.join(__dirname, file));
        let model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
