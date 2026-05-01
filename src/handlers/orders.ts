import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import jwt from "jsonwebtoken";

const store = new OrderStore()

// Handler Functions
const index = async (req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    // Requires Token to Display Current User's Orders
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]

        // Checks if Token is Valid
        jwt.verify((token as string), (process.env.TOKEN_SECRET as string))
    } catch (err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
        return
    }

    try {
        // MUST DEFINE "req.params.id" as String SEPARATELY or "req.params.id" Error will Occur
        const id = req.params.id as string
    
        const order = await store.show(id)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        userId: Number(req.query.userId),
        orderStatus: req.query.orderStatus as string,
    }

    // Protects "orders" Create Route by Requiring JWT Validation
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        
        // MUST USE to Define "process.env.TOKEN_SECRET" as String
        // Prevents Error of Undefined "process.env.TOKEN_SECRET"
        jwt.verify((token as string), (process.env.TOKEN_SECRET as string))
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    
    try {
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(`Could not create new order. ${err}`)
    }
}

const destroy = async (req: Request, res: Response) => {
    // Protects "orders" Delete Route by Requiring JWT Validation
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        jwt.verify((token as string), (process.env.TOKEN_SECRET as string))
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const deleted = await store.delete(req.params.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json({ err })
    }
}

// Attaches "product" to ONE "order"
const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id;
    const productId: string = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);

    try {
        const addedProduct = await store.addProduct(orderId, productId, quantity);
        res.json(addedProduct)
    } catch (err) {
        console.error(`REAL ERROR: ${err}`)
        res.status(400)
        res.json(err)
    }
}

const ordersRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.delete('/orders/:id', destroy)

    // Attaches "product" to ONE "order"
    app.post('/orders/:id/products', addProduct)
}

export default ordersRoutes