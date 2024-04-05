const fs = require('fs');

class ProductManager {

    constructor(filePath) {
        this.products = [];
        this.path = filePath;
    }

    addProduct(productData) {
        const { title, description, price, thumbnail, code, stock } = productData;

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
        try {
            const data = fs.readFileSync(this.path, 'utf8');

            const products = JSON.parse(data);

            return products;
        } catch (error) {

            console.error('Error al leer el archivo de productos: ', error.message);
            return [];
        }
    }

    getProductById(id) {
        try {

            const data = fs.readFileSync(this.path, 'utf8');

            const products = JSON.parse(data);

            const productFound = products.find(p => p.id === id);

            if (productFound != null) {
                return productFound;
            } else {
                throw new Error("No se encontró un producto con ese ID");
            }
        } catch (error) {

            throw new Error('Error al buscar el producto:', error.message);
        }
    }

    updateProduct(id, fieldToUpdate, updatedValue) {
        try {
            const data = fs.readFileSync(this.path, 'utf8');

            let products = JSON.parse(data);

            const index = products.findIndex(p => p.id === id);

            if (index === -1) {
                throw new Error("No se encontró un producto con ese ID");
            }

            products[index][fieldToUpdate] = updatedValue;

            fs.writeFileSync(this.path, JSON.stringify(products), 'utf8');

            return products[index];
        } catch (error) {
            throw new Error('Error al actualizar el producto:', error.message);
        }
    }

    deleteProduct(id) {
        try {
            const data = fs.readFileSync(this.path, 'utf8');

            let products = JSON.parse(data);

            const index = products.findIndex(p => p.id === id);

            if (index === -1) {
                throw new Error("No se encontró un producto con ese ID");
            }

            products.splice(index, 1);

            fs.writeFileSync(this.path, JSON.stringify(products), 'utf8');

            return true;
        } catch (error) {
            throw new Error('Error al eliminar el producto:', error.message);
        }
    }
}

module.exports = ProductManager;