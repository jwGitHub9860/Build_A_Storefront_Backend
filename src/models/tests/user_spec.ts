import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest';
import { UserStore } from "../user";
import usersRoutes from "../../handlers/users";

const app: express.Application = express()

app.use(bodyParser.json())

// Enables Use of Express Routes in "handlers" Folder
usersRoutes(app)

const store = new UserStore()

// MUST USE "types": ["jasmine", "node"] in "tsconfig.json" File
// DEFINES "describe", "it" & "expect" ("jest" & "mocha" do NOT Work)
describe("User Model", () => {
    // Clears "users" Database BEFORE Tests to Prevent Errors
    beforeAll(async () => {
        expect(store.resetDatabase).toBeDefined();
        await store.resetDatabase()
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

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await store.create({
            firstName: "John",
            lastName: "Doe",
            username: "userJohn",
        });

        // Tests if "create" Method Created User
        expect(result).toBeDefined();
        expect(result.username).toEqual("userJohn");
    });

    // Checks for Specific Array Result from Running Index Method
    it('index method should return a list of users', async () => {
        const result = await store.index();

        // Tests if "index" Method Displayed All Users
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].username).toEqual("userJohn");
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");

        // Tests if "show" Method Showed Chosen User
        expect(result).toBeDefined();
        expect(result.username).toEqual("userJohn");
    });
    
    it('delete method should remove the user', async () => {
        const result = await store.delete("1");

        // Tests if "delete" Method Deleted Chosen User
        expect(result).toBeDefined();

        const users = await store.index();
        expect(users.length).toEqual(0);
    });
});
