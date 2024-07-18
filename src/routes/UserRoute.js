require("dotenv").config()
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserController = require("../controllers/UserController");



router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let response = await UserController.CreateUser({name,email, password : hashedPassword})
    res.status(201).send(`Usuario ${name}} registrado Correctamente! ID: ${response.id}`);
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let pass = await UserController.FindUserByEmail({email, password})

    if (pass) {
        const token = jwt.sign({email}, process.env.JWT_TOKEN_SECRET,{expiresIn: '1h'})
        res.json({token})
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }

});

module.exports = router