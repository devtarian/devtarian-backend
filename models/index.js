let Sequelize = require("sequelize");
let path = require("path");
let fs = require("fs");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
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
