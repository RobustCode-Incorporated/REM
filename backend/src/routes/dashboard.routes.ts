import { Router } from 'express'
import { pool } from '../db'

const router = Router()

router.get('/kpis', async (_req, res) => {
  try {
    const sales = await pool.query(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total),0) as total_sales
      FROM sales
    `)

    const customers = await pool.query(`
      SELECT COUNT(*) as total_customers FROM customers
    `)

    const products = await pool.query(`
      SELECT COUNT(*) as total_products FROM products
    `)

    const stockAlerts = await pool.query(`
      SELECT COUNT(*) as low_stock
      FROM products
      WHERE stock < 5
    `)

    return res.json({
      totalSales: sales.rows[0].total_sales,
      orders: sales.rows[0].total_orders,
      customers: customers.rows[0].total_customers,
      products: products.rows[0].total_products,
      stockAlerts: stockAlerts.rows[0].low_stock,
    })
  } catch (err) {
    console.error('DASHBOARD ERROR:', err)
    return res.status(500).json({ error: 'Dashboard error' })
  }
})

export default router