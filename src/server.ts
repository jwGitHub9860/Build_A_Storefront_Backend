import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
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
