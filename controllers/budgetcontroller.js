const express = require("express");
const router = express.Router();
let validateJWT = require("../middleware/validate-jwt");
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


  import react from 'react';
import {useEffect} from 'react';



/* Get all user appointments by id*/
//we will need this sooner or later so built it
const getUserAppointments = () => {
    fetch('http://localhost:3000/appointments', {
        method: 'GET',
        headers: new Headers ({
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
    fetch (`http://localhost:3000/appointments/cancel/{appointment.id`, { 
        method: 'DELETE',
        headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }),
    }).then(() => getUserAppointments());
    
}

useEffect(async () => {

})
  module.exports = router;