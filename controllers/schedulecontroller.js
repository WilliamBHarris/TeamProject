const express = require("express");
const router = express.Router();
let validateJWT = require("../middleware/validate-JWT");
const { ScheduleModel } = require("../models");

router.post("/", validateJWT, async (req, res) => {

  const { title, description, from, to } =
    req.body.schedule;
  const { id } = req.user;
  const scheduleEntry = {
    title,
    description,
    from,
    to,
    owner_id: id,
  };
  try {
    const newSchedule = await ScheduleModel.create(scheduleEntry);
    res.status(200).json(newSchedule);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update/:id", validateJWT, async (req, res) => {
  const { title, description, from, to } = req.body.schedule
  const owner_id = req.params.id;
  const { id } = req.user;

  const query = {
    where: {
      id: owner_id,
      owner: id
    }
  }
  console.log(req.body.schedule);
  const rescheduledApt = {
    title: title,
    description: description,
    from: from,
    to: to
  }

  try {
    const update = await ScheduleModel.update(rescheduledApt, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

module.exports = router;