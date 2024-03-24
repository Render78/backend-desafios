class ProductManager {

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Verificar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Verificar que el campo code no se repita
        const validateProduct = this.products.find(product => product.code === code);
        if (validateProduct) {
            throw new Error('El código del producto ya existe');
        }

        const product = {
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
    

}