const router = require('express').Router();
const { UserModel } = require('../models');
// const { validateJWT } = require('../middleware');

router.post("/register", async (req, res) => {
    
    UserModel.create({
        email: "user@email.com",
        password: "password",
    })
});

module.exports = router;