const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("Comment", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

// UUID => 550e8400-e29b-41d4-a716-446655440000
// 네트워크 상에서 고유성이 보장되는 id를 만들기 위한 표준 규약
