const express = require("express");
const router = express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { BudgetModel } = require("../models");

router.post("/", validateJWT, async (req, res) => {
    const { title, description, fromDate, toDate } =
      req.body.budget;
    const { id } = req.user;
    const budgetEntry = {
      title,
      description,
      fromDate,
      toDate,
      owner_id: id,
    };
    try {
      const newBudget = await BudgetModel.create(budgetEntry);
      res.status(200).json(newBudget);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  module.exports = router;