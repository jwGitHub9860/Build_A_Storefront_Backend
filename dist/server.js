import express from 'express';
import bodyParser from 'body-parser';
import productsRoutes from "./handlers/products";
import ordersRoutes from "./handlers/orders";
import usersRoutes from "./handlers/users";
const app = express();
const address = "0.0.0.0:3000";
app.use(bodyParser.json());
// Home Route
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// Enables Use of Express Routes in "handlers" Folder
productsRoutes(app);
ordersRoutes(app);
usersRoutes(app);
// Starts Server on Port 3000
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
// API Endpoints
// REST Routes for "product" Model
app.get('/products', (req, res) => {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/products/{:id}', (req, res) => {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.post('/products', (req, res) => {
    const product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        res.send('this is the CREATE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// TEMP: should I include "update" (or "EDIT") Method?
app.delete('/products/{:id}', (req, res) => {
    try {
        res.send('this is the DELETE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// REST Routes for "order" Model
app.get('/orders', (req, res) => {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/orders/{:id}', (req, res) => {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.post('/orders', (req, res) => {
    const order = {
        id: req.body.id,
        productOrderId: req.body.productOrderId,
        quantity: req.body.quantity,
        userId: req.body.userId,
        orderStatus: req.body.orderStatus,
    };
    try {
        res.send('this is the CREATE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// TEMP: should I include "update" (or "EDIT") Method?
app.delete('/orders/{:id}', (req, res) => {
    try {
        res.send('this is the DELETE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// REST Routes for "user" Model
app.get('/users', (req, res) => {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/users/{:id}', (req, res) => {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.post('/users', (req, res) => {
    const user = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        password_digest: req.body.password_digest,
    };
    try {
        res.send('this is the CREATE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// TEMP: should I include "update" (or "EDIT") Method?
app.delete('/users/{:id}', (req, res) => {
    try {
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
