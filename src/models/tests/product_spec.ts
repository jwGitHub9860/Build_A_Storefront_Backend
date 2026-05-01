import express from 'express';
import bodyParser from 'body-parser';
import { ProductStore } from "../product";
import productsRoutes from "../../handlers/products";

const app: express.Application = express()

app.use(bodyParser.json())

// Enables Use of Express Routes in "handlers" Folder
productsRoutes(app)

const store = new ProductStore()

// MUST USE "types": ["jasmine", "node"] in "tsconfig.json" File
// DEFINES "describe", "it" & "expect" ("jest" & "mocha" do NOT Work)
describe("Product Model", () => {
    // Clears "products" Database BEFORE Tests to Prevent Errors
    beforeAll(async () => {
        expect(store.resetDatabase).toBeDefined();
        await store.resetDatabase();
    });

    // Checks that Method Exists
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            name: "apples",
            price: 5,
            category: "food"
        });

        // Tests if "create" Method Created Product
        expect(result).toBeDefined();
        expect(result.name).toEqual("apples");
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of products', async () => {
        const result = await store.index();

        // Tests if "index" Method Displayed All Products
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].name).toEqual("apples");
    });

    it('show method should return the correct product', async () => {
        const result = await store.show("1");

        // Tests if "show" Method Showed Chosen Product
        expect(result).toBeDefined();
        expect(result.name).toEqual("apples");
    });

    it('delete method should remove the product', async () => {
        const result = await store.delete("1");

        // Tests if "delete" Method Deleted Chosen Product
        expect(result).toBeDefined();

        const products = await store.index();
        expect(products.length).toEqual(0);
    })
});
