import mongoose from 'mongoose';
import Product from '../src/dao/classes/product.dao.js';
import Assert from 'assert';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker'

const assert = Assert.strict;

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

describe("Testing de productos", () => {

    before(function () {
        this.productsDao = new Product();
    })

    it("Deberia retornar productos desde la DB", async function () {
        this.timeout(5000);
        try {
            const result = await this.productsDao.getProducts();
            assert.strictEqual(Array.isArray(result) && result.length > 0, true);
        } catch (error) {
            console.error("Error durante el test", error);
            assert.fail("Test fallido con errores");
        }
    })

    it("El dao debe obtener un producto por ID", async function () {

        try {
            const pid = "6653c61b79eab765e692a3ff";
            const product = await this.productsDao.getProductById(pid);
            assert.strictEqual(typeof product, 'object');
            assert.strictEqual(product._id.toString(), pid);
        } catch (error) {
            console.error("Error durante el test", error);
            assert.fail("Test fallido con errores");
        }

    })

    it("El dao debe agregar un producto correctamente a la DB", async function () {
        let product = {
            title: "example title",
            description: "example description",
            category: "example category",
            price: 50,
            thumbnail: "example URL",
            code: "EXCD",
            stock: 5,
            status: true,
            owner: "admin"
        };

        let result = await this.productsDao.saveProduct(product);
        assert.ok(result._id);
    })
})