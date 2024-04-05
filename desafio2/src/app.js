const ProductManager = require('./ProductManager');

const filePath = "./products.json";

const manager = new ProductManager(filePath);

console.log(manager.getProducts());