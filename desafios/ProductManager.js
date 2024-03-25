class ProductManager {

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios');
        }

        const validateProduct = this.products.find(p => p.code === code);
        if (validateProduct) {
            throw new Error('El código del producto ya existe');
        }

        const product = {
            id: this.product.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        return product;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const productFound = this.products.find(p => p.id === id);
        if (productFound != null) {
            return productFound;
        } else {
            throw new Error("Not found");
        }
    }
}