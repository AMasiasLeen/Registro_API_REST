const express = require("express");
const router = express.Router();
const MachineryController = require("../controllers/Machinery");

router.get("/", async (req, res) => {
    try {
        const machines = await MachineryController.GetMachines();
        res.send(machines);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const machine = await MachineryController.GetMachineById(req.params.id);
        if (!machine) return res.status(404).send('Machine not found');
        res.send(machine);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newMachine = await MachineryController.CreateMachine(req.body);
        res.status(201).send('newMachine');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedMachine = await MachineryController.UpdateMachine(req.params.id, req.body);
        res.send(updatedMachine);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await MachineryController.DeleteMachine(req.params.id);
        res.send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;