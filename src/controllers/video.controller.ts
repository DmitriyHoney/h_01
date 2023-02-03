import { Router, Request, Response } from 'express';
import DB from '../customDB/';
import { Product } from '../types/db.types';
import { isPayloadValid } from '../validations/videos.validation';
import { HTTP_STATUSES } from '..';

export default {
    getAll: (req: Request, res: Response) => res.send(DB.getRows('videos')),
    getOne: (req: Request, res: Response) => {
        try {
            const row = DB.getRow('videos', req.params.id);
            res.json(row);
        } catch (e: any) {
            if (e.message === 'Not found') res.status(404).send('Not found');
            res.status(500);
        }
    },
    create: (req: Request, res: Response) => {
        const product: Product = req.body;
        const isValid = isPayloadValid(req.body);
        res.status(HTTP_STATUSES.CREATED_201).json(DB.createRow('videos', product)) 
        // isValid 
        //     ? res.status(HTTP_STATUSES.CREATED_201).json(DB.createRow('videos', product)) 
        //     : res.status(HTTP_STATUSES.BAD_REQUEST_400);
    },
    update: (req: Request, res: Response) => {
        const { title, description }: Product = req.body;
        try {
            const row = DB.updateRow('videos', req.params.id, { title, description })
            res.json(row);
        } catch (e: any) {
            if (e.message === 'Not found') res.status(404).send('Not found');
            res.status(500);
        }
    },
    deleteOne: (req: Request, res: Response) => {
        try {
            const el = DB.deleteRow('videos', req.params.id)
            res.status(204).json('OK');
        } catch (e: any) {
            if (e.message === 'Not found') res.status(404).send('Not found');
            res.status(500);
        }
    },
    deleteAll: (req: Request, res: Response) => {
        DB.deleteAllRows('videos');
        res.status(204).json();
    }
};