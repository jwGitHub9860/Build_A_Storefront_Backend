import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore()

// Handler Functions
const index = async (req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    // MUST DEFINE "req.params.id" as String SEPARATELY or "req.params.id" Error will Occur
    const id = req.params.id as string

    const product = await store.show(id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
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

const productsRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/{:id}', show)
    app.post('/products', create)
    app.delete('/products/{:id}', destroy)
}

export default productsRoutes