import { Router } from 'express';
import productController from '../controllers/product.controller';
const router = Router();

router.get('/', productController.getAll);
router.get('/:id/', productController.getOne);
router.post('/', productController.create);
router.put('/:id/', productController.update);
router.delete('/:id/', productController.deleteOne);
router.delete('/', productController.deleteAll);
router.delete('/__test__/data/', productController.deleteAll);

export default router;