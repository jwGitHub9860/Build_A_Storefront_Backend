import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore()

// Handler Functions
const index = async (req: Request, res: Response) => {
    // Requires Token to Display All Users
    try {
        // Checks if Token is Valid
        jwt.verify(req.body.token, (process.env.TOKEN_SECRET as string))
    } catch (err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
        return
    }

    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    // Requires Token to Display User Information
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
    
        const user = await store.show(id)
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
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

    // Requires Token to Create New User
    try {
        // Checks if Token is Valid
        jwt.verify(req.body.token, (process.env.TOKEN_SECRET as string))
    } catch (err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
    }

    try {
        const newUser = await store.create(user)

        // Creates Token AFTER New User is Created
        // "token" will CONSTANTLY CHANGE
        let token = jwt.sign({ user: newUser }, (process.env.TOKEN_SECRET as string))
        
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
        let token = jwt.sign({ user: u }, (process.env.TOKEN_SECRET as string))

        res.json(token)
    } catch (err) {
        res.status(401)
        res.json({err})
    }
}

const usersRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.delete('/users/:id', destroy)
    app.post('/users/authenticate', authenticate)
}

export default usersRoutes