const { DataTypes } = require("sequelize");
const db = require("../db");

const ScheduleModel = db.define("schedule", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = ScheduleModel;