import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore()

// MUST USE to Define "process.env.TOKEN_SECRET" as String
// Prevents Error of Undefined "process.env.TOKEN_SECRET"
const secret = process.env.TOKEN_SECRET as string;

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
    const user: User = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        password_digest: req.body.password_digest,
    }
    try {
        const newUser = await store.create(user)

        // Signs Token as Part of "user" Create Action
        // "token" will CONSTANTLY CHANGE
        // TEMP: Use "user: newUser" OR "id: newUser.id"?
        let token = jwt.sign({ user: newUser }, secret)
        
        res.json({newUser, token})
    } catch (err) {
        res.status(400)

        // "err" Should be Message Explaining Error
        res.json((err as string) + user)
    }
}

// TEMP: should I include "update" Method?

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        password_digest: req.body.password_digest
    }
    try {
        const u = await store.authenticate(user.username, user.password)

        // Signs Token as Part of "user" Authenticate Action
        // "token" will CONSTANTLY CHANGE
        let token = jwt.sign({ user: u }, secret)

        res.json(token)
    } catch (err) {
        res.status(401)
        res.json({err})
    }
}

const usersRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/{:id}', show)
    app.post('/users', create)
    app.delete('/users/{:id}', destroy)
    app.post('/users/authenticate', authenticate)
}

export default usersRoutes