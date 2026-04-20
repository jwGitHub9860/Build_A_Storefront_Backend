import { ProductStore } from "../models/product";
import jwt from "jsonwebtoken";
const store = new ProductStore();
// MUST USE to Define "process.env.TOKEN_SECRET" as String
// Prevents Error of Undefined "process.env.TOKEN_SECRET"
const secret = process.env.TOKEN_SECRET;
// Handler Functions
const index = async (req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    // MUST DEFINE "req.params.id" as String SEPARATELY or "req.params.id" Error will Occur
    const id = req.params.id;
    const product = await store.show(id);
    res.json(product);
};
const create = async (req, res) => {
    // Protects "products" Create Route by Requiring JWT Validation
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        jwt.verify(token, secret);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// TEMP: should I include "update" Method?
const destroy = async (req, res) => {
    // Protects "products" Delete Route by Requiring JWT Validation
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        jwt.verify(token, secret);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json({ err });
    }
};
const productsRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/{:id}', show);
    app.post('/products', create);
    app.delete('/products/{:id}', destroy);
};
export default productsRoutes;
