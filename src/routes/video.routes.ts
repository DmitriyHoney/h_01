import { Router } from 'express';
import videoController from '../controllers/video.controller';
const router = Router();

router.get('/', videoController.getAll);
router.get('/:id/', videoController.getOne);
router.post('/', videoController.create);
router.put('/:id/', videoController.update);
router.delete('/:id/', videoController.deleteOne);
router.delete('/', videoController.deleteAll);

export default router;