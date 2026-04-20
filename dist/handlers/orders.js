import { OrderStatus } from "../models/order";
import jwt from "jsonwebtoken";
const store = new OrderStatus();
// MUST USE to Define "process.env.TOKEN_SECRET" as String
// Prevents Error of Undefined "process.env.TOKEN_SECRET"
const secret = process.env.TOKEN_SECRET;
// Handler Functions
const index = async (req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (req, res) => {
    // MUST DEFINE "req.params.id" as String SEPARATELY or "req.params.id" Error will Occur
    const id = req.params.id;
    const order = await store.show(id);
    res.json(order);
};
const create = async (req, res) => {
    // Protects "orders" Create Route by Requiring JWT Validation
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
        const order = {
            id: req.body.id,
            productOrderId: req.body.productOrderId,
            quantity: req.body.quantity,
            userId: req.body.userId,
            orderStatus: req.body.orderStatus,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// TEMP: should I include "update" Method?
const destroy = async (req, res) => {
    // Protects "orders" Delete Route by Requiring JWT Validation
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
const ordersRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/{:id}', show);
    app.post('/orders', create);
    app.delete('/orders/{:id}', destroy);
};
export default ordersRoutes;
