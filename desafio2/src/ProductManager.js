const fs = require('fs').promises;

class ProductManager {

    constructor(filePath) {
        this.products = [];
        this.path = filePath;
    }

    async saveProduct(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))
        } catch (error) {
            console.log('Error al guardar el archivo: ', error)
        }
    }

    async addProduct(newProduct) {
        const { title, description, price, thumbnail, code, stock } = newProduct;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Complete todos los campos.');
        }

        const validateProduct = this.products.find(p => p.code === code);
        if (validateProduct) {
            console.log('El código del producto ya existe, no se puede repetir el mismo.');
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

        await this.saveProduct(this.products);

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