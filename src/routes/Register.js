const express = require("express");
const router = express.Router();
const RegisterController = require("../controllers/Register");

router.get("/", async (req, res) => {
    try {
        const registers = await RegisterController.GetRegisters();
        res.send(registers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const register = await RegisterController.GetRegisterById(req.params.id);
        if (!register) return res.status(404).send('Register not found');
        res.send(register);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newRegister = await RegisterController.CreateRegister(req.body);
        res.status(201).send(newRegister);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedRegister = await RegisterController.UpdateRegister(req.params.id, req.body);
        res.send(updatedRegister);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await RegisterController.DeleteRegister(req.params.id);
        res.send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
