import { Pool } from "pg"
export const pool = new Pool({
    user: "postgres",
    database: "postgres",
    password: "1234",
    port: 5432,
    host: "localhost"
});