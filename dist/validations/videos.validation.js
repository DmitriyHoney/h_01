"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPayloadValid = void 0;
const db_types_1 = require("../types/db.types");
const videoSchema = {
    title: { type: 'string', required: true },
    author: { type: 'string', required: true },
    canBeDownloaded: { type: 'boolean', required: false, default: false },
    availableResolutions: { type: 'enum', required: false, condition: Object.values(db_types_1.AvailableResolutionType), default: null },
    minAgeRestriction: { type: 'number', required: false, default: null, condition: [1, 18] },
    publicationDate: { type: 'date', required: false, default: '-:-:+1', dep: 'createdAt' },
};
const isPayloadValid = (payload, schema) => {
    const errors = [];
    const result = {};
    const addError = (field, message) => errors.push({ field, message });
    const checkRequired = (payload) => {
        Object.entries(schema).forEach(([key, value]) => {
            const { required } = value;
            // @ts-ignore
            required && !payload[key] ? addError(key, `The ${key} field is required`) : null;
        });
    };
    const checkSimpleType = (key, value) => {
        // @ts-ignore
        const { type } = schema[key];
        const isHardType = ['date'].includes(type);
        if (isHardType)
            return;
        type !== typeof value || (type === 'enum' && !Array.isArray(value))
            ? addError(key, `The ${key} field type should be a ${type}`)
            : null;
    };
    const checkHardType = (key, value) => {
        // @ts-ignore
        const { type } = schema[key];
        if (type !== 'date')
            return;
        typeof value !== 'string' || isNaN(Date.parse(value))
            ? addError(key, `The ${key} field type should be a date`)
            : null;
    };
    const checkConditions = (key, value) => {
        // @ts-ignore
        const { type, condition } = schema[key];
        const valueField = value;
        if (!condition)
            return;
        if (type === 'number') {
            const [from, to] = condition;
            const notInRange = !(valueField >= from && valueField <= to);
            notInRange
                ? addError(key, `The ${key} field not in range ${from}-${to}, now ${valueField}`)
                : null;
        }
        else if (type === 'enum') {
            for (let i = 0; i < valueField.length; i++) {
                const v = valueField[i];
                if (!condition.includes(v)) {
                    addError(key, `The ${key} field not in range enum`);
                    break;
                }
            }
        }
    };
    checkRequired(payload);
    Object.entries(payload).forEach(([key, value]) => {
        checkSimpleType(key, value);
        checkHardType(key, value);
        checkConditions(key, value);
    });
    return { errors, result };
};
exports.isPayloadValid = isPayloadValid;
