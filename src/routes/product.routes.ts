import { Router, Request, Response } from 'express';
import DB from '../customDB/';
const router = Router();

router.get('/', (req: Request, res: Response) => res.send(DB.getRows('products')));
router.get('/:id/', (req: Request, res: Response) => {
    try {
        const row = DB.getRow('products', req.params.id);
        res.json(row);
    } catch (e: any) {
        if (e.message === 'Not found') res.status(404).send('Not found');
        res.status(500);
    }
});
router.post('/', (req: Request, res: Response) => {
    const { title, description } = req.body;
    const payload = { title, description };
    res.json(DB.createRow('products', payload));
});
router.put('/:id/', (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const row = DB.updateRow('products', req.params.id, { title, description })
        res.json(row);
    } catch (e: any) {
        if (e.message === 'Not found') res.status(404).send('Not found');
        res.status(500);
    }
});
router.delete('/:id/', (req: Request, res: Response) => {
    try {
        const el = DB.deleteRow('products', req.params.id)
        res.status(204).json('OK');
    } catch (e: any) {
        if (e.message === 'Not found') res.status(404).send('Not found');
        res.status(500);
    }
});
router.delete('/', (req: Request, res: Response) => {
    DB.deleteAllRows('products');
    res.status(204).json();
});

export default router;