import express from 'express';
import { home } from '../controllers/productsController.js';
import { getProductById } from '../controllers/productsController.js';

const router = express.Router()

router.get('/', home)
router.get('/product/:pid', getProductById)

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {})
})

export default router
