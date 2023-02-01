"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const customDB_1 = __importDefault(require("./customDB/"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/api/v1/products/', (req, res) => res.send(customDB_1.default.getRows('products')));
app.get('/api/v1/products/:id/', (req, res) => {
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
app.post('/api/v1/products/', (req, res) => {
    const { title, description } = req.body;
    const payload = { title, description };
    res.json(customDB_1.default.createRow('products', payload));
});
app.put('/api/v1/products/:id/', (req, res) => {
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
app.delete('/api/v1/products/:id/', (req, res) => {
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
app.delete('/api/v1/products/', (req, res) => {
    customDB_1.default.deleteAllRows('products');
    res.status(204).json();
});
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
