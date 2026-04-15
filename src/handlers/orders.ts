import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";

const store = new OrderStatus()

// Handler Functions
const index = async (req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    // MUST DEFINE "req.params.id" as String SEPARATELY or "req.params.id" Error will Occur
    const id = req.params.id as string

    const order = await store.show(id)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: req.body.id,
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
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const ordersRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/{:id}', show)
    app.post('/orders', create)
    app.delete('/orders/{:id}', destroy)
}

export default ordersRoutes