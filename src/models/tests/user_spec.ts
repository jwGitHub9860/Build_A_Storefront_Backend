import { User, UserStore } from "../user";

const store = new UserStore()

// MUST USE "types": ["jasmine", "node"] in "tsconfig.json" File
// DEFINES "describe", "it" & "expect" ("jest" & "mocha" do NOT Work)
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
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
            password: "password123",
        });
        expect(result).toEqual({
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
            password: "password123",
        });
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
            password: "password123",
        }]);
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
            password: "password123",
        });
    });
    
    it('delete method should remove the user', async () => {
        store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    })
});