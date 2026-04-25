import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Product, ProductStore } from "./models/product";
import { Order, OrderStore } from "./models/order";
import { User, UserStore } from "./models/user";
import productsRoutes from "./handlers/products";
import ordersRoutes from "./handlers/orders";
import usersRoutes from "./handlers/users";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

// Home Route
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

// Enables Use of Express Routes in "handlers" Folder
productsRoutes(app)
ordersRoutes(app)
usersRoutes(app)

// Starts Server on Port 3000
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

// API Endpoints

// REST Routes for "product" Model
app.get('/products', (req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        res.send('this is the SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.post('/products', (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    }
    try {
        res.send('this is the CREATE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// TEMP: should I include "update" (or "EDIT") Method?

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        res.send('this is the DELETE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// REST Routes for "order" Model

// MUST BE "POST" Request to PREVENT "Invalid token JsonWebTokenError: jwt must be provided"
// "GET" Requests will NOT ACCEPT Tokens
app.post('/orders', (req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// MUST BE "POST" Request to PREVENT "Invalid token JsonWebTokenError: jwt must be provided"
// "GET" Requests will NOT ACCEPT Tokens
app.post('/orders/:id', (req: Request, res: Response) => {
    try {
        res.send('this is the SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.post('/orders', (req: Request, res: Response) => {
    const order: Order = {
        productOrderId: req.body.productOrderId,
        quantity: req.body.quantity,
        userId: req.body.userId,
        orderStatus: req.body.orderStatus,
    }
    try {
        res.send('this is the CREATE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// TEMP: should I include "update" (or "EDIT") Method?

app.delete('/orders/:id', (req: Request, res: Response) => {
    try {
        res.send('this is the DELETE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// REST Routes for "user" Model

// MUST BE "POST" Request to PREVENT "Invalid token JsonWebTokenError: jwt must be provided"
// "GET" Requests will NOT ACCEPT Tokens
app.post('/users', (req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// MUST BE "POST" Request to PREVENT "Invalid token JsonWebTokenError: jwt must be provided"
// "GET" Requests will NOT ACCEPT Tokens
app.post('/users/:id', (req: Request, res: Response) => {
    try {
        res.send('this is the SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.post('/users', (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    }
    try {
        res.send('this is the CREATE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// TEMP: should I include "update" (or "EDIT") Method?

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        res.send('this is the DELETE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// Checks User Authentication
app.post('/users/authenticate', (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    }
    try {
        res.send('this is the USER AUTHENTICATION route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// Shows Current Order by User
app.get('/users/:userID/orders/:orderID/products', (req: Request, res: Response) => {
    try {
        // TEMP: change this message LATER?
        res.send('this is the route that shows current order by user')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})