const ProductManager = require('./ProductManager');

const manager = new ProductManager();

console.log(manager.getProducts());

manager.addProduct('producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manager.getProducts());

manager.addProduct('producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

console.log(manager.getProductById(1));