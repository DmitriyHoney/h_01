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
        try {
            const { errors, result } = (0, videos_validation_1.isVideoPayloadValid)(Object.assign({ createdAt: new Date().toISOString() }, req.body));
            errors.errorsMessages.length
                ? res.status(__1.HTTP_STATUSES.BAD_REQUEST_400).json(errors)
                : res.status(__1.HTTP_STATUSES.CREATED_201).json(customDB_1.default.createRow('videos', result));
        }
        catch (_a) {
            res.status(__1.HTTP_STATUSES.SERVER_ERROR_500).json('Internal server error');
        }
    },
    update: (req, res) => {
        try {
            const { errors, result } = (0, videos_validation_1.isVideoPayloadValid)(Object.assign({ createdAt: new Date().toISOString() }, req.body));
            if (errors.errorsMessages.length) {
                res.status(__1.HTTP_STATUSES.BAD_REQUEST_400).json(errors);
                return;
            }
            //@ts-ignore
            delete result.createdAt;
            try {
                customDB_1.default.updateRow('videos', req.params.id, result);
                res.status(__1.HTTP_STATUSES.NO_CONTENT_204);
            }
            catch (e) {
                console.log(e);
                res.status(__1.HTTP_STATUSES.NOT_FOUND_404).json('Not found');
            }
        }
        catch (_a) {
            res.status(__1.HTTP_STATUSES.SERVER_ERROR_500).json('Internal server error');
        }
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
            customDB_1.default.deleteRow('videos', req.params.id);
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
