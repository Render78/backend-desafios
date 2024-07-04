import Product from '../dao/classes/product.dao.js'

const productService = new Product()

export const getProducts = async (req, res) => {
    let result = await productService.getProducts()
    res.send({ status: "success", result })
}

export const getProductById = async (req, res) => {
    const { uid } = req.params
    let product = await productService.getProductById(uid)
    res.send({ status: "success", result: product })
}

export const saveProduct = async (req, res) => {
    const product = req.body
    let result = await productService.saveProduct(product)
    res.send({ status: "success", result })
}