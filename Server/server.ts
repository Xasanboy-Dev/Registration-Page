import express, { Request, Response } from "express"
import { getMethod, postMethod, deleteMethod } from "../functions/function"
import { pool } from "../config/db"
import { shoppingList } from "./Type"
const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
const PORT = 8080
// Get Method
server.get("/users", getMethod)
// Post Method
server.post("/register", postMethod)
// Delete 
server.post("/users/:id", deleteMethod)
server.get("/users/:id", deleteMethod)
server.set("view engine", "ejs")

server.get("/about", async (req: Request, res: Response) => {
    try {
        const users = (await pool.query(`SELECT * FROM xasanboy`)).rows
        res.render("about", { users, title: "All Users" })
    } catch (error) {
        res.status(500).json({ message: "You have an error" })
    }
})
// 
server.get("/shoppinglist", (req: Request, res: Response) => {
    try {
        res.render("lists", { title: "Ahopping List", list: shoppingList })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
// 
server.get("/register", (req: Request, res: Response) => {
    try {
        res.render("register", { title: "Register" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
// 
server.get("/login", (req: Request, res: Response) => {
    try {
        res.render("login", { title: "Login" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
// 
server.post("/login", async (req: Request, res: Response) => {
    try {
        const { name, email, password, lastname } = req.body
        const users = (await pool.query(`SELECT * FROM xasanboy WHERE name = $1 AND email = $2 AND password = $3 AND lastname = $4`, [name, email, password, lastname])).rows
        if (users.length == 1) {
            return res.render("info", { title: "Info Page", users: users[0] })
        }
        res.render("error", { error: "in your DATA", title: "Error Page" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
// 
server.post("/info", async (req: Request, res: Response) => {
    try {
        const { name, email, lastname, id } = req.body
        const users = (await pool.query(`SELECT * FROM xasanboy WHERE name = $1 AND email = $2 AND lastname = $3`, [name, email, lastname])).rows
        if (users.length == 0) {
            const { name, lastname, email, gender, country, password } = req.body
            await pool.query(`UPDATE xasanboy SET name = $1, lastname = $2, email = $3, gender = $4, country = $5, password = $6 WHERE id = $7 `, [name, lastname, email, gender, country, password, id])
            const users = await pool.query(`SELECT * FROM xasanboy WHERE id = $1`, [id])
            return res.render("info", { title: "Info Page", users: users.rows[0] })
        } else if (users.length == 1) {
            const user = users[0]
            if (user.id === id) {
                const { name, lastname, email, gender, country, password } = req.body
                await pool.query(`UPDATE xasanboy SET name = $1, lastname = $2, email = $3, gender = $4, country = $5, password = $6 WHERE id = $7 `, [name, lastname, email, gender, country, password, id])
                const users = await pool.query(`SELECT * FROM xasanboy WHERE id = $1`, [id])
                return res.render("info", { title: "Info Page", users: users.rows[0] })
            } else {
                res.render("error", { error: "You can't change your DATA to this DATA! Change to another DATA" })
            }
        } else {
            res.render("error", { error: "You can't change your DATA to this DATA! Change to another DATA" })
        }
    } catch (error: any) {
        res.render("error", { title: "Error Page", error: error.message })
    }
})
server.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})