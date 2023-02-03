import request from 'supertest';
import { app, HTTP_STATUSES } from '../index';
import { Product, ProductModel } from '../types/db.types';

describe('/videos', () => {
    const testInvalidRow = { name: 'Apple', description: 'This is Apple' };
    const testValidRow: Product = { title: 'Orange', description: 'This is Orange' };
    const testValidUpdateRow: Product = { title: 'Orange1', description: 'This is Orange1' };
    let createdRow: ProductModel;
    const url = '/hometask_01/api/videos'

    beforeAll(async () => {
        await request(app)
            .delete('/ht_01/api/testing/all-data/')
    });

    it('should delete all rows', async () => {
        await request(app)
            .delete('/ht_01/api/testing/all-data/')

        await request(app)
            .get(url)
            .expect(HTTP_STATUSES.OK_200, [])
    });


    it('should return 200 and empty array', async () => {
        await request(app)
            .get(url)
            .expect(HTTP_STATUSES.OK_200, [])
    });
});