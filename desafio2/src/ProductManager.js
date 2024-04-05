const fs = require('fs');

class ProductManager {

    constructor(filePath) {
        this.products = [];
        this.path = filePath;
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
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);

        fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');

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
            throw new Error("No se encontró un producto por ese ID");
        }
    }

    deleteProduct(code) {
        const index = this.products.findIndex(p => p.code === code);
        if (index !== -1) {
            this.products.splice(index, 1);
        } else {
            throw new Error("No se pudo borrar el producto, ese codigo de producto no existe");
        }
    }
}