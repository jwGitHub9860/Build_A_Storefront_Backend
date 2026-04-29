import express from 'express';
import bodyParser from 'body-parser';
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

const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()

// MUST USE "types": ["jasmine", "node"] in "tsconfig.json" File
// DEFINES "describe", "it" & "expect" ("jest" & "mocha" do NOT Work)
describe("Order Model", () => {
    // Clears "orders" Database BEFORE Tests to Prevent Errors
    beforeAll(async () => {
        expect(orderStore.resetDatabase).toBeDefined();
        await orderStore.resetDatabase();
    })

    // Checks that Method Exists
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        const user = await userStore.create({
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
        });

        const product = await productStore.create({
            name: "apples",
            price: 5,
            category: "food"
        });

        const result = await orderStore.create({
            productOrderId: product.id,
            quantity: 1,
            userId: user.id,
            orderStatus: 'active'
        });

        // Tests if "create" Method Created Order
        expect(result).toBeDefined();
        expect(result?.quantity).toEqual(1);
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of orders', async () => {
        const result = await orderStore.index();

        // Tests if "index" Method Displayed All Orders
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].quantity).toEqual(1);
    });

    it('show method should return the correct order', async () => {
        const result = await orderStore.show("1");

        // Tests if "show" Method Showed Chosen Order
        expect(result).toBeDefined();
        expect(result.quantity).toEqual(1);
    });

    it('delete method should remove the order', async () => {
        const result = await orderStore.delete("1");

        // Tests if "delete" Method Deleted Chosen Order
        expect(result).toBeDefined();

        const orders = await orderStore.index();
        expect(orders.length).toEqual(0);
    });
});
