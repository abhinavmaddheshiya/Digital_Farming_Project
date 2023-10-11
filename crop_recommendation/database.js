import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getDB() {
    const [rows] = await pool.query("SELECT * FROM crop_recommendation")
    return rows
}

export async function getCrop(N, P, K, T, H, pH, R) {
    const [rows] = await pool.query(`
    SELECT label 
    FROM crop_recommendation
    WHERE N = ? AND P = ? AND K = ? AND temperature = ? AND humidity = ? AND ph = ? AND rainfall = ?
    `, [N, P, K, T, H, pH, R])
    return rows[0]
}