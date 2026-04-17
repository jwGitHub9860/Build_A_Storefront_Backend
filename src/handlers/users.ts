import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

const store = new UserStore()

// Handler Functions
const index = async (req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    // MUST DEFINE "req.params.id" as String SEPARATELY or "req.params.id" Error will Occur
    const id = req.params.id as string

    const user = await store.show(id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            password_digest: req.body.password_digest,
        }

        const newUser = await store.create(user)
        res.json(newUser)
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

const usersRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/{:id}', show)
    app.post('/users', create)
    app.delete('/users/{:id}', destroy)
}

export default usersRoutes