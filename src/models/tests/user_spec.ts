import { User, UserStore } from "../user";

const store = new UserStore()

// MUST USE "jest" to DEFINE "describe", "it" & "expect" ("mocha" does NOT Work)
describe("User Model", () => {
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

    it('create method should add a user', async () => {
        const result = await store.create({
            id: 1,
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
            password: "password123",

            // TEMP: does this need Correcting?
            password_digest: "password123",
        });
        expect(result).toEqual({
            id: 1,
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
            password: "password123",

            // TEMP: does this need Correcting?
            password_digest: "password123",
        });
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
            password: "password123",

            // TEMP: does this need Correcting?
            password_digest: "password123",
        }]);
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");
        expect(result).toEqual([{
            id: 1,
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
            password: "password123",

            // TEMP: does this need Correcting?
            password_digest: "password123",
        }]);
    });
    
    it('delete method should remove the user', async () => {
        store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    })
});