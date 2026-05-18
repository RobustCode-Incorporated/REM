import { Request, Response } from 'express'
import { pool } from '../db/index'

export const getKpis = async (_: Request, res: Response) => {
  try {
    const customers = await pool.query('SELECT COUNT(*) FROM customers')
    const products = await pool.query('SELECT COUNT(*) FROM products')
    const sales = await pool.query('SELECT COUNT(*) FROM sales')

    return res.json({
      customers: Number(customers.rows[0].count),
      products: Number(products.rows[0].count),
      sales: Number(sales.rows[0].count),
    })
  } catch (err) {
    console.error('DASHBOARD KPI ERROR:', err)
    return res.status(500).json({ error: 'KPI error' })
  }
}