import e, { Request, Response } from "express";
import { pool } from "../config/db"
export const getMethod = async (req: Request, res: Response) => {
    try {
        const allusers = await pool.query(`SELECT * FROM xasanboy`);
        res.status(200).json({ message: allusers.rows })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
// 
export const postMethod = async (req: Request, res: Response) => {
    try {
        const { name, lastname, email, gender, country, password } = req.body
        const users = await pool.query(`SELECT * FROM xasanboy WHERE name = $1 AND lastname = $2 AND email = $3`, [name, lastname, email])
        if (users.rows.length == 0) {
            await pool.query(`INSERT INTO xasanboy (name,lastname,email,gender,country,password) VALUES ($1,$2,$3,$4,$5,$6)`, [name, lastname, email, gender, country, password])
            return res.redirect("about")
        }
        res.status(400).json({ message: "You have already registered!" })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
// 
export const deleteMethod = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await pool.query(`DELETE FROM xasanboy WHERE id = $1`, [id])
        const users = (await pool.query(`SELECT * FROM xasanboy`)).rows
        res.redirect("/about")
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}