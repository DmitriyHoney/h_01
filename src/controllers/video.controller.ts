import { Router, Request, Response } from 'express';
import DB from '../customDB/';
import { Product } from '../types/db.types';
import { isVideoPayloadValid } from '../validations/videos.validation';
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
        try {
            const { errors, result } = isVideoPayloadValid({
                createdAt: new Date().toISOString(),
                ...req.body,
            });
            errors.errorsMessages.length
                ? res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors)
                : res.status(HTTP_STATUSES.CREATED_201).json(DB.createRow('videos', result)) 
        } catch (e) {
            console.log(e);
            res.status(HTTP_STATUSES.SERVER_ERROR_500).json('Internal server error') 
        }
        
    },
    update: (req: Request, res: Response) => {
        try {
            const { errors, result } = isVideoPayloadValid({
                createdAt: new Date().toISOString(),
                ...req.body,
            });
            if (errors.errorsMessages.length) {
                res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
                return;
            }
            //@ts-ignore
            delete result.createdAt;
            try {
                DB.updateRow('videos', req.params.id, result);
                res.status(HTTP_STATUSES.NO_CONTENT_204);
            } catch (e) {
                console.log(e);
                res.status(HTTP_STATUSES.NOT_FOUND_404).json('Not found');
            }
        } catch {
            res.status(HTTP_STATUSES.SERVER_ERROR_500).json('Internal server error') 
        }

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
            DB.deleteRow('videos', req.params.id)
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