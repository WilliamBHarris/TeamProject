const express = require("express");
const router = express.Router();
let validateJWT = require("../middleware/validateJWT");
const { BudgetModel } = require("../models");


router.post("/", validate-JWT, async (req, res) => {

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

router.put("/edit/:id", validate-JWT, async (req, res) => {
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


/* Get all user appointments by id*/
//we will need this sooner or later so built it
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

useEffect(async () => {

})
module.exports = router;

