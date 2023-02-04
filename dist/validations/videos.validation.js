"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVideoPayloadValid = void 0;
const db_types_1 = require("../types/db.types");
const core_1 = require("./core");
const videoSchema = {
    createdAt: { type: 'date', required: false, default: '_:_:_T_:_:_' },
    title: { type: 'string', required: true },
    author: { type: 'string', required: true },
    canBeDownloaded: { type: 'boolean', required: false, default: false },
    availableResolutions: { type: 'enum', required: false, condition: Object.values(db_types_1.AvailableResolutionType), default: null },
    minAgeRestriction: { type: 'number', required: false, default: null, condition: [1, 18] },
    publicationDate: { type: 'date', required: false, default: '_:_:1T_:_:_', dep: 'createdAt' },
};
const isVideoPayloadValid = (payload) => (0, core_1.isPayloadValid)(payload, videoSchema);
exports.isVideoPayloadValid = isVideoPayloadValid;
