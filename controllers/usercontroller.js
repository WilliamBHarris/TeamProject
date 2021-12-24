const express = require('express');
const router = require('express').Router();
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { UserModel } = require('../models');
// const { validatejwt } = require('../middleware');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    let { email, password } = req.body.user;
    try {
        const User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
    
        res.status(201).json({
            message: "Register successfully",
            user: User,
            sessionToken: token,
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "User Email already exists",
            });
        } else {
            res.status(500).json({
                message: "Register failed",
            });
        }
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;
    
    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison){
    
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: loginUser,
                    message: "Logged In Successfully!",
                    sessionToken: token,
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password",
                });
            }
        } else {
            res.status(404).json({
                message: "User Info not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to login user",
        });
    }
});
    
    // UserModel.create({
    //     email: "user@email.com",
    //     password: "password",
    // })

module.exports = router;