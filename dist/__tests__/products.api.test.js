"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
describe('/products', () => {
    const testInvalidRow = { name: 'Apple', description: 'This is Apple' };
    const testValidRow = { title: 'Orange', description: 'This is Orange' };
    const testValidUpdateRow = { title: 'Orange1', description: 'This is Orange1' };
    let createdRow;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .delete('/api/v1/products/__test__/data/');
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .get('/api/v1/products/')
            .expect(index_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 404 for not found product', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .get('/api/v1/products/1/')
            .expect(index_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('shouldn`t create product with incorrect input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .post('/api/v1/products/')
            .send(testInvalidRow)
            .expect(index_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(index_1.app)
            .get('/api/v1/products/')
            .expect(index_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should create product with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .post('/api/v1/products/')
            .send(testValidRow)
            .expect(index_1.HTTP_STATUSES.CREATED_201);
        createdRow = result.body;
        expect(result.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(String),
            title: testValidRow.title,
            description: testValidRow.description,
        });
        yield (0, supertest_1.default)(index_1.app)
            .get('/api/v1/products/')
            .expect(index_1.HTTP_STATUSES.OK_200, [createdRow]);
    }));
    it('should get product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .get(`/api/v1/products/${createdRow.id}/`)
            .expect(index_1.HTTP_STATUSES.OK_200, createdRow);
        expect(result.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(String),
            title: testValidRow.title,
            description: testValidRow.description,
        });
    }));
    it('should put product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .put(`/api/v1/products/${createdRow.id}/`)
            .send(testValidUpdateRow)
            .expect(index_1.HTTP_STATUSES.OK_200);
        expect(result.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(String),
            title: testValidUpdateRow.title,
            description: testValidUpdateRow.description,
        });
    }));
    it('should delete product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(index_1.app)
            .delete(`/api/v1/products/${createdRow.id}/`)
            .send(createdRow)
            .expect(index_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(index_1.app)
            .get(`/api/v1/products/${createdRow.id}/`)
            .expect(index_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(index_1.app)
            .get('/api/v1/products/')
            .expect(index_1.HTTP_STATUSES.OK_200, []);
    }));
});
