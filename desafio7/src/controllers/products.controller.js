import Product from '../dao/classes/product.dao.js'

const productService = new Product()

export const getProducts = async (req, res) => {
    let result = await productService.getProducts()
    res.send({ status: "success", result })
}

export const getProductById = async (req, res) => {
    const { pid } = req.params
    let product = await productService.getProductById(pid)
    res.send({ status: "success", result: product })
}