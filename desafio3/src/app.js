const ProductManager = require('./ProductManager.js');
const express = require('express');
const manager = new ProductManager('./src/Products.json');

const server = express();
const PORT = 8080;
server.use(express.urlencoded({ extended: true }));

server.get('/products', async(req, res)=>{
    try {
        const productsArray = await manager.readFile();
        let limit = parseInt(req.query.limit)
        if(limit){
            const arraylimit = productsArray.slice(0, limit)
            return res.send(arraylimit)
        }else{
            return res.send(productsArray)
        }
    } catch (error) {
        console.log(error)
        return res.send('Error al procesar el pedido')
    }
})

server.get('/products/:id', async(req, res) =>{
    try {
        let id = parseInt(req.params.id)
        const sought = await manager.getProductById(id)
        if(id){
            return res.send(sought);
        }else{
            console.log('Producto no encontrado');
        }
    } catch (error) {
        console.log(error)
        return res.send('Error al procesar el pedido de buscar x ID')
    }
})