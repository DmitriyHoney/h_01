import request from 'supertest';
import { app, HTTP_STATUSES } from '../index';
import { AvailableResolutionType, Video, VideoModel } from '../types/db.types';

describe('/videos', () => {
    const testInvalidRow = { title: 'How create telegram' };
    const testValidRow: Video = { 
        author: 'Pavel',
        title: 'How create telegram',
        publicationDate: new Date().toISOString(),
        availableResolutions: [AvailableResolutionType.P144, AvailableResolutionType.P720],
        canBeDownloaded: true,
        minAgeRestriction: null,
    };
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
        const created = await request(app)
            .post(url)
            .send(testValidRow)
            .expect(HTTP_STATUSES.CREATED_201)
        
        createdRow = created.body;
        
        expect(created.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(String),
            ...testValidRow
        });
    });

    it('shouldn`t create video (check validation)', async () => {
        const created = await request(app)
            .post(url)
            .send(testInvalidRow)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
        
        expect(created.body).toEqual([
            {
                field: "author",
                message: "The author field is required"
            }
        ]);
    });

    it('should get video by id', async () => {
        await request(app)
            .get(`${url}/${createdRow.id}`)
            .expect(HTTP_STATUSES.OK_200, createdRow)
    });

    it('shouldn`t get video by id - not Found', async () => {
        await request(app)
            .get(`${url}/12312`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it('should update video by id', async () => {
        await request(app)
            .put(`${url}/${createdRow.id}`)
            .send({ ...testValidRow, title: 'updated' })
            .expect(HTTP_STATUSES.NO_CONTENT_204)
    });

    it('shouldn`t update video by id', async () => {
        await request(app)
            .put(`${url}/123`)
            .send({ ...testValidRow, title: 'updated' })
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it('shouldn`t delete video by id', async () => {
        await request(app)
            .delete(`${url}/123`)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    });

    it('should delete video by id', async () => {
        await request(app)
            .delete(`${url}/${createdRow.id}`)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get(url)
            .expect(HTTP_STATUSES.OK_200, [])
    });
});