import express from 'express';
import bodyParser from 'body-parser';
import productsRoute from './routes/product.routes';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/products', productsRoute);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))