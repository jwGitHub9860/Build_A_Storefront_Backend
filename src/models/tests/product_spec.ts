import express from 'express';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken";
import supertest from 'supertest';
import { ProductStore } from "../product";
import productsRoutes from "../../handlers/products";

const app: express.Application = express()

app.use(bodyParser.json())

// Enables Use of Express Routes in "handlers" Folder
productsRoutes(app)

const request = supertest(app)
const store = new ProductStore()

// Allows All Tests Access to "token"
let token: string

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

    // TEMP: should I include "update" Method?

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

// MUST USE "types": ["jasmine", "node"] in "tsconfig.json" File
// DEFINES "describe", "it" & "expect" ("jest" & "mocha" do NOT Work)
describe("Product Handler", () => {
    // Clears "products" Database BEFORE Tests to Prevent Errors
    beforeAll(async () => {
        expect(store.resetDatabase).toBeDefined();
        await store.resetDatabase();

        // MUST CREATE NEW USER to Obtain "token" to PREVENT Test Failure
        const createNewUser = await request.post("/users").query({
            firstName: "Dane",
            lastName: "Jerry",
            username: "userDane",
        });

        // Creates "token" for "product" Tests to PREVENT Test Failures
        token = jwt.sign({ user: { id: createNewUser.body.id } }, process.env.TOKEN_SECRET as string);
    });

    // Checks if "product" Database is EMPTY
    it('GET Request that should return empty database of products', async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('POST Request that runs create method should create a product and return a token', async () => {
        const response = await request
            .post("/products")
            .set("Authorization", `Bearer ${token}`)
            .query({
                name: "apples",
                price: 5,
                category: "food",
            });

        // Tests if "create" Handler Method Created Product
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("apples");
    });

    // Checks for Specific Array Result from Running Index Method
    it('GET Request that runs index method should return and display a list of all products', async () => {
        const response = await request.get("/products");

        // Tests if "index" Handler Method Displayed All Products
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET Request that runs show method should return and display the chosen product', async () => {
        const response = await request.get("/products/1");

        // Tests if "show" Handler Method Showed Chosen Product
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("apples");
    });

    it('DELETE Request that runs delete method should remove the chosen product', async () => {
        // Tests if "delete" Handler Method Deleted Chosen Product
        const response = await request
            .delete("/products/1")
            .set("Authorization", `Bearer ${token}`);
        
        // Verifies that Product was Deleted
        expect(response.status).toBe(200);

        const products = await request.get("/products");
        expect(products.body.length).toEqual(0);
    })
});