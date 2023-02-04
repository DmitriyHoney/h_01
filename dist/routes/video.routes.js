"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_controller_1 = __importDefault(require("../controllers/video.controller"));
const router = (0, express_1.Router)();
router.get('/', video_controller_1.default.getAll);
router.get('/:id/', video_controller_1.default.getOne);
router.post('/', video_controller_1.default.create);
router.put('/:id/', video_controller_1.default.update);
router.delete('/:id/', video_controller_1.default.deleteOne);
exports.default = router;
