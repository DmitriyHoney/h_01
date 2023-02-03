"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customDB_1 = __importDefault(require("../customDB/"));
const videos_validation_1 = require("../validations/videos.validation");
const __1 = require("..");
exports.default = {
    getAll: (req, res) => res.send(customDB_1.default.getRows('videos')),
    getOne: (req, res) => {
        try {
            const row = customDB_1.default.getRow('videos', req.params.id);
            res.json(row);
        }
        catch (e) {
            if (e.message === 'Not found')
                res.status(404).send('Not found');
            res.status(500);
        }
    },
    create: (req, res) => {
        const product = req.body;
        const isValid = (0, videos_validation_1.isPayloadValid)(req.body);
        res.status(__1.HTTP_STATUSES.CREATED_201).json(customDB_1.default.createRow('videos', product));
        // isValid 
        //     ? res.status(HTTP_STATUSES.CREATED_201).json(DB.createRow('videos', product)) 
        //     : res.status(HTTP_STATUSES.BAD_REQUEST_400);
    },
    update: (req, res) => {
        const { title, description } = req.body;
        try {
            const row = customDB_1.default.updateRow('videos', req.params.id, { title, description });
            res.json(row);
        }
        catch (e) {
            if (e.message === 'Not found')
                res.status(404).send('Not found');
            res.status(500);
        }
    },
    deleteOne: (req, res) => {
        try {
            const el = customDB_1.default.deleteRow('videos', req.params.id);
            res.status(204).json('OK');
        }
        catch (e) {
            if (e.message === 'Not found')
                res.status(404).send('Not found');
            res.status(500);
        }
    },
    deleteAll: (req, res) => {
        customDB_1.default.deleteAllRows('videos');
        res.status(204).json();
    }
};
