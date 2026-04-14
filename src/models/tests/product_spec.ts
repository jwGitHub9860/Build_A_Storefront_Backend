import { Product, ProductStore } from "../product";

const store = new ProductStore()

// MUST USE "jest" to DEFINE "describe", "it" & "expect" ("mocha" does NOT Work)
describe("Product Model", () => {
    // Checks that Method Exists
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });

    // TEMP: should I include "update" Method?

    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            id: 1,
            name: "apples",
            price: 5,
            category: "food"
        })
        expect(result).toEqual({
            id: 1,
            name: "apples",
            price: 5,
            category: "food"
        });
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: "apples",
            price: 5,
            category: "food"
        }]);
    });

    it('show method should return the correct product', async () => {
        const result = await store.show("1");
        expect(result).toEqual([{
            id: 1,
            name: "apples",
            price: 5,
            category: "food"
        }]);
    });

    it('delete method should remove the product', async () => {
        store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    })
});