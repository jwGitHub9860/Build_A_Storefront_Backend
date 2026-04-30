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

// Allows All Tests Access to "token", "productId", "orderId", and "userId"
let token: string
let productId: any
let orderId: any
let userId: any

// MUST USE "types": ["jasmine", "node"] in "tsconfig.json" File
// DEFINES "describe", "it" & "expect" ("jest" & "mocha" do NOT Work)
describe("Order Model", () => {
    // Clears "products", "orders", and "users" Databases BEFORE Tests to Prevent Errors
    beforeAll(async () => {
        expect(orderStore.resetDatabase).toBeDefined();
        await orderStore.resetDatabase();

        expect(userStore.resetDatabase).toBeDefined();
        await userStore.resetDatabase();

        expect(productStore.resetDatabase).toBeDefined();
        await productStore.resetDatabase();
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

        // Checks if New User has ID
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();

        const result = await orderStore.create({
            userId: user.id,
            orderStatus: 'active'
        });

        // Tests if "create" Method Created Order
        expect(result?.id).toBeDefined();
        expect(result?.orderStatus).toEqual("active");

        // DEFINES "orderId" for "order" Tests to PREVENT Test Failures
        orderId = result?.id;
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of orders', async () => {
        const result = await orderStore.index();

        // Tests if "index" Method Displayed All Orders
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].orderStatus).toEqual('active');
    });

    it('show method should return the correct order', async () => {
        const result = await orderStore.show(orderId.toString());

        // Tests if "show" Method Showed Chosen Order
        expect(result).toBeDefined();
        expect(result.orderStatus).toEqual('active');
    });

    it('delete method should remove the order', async () => {
        const result = await orderStore.delete(orderId.toString());

        // Tests if "delete" Method Deleted Chosen Order
        expect(result).toBeDefined();

        const orders = await orderStore.index();
        expect(orders.length).toEqual(0);
    });
});
