const express = require("express");
const router = express.Router();
const OwnerController = require("../controllers/Owner");

router.get("/", async (req, res) => {
    try {
        const owners = await OwnerController.GetOwners();
        res.send(owners);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const owner = await OwnerController.GetOwnerById(req.params.id);
        if (!owner) return res.status(404).send('Owner not found');
        res.send(owner);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newOwner = await OwnerController.CreateOwner(req.body);
        res.status(201).send(newOwner);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedOwner = await OwnerController.UpdateOwner(req.params.id, req.body);
        res.send(updatedOwner);
    } catch (err) {
        res.status (500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await OwnerController.DeleteOwner(req.params.id);
        res.send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

