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
        // Checks if Token is Valid
        jwt.verify(req.body.token, (process.env.TOKEN_SECRET as string))
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
        const order: Order = {
            productOrderId: req.body.productOrderId,
            quantity: req.body.quantity,
            userId: req.body.userId,
            orderStatus: req.body.orderStatus,
        }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

// TEMP: should I include "update" Method?

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
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json({ err })
    }
}

const ordersRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.delete('/orders/:id', destroy)
}

export default ordersRoutes