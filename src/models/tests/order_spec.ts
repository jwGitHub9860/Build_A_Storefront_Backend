import { Order, OrderStatus } from "../order";

const store = new OrderStatus()

// MUST USE "jest" to DEFINE "describe", "it" & "expect" ("mocha" does NOT Work)
describe("Order Model", () => {
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
        const result = await store.create({
            id: 1,
            productOrderId: 1,
            quantity: 1,
            userId: 1,
            orderStatus: 'active'
        });
        expect(result).toEqual({
            id: 1,
            productOrderId: 1,
            quantity: 1,
            userId: 1,
            orderStatus: 'active'
        });
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            productOrderId: 1,
            quantity: 1,
            userId: 1,
            orderStatus: 'active'
        }]);
    });

    it('show method should return the correct order', async () => {
        const result = await store.show("1");
        expect(result).toEqual([{
            id: 1,
            productOrderId: 1,
            quantity: 1,
            userId: 1,
            orderStatus: 'active'
        }]);
    });

    it('delete method should remove the order', async () => {
        store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    });
});
