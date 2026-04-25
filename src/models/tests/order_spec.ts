import { Order, OrderStore } from "../order";
import { Product, ProductStore } from "../product";
import { User, UserStore } from "../user";

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

    // TEMP: should I include "update" Method?

    it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        userStore.create({
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
        });

        productStore.create({
            name: "apples",
            price: 5,
            category: "food"
        });

        await orderStore.create({
            quantity: 1,
            orderStatus: 'active'
        });
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of orders', async () => {
        await orderStore.index();
    });

    it('show method should return the correct order', async () => {
        await orderStore.show("1");
    });

    it('delete method should remove the order', async () => {
        await orderStore.delete("1");
        const result = await orderStore.index()

        expect(result).toEqual([]);
    });
});
