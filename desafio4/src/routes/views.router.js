import express from 'express';
import { home } from '../controllers/productsController.js';
import { getProductById } from '../controllers/productsController.js';
import { readProductsFromFile } from '../controllers/productsController.js';

const router = express.Router()

router.get('/', home)
router.get('/product/:pid', getProductById)

router.get('/realTimeProducts', (req, res) => {
    const products = readProductsFromFile();
    const script = {
        scripts: ["index.js"],
        data: products
    }
    res.render('realTimeProducts', script)
})

export default router
