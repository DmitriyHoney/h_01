"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customDB_1 = __importDefault(require("../customDB/"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => res.send(customDB_1.default.getRows('products')));
router.get('/:id/', (req, res) => {
    try {
        const row = customDB_1.default.getRow('products', req.params.id);
        res.json(row);
    }
    catch (e) {
        if (e.message === 'Not found')
            res.status(404).send('Not found');
        res.status(500);
    }
});
router.post('/', (req, res) => {
    const { title, description } = req.body;
    const payload = { title, description };
    res.json(customDB_1.default.createRow('products', payload));
});
router.put('/:id/', (req, res) => {
    const { title, description } = req.body;
    try {
        const row = customDB_1.default.updateRow('products', req.params.id, { title, description });
        res.json(row);
    }
    catch (e) {
        if (e.message === 'Not found')
            res.status(404).send('Not found');
        res.status(500);
    }
});
router.delete('/:id/', (req, res) => {
    try {
        const el = customDB_1.default.deleteRow('products', req.params.id);
        res.status(204).json('OK');
    }
    catch (e) {
        if (e.message === 'Not found')
            res.status(404).send('Not found');
        res.status(500);
    }
});
router.delete('/', (req, res) => {
    customDB_1.default.deleteAllRows('products');
    res.status(204).json();
});
exports.default = router;
