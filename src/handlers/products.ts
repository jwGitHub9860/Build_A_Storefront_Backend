import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import jwt from "jsonwebtoken";

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
    // Protects "products" Create Route by Requiring JWT Validation
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
        const product: Product = {
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
    // Protects "products" Delete Route by Requiring JWT Validation
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

const productsRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.delete('/products/:id', destroy)
}

export default productsRoutes