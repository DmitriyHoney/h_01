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
const db_types_1 = require("../types/db.types");
describe('/videos', () => {
    const testInvalidRow = { name: 'Apple', description: 'This is Apple' };
    const testValidRow = {
        author: 'Pavel',
        publicationDate: new Date().toISOString(),
        availableResolutions: [db_types_1.AvailableResolutionType.P144, db_types_1.AvailableResolutionType.P720],
        canBeDownloaded: true,
        minAgeRestriction: null,
        title: 'How create telegram',
    };
    // const testValidUpdateRow: Video = {  };
    let createdRow;
    const url = '/hometask_01/api/videos';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .delete('/ht_01/api/testing/all-data/');
    }));
    it('should delete all rows', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .delete('/ht_01/api/testing/all-data/');
        yield (0, supertest_1.default)(index_1.app)
            .get(url)
            .expect(index_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.app)
            .get(url)
            .expect(index_1.HTTP_STATUSES.OK_200, []);
    }));
    it('should create video', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdRow = yield (0, supertest_1.default)(index_1.app)
            .post(url)
            .send(testValidRow)
            .expect(index_1.HTTP_STATUSES.CREATED_201);
        expect(createdRow.body).toEqual(Object.assign({ id: expect.any(Number), createdAt: expect.any(String) }, testValidRow));
    }));
});
