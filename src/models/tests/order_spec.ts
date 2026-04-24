import { Order, OrderStore } from "../order";

const store = new OrderStore()

// MUST USE "types": ["jasmine", "node"] in "tsconfig.json" File
// DEFINES "describe", "it" & "expect" ("jest" & "mocha" do NOT Work)
describe("Order Model", () => {
    // Clears "orders" Database BEFORE Tests to Prevent Errors
    beforeAll(async () => {
        expect(store.resetDatabase).toBeDefined();
        await store.resetDatabase();
    })

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

    it('create method should add an order', async () => {
        await store.create({
            productOrderId: 1,
            quantity: 1,
            userId: 1,
            orderStatus: 'active'
        });
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of orders', async () => {
        await store.index();
    });

    it('show method should return the correct order', async () => {
        await store.show("1");
    });

    it('delete method should remove the order', async () => {
        store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    });
});
