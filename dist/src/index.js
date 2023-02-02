"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const PORT = 3000;
exports.app = (0, express_1.default)();
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use('/api/v1/products', product_routes_1.default);
exports.app.get('/', (req, res) => res.send('Hello, world!'));
exports.app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
