const { DataTypes } = require("sequelize");
const db = require("../db");

const BudgetModel = db.define("budget", {
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
    allowNull: false,
  },
});

module.exports = BudgetModel;
>>>>>>> bffc1d2ae64780e0a827323874230d9dcb20c7b3
