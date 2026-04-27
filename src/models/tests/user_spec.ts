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
        await store.create({
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
        });
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of users', async () => {
        await store.index();
    });

    it('show method should return the correct user', async () => {
        await store.show("1");
    });
    
    it('delete method should remove the user', async () => {
        await store.delete("1");
        await store.index();
    })
});