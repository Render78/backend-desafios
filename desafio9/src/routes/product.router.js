import { Router } from 'express';
import {
    listProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';
import { isAdmin } from '../middleware/auth.js';
import generateMockProducts from '../mocks/products.mock.js';

const router = Router();

router.get('/mockingproducts', (req, res) => {
    const mockProducts = generateMockProducts(100)
    res.json(mockProducts);
})
router.get('/', listProducts);
router.get('/:pid', getProductById);
router.post('/', isAdmin, addProduct);
router.put('/:pid', isAdmin, updateProduct);
router.delete('/:pid', isAdmin, deleteProduct);


export default router;
