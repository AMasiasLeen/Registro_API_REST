const express = require("express");
const router = express.Router();
const OperatorController = require("../controllers/Operator");

router.get("/", async (req, res) => {
    try {
        const operators = await OperatorController.GetOperators();
        res.send(operators);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const operator = await OperatorController.GetOperatorById(req.params.id);
        if (!operator) return res.status(404).send('Operator not found');
        res.send(operator);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newOperator = await OperatorController.CreateOperator(req.body);
        res.status(201).send(newOperator);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedOperator = await OperatorController.UpdateOperator(req.params.id, req.body);
        res.send(updatedOperator);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const response = await OperatorController.DeleteOperator(req.params.id);
        res.send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
