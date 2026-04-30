import express from 'express';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken";
import supertest from 'supertest';
import { OrderStore } from "../order";
import { ProductStore } from "../product";
import { UserStore } from "../user";
import productsRoutes from "../../handlers/products";
import ordersRoutes from "../../handlers/orders";
import usersRoutes from "../../handlers/users";

const app: express.Application = express()

app.use(bodyParser.json())

// Enables Use of Express Routes in "handlers" Folder
productsRoutes(app)
ordersRoutes(app)
usersRoutes(app)

const request = supertest(app)
const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()

// Allows All Tests Access to "token"
let token: string
let productId: any
let orderId: number
let userId: any

// MUST USE "types": ["jasmine", "node"] in "tsconfig.json" File
// DEFINES "describe", "it" & "expect" ("jest" & "mocha" do NOT Work)
describe("Order Handler", () => {
    // Clears "products", "orders", and "users" Databases BEFORE Tests to Prevent Errors
    beforeAll(async () => {
        expect(orderStore.resetDatabase).toBeDefined();
        await orderStore.resetDatabase();

        expect(userStore.resetDatabase).toBeDefined();
        await userStore.resetDatabase();

        expect(productStore.resetDatabase).toBeDefined();
        await productStore.resetDatabase();

        // MUST CREATE NEW USER to Obtain "token" & "userId" to PREVENT Test Failure
        const userResponse = await request.post("/users").query({
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
        });

        // DEFINES "userId" for "order" Tests to PREVENT Test Failures
        userId = userResponse.body.newUser.id;

        // Creates "token" for "order" Tests to PREVENT Test Failures
        token = jwt.sign( { user: { id: userId } }, process.env.TOKEN_SECRET as string);

        // MUST CREATE NEW PRODUCT to Obtain "productId" to PREVENT Test Failure
        const productResponse = await request
            .post("/products")
            .set("Authorization", `Bearer ${token}`)
            .query({
                name: "apples",
                price: 5,
                category: "food"
            });

        // Creates "productId" for "order" Tests to PREVENT Test Failures
        productId = productResponse.body.id;
    });

    it('POST Request that runs create method should create a order', async () => {
        const response = await request
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .query({
                userId: userId,
                orderStatus: 'active'
            });

        // DEFINES "orderId" for "order" Tests to PREVENT Test Failures
        orderId = response.body.id;

        // Tests if "create" Handler Method Created Order
        expect(response.status).toBe(200);
        expect(response.body.orderStatus).toEqual("active");
    });

    // Checks for Specific Array Result from Running Index Method
    it('GET Request that runs index method should return and display a list of all orders', async () => {
        const response = await request.get("/orders");

        // Tests if "index" Handler Method Displayed All Orders
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET Request that runs show method should return and display the chosen order', async () => {
        const response = await request
            .get(`/orders/${orderId}`)
            .set("Authorization", `Bearer ${token}`);

        // Tests if "show" Handler Method Showed Chosen Order
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(orderId);
    });

    it('DELETE Request that runs delete method should remove the chosen order', async () => {
        const response = await request
            .delete(`/orders/${orderId}`)
            .set("Authorization", `Bearer ${token}`);

        // Tests if "delete" Handler Method Deleted Chosen Order
        expect(response.status).toBe(200);

        const orders = await request.get("/orders");
        expect(orders.body.length).toEqual(0);
    });
});
