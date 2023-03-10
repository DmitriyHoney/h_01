import express from 'express';
import bodyParser from 'body-parser';
import productsRoute from './routes/product.routes';
import videosRoute from './routes/video.routes';
import videoController from './controllers/video.controller';

const PORT = 3000;
export const app = express();

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
    SERVER_ERROR_500: 500,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Hello, world!'));
app.use('/api/v1/products', productsRoute);

app.delete('/hometask_01/api/testing/all-data/', videoController.deleteAll);
app.use('/hometask_01/api/videos', videosRoute);




app.listen(PORT, () => console.log(`http://localhost:${PORT}`))