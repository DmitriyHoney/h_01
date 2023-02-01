import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import DB from './customDB/';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/v1/products/', (req: Request, res: Response) => res.send(DB.getRows('products')));
app.get('/api/v1/products/:id/', (req: Request, res: Response) => {
    try {
        const row = DB.getRow('products', req.params.id);
        res.json(row);
    } catch (e: any) {
        if (e.message === 'Not found') res.status(404).send('Not found');
        res.status(500);
    }
});
app.post('/api/v1/products/', (req: Request, res: Response) => {
    const { title, description } = req.body;
    const payload = { title, description };
    res.json(DB.createRow('products', payload));
});
app.put('/api/v1/products/:id/', (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
        const row = DB.updateRow('products', req.params.id, { title, description })
        res.json(row);
    } catch (e: any) {
        if (e.message === 'Not found') res.status(404).send('Not found');
        res.status(500);
    }
});
app.delete('/api/v1/products/:id/', (req: Request, res: Response) => {
    try {
        const el = DB.deleteRow('products', req.params.id)
        res.status(204).json('OK');
    } catch (e: any) {
        if (e.message === 'Not found') res.status(404).send('Not found');
        res.status(500);
    }
});
app.delete('/api/v1/products/', (req: Request, res: Response) => {
    DB.deleteAllRows('products');
    res.status(204).json();
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))