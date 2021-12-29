const express = require("express");
const router = express.Router();
let validateJWT = require("../middleware/validateJWT");
const { BudgetModel } = require("../models");

router.post("/", validateJWT, async (req, res) => {

  const { title, description, from, to } =
    req.body.budget;
  const { id } = req.user;
  const budgetEntry = {
    title,
    description,
    from,
    to,
    owner_id: id,
  };
  try {
    const newBudget = await BudgetModel.create(budgetEntry);
    res.status(200).json(newBudget);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/edit/:id", validateJWT, async (req, res) => {
  const { title, description, from, to } = req.body.budget
  const owner_id = req.params.owner_id;
  const { id } = req.user;

  const query = {
    where: {
      id: owner_id,
      owner_id: id
    }
  }
  console.log(this.put);
  const rescheduledApt = {
    title: title,
    description: description,
    from: from,
    to: to,
  }

  try {
    const update = await BudgetModel.update(rescheduledApt, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

module.exports = router;