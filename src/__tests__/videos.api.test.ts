import request from 'supertest';
import { app, HTTP_STATUSES } from '../index';
import { AvailableResolutionType, Video, VideoModel } from '../types/db.types';

describe('/videos', () => {
    const testInvalidRow = { name: 'Apple', description: 'This is Apple' };
    const testValidRow: Video = { 
        author: 'Pavel',
        publicationDate: new Date().toISOString(),
        availableResolutions: [AvailableResolutionType.P144, AvailableResolutionType.P720],
        canBeDownloaded: true,
        minAgeRestriction: null,
        title: 'How create telegram',
    };
    // const testValidUpdateRow: Video = {  };
    let createdRow: VideoModel;
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

    it('should create video', async () => {
        const createdRow = await request(app)
            .post(url)
            .send(testValidRow)
            .expect(HTTP_STATUSES.CREATED_201)
        
        expect(createdRow.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(String),
            ...testValidRow
        });
    });
});