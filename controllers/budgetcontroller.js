const express = require("express");
const router = express.Router();
let validateJWT = require("../middleware/validateJWT");
const { BudgetModel } = require("../models");

router.post("/", validateJWT, async (req, res) => {
    const { title, description, from, to } = req.body.budget;
    const owner_id = req.params.owner_id;
    const { id } = req.user;

    const query = {
        where: {
            id: owner_id,
            owner_id: id,
        },
    };
const rescheduleApt = {
    title: title,
    description: description,
    from: from,
    to: to,
};
    try {
        const budget = await BudgetModel.create(rescheduleApt);
        res.status(201).json({
            message: "Budget created successfully",
            budget: budget,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to create budget",
        });
    }
});

module.exports = router;