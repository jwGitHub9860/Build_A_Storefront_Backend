import { UserStore } from "../models/user";
import jwt from "jsonwebtoken";
const store = new UserStore();
// MUST USE to Define "process.env.TOKEN_SECRET" as String
// Prevents Error of Undefined "process.env.TOKEN_SECRET"
const secret = process.env.TOKEN_SECRET;
// Handler Functions
const index = async (req, res) => {
    // Requires Token to Display All Users
    try {
        // Checks if Token is Valid
        jwt.verify(req.body.token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    // MUST DEFINE "req.params.id" as String SEPARATELY or "req.params.id" Error will Occur
    const id = req.params.id;
    const user = await store.show(id);
    res.json(user);
};
const create = async (req, res) => {
    const user = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        password_digest: req.body.password_digest,
    };
    try {
        const newUser = await store.create(user);
        // Creates Token AFTER New User is Created
        // "token" will CONSTANTLY CHANGE
        let token = jwt.sign({ user: newUser }, secret);
        res.json({ newUser, token });
    }
    catch (err) {
        res.status(400);
        // "err" Should be Message Explaining Error
        res.json(err + user);
    }
};
// TEMP: should I include "update" Method?
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const authenticate = async (req, res) => {
    const user = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        password_digest: req.body.password_digest
    };
    try {
        const u = await store.authenticate(user.username, user.password);
        // Signs Token as Part of "user" Authenticate Action
        // "token" will CONSTANTLY CHANGE
        let token = jwt.sign({ user: u }, secret);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json({ err });
    }
};
const usersRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/{:id}', show);
    app.post('/users', create);
    app.delete('/users/{:id}', destroy);
    app.post('/users/authenticate', authenticate);
};
export default usersRoutes;
