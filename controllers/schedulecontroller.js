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
  const { title, description, from, to } = req.body.schedule;
  const scheduleId = req.params.id;
  const { id } = req.user;
  const query = {
    where: {
      id: scheduleId,
      owner_id: id,
    },
  };
  const updatedSchedule = {
    title,
    description,
    from,
    to,
    owner_id: id,
  };
  try {
    const updatedScheduleEntry = await ScheduleModel.update(updatedSchedule, query);
    res.status(200).json(updatedScheduleEntry);
  } catch (err) {

    res.status(500).json({ error: err });
  }
});

const getUserAppointments = () => {
  fetch('http://localhost:3000/appointments', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }),
  }).then(res => res.json())
    .then(appointments => {
      console.log(appointments);
      this.setState({
        appointments: appointments
      })
    })
}
/* Appointment Delete */
const cancelAppointment = (appointment) => {
  console.log("Appointment cancelled");
  fetch(`http://localhost:3000/appointments/cancel/{appointment.id`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    }),
  }).then(() => getUserAppointments());

}

module.exports = router;