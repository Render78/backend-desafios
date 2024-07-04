import { Router } from "express";
import { getProducts, getProductById, saveProduct } from '../controllers/product.controller.js'

const router = Router()

router.get('/', getProducts)
router.get('/:uid', getProductById)
router.post('/', saveProduct)


export default router