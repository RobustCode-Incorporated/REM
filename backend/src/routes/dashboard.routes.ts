import { Router } from 'express'
import { db } from '../db'

const router = Router()

router.get('/kpis', async (req, res) => {
  try {
    const sales = await db.query(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total),0) as total_sales
      FROM sales
    `)

    const customers = await db.query(`
      SELECT COUNT(*) as total_customers FROM customers
    `)

    const products = await db.query(`
      SELECT COUNT(*) as total_products FROM products
    `)

    const stockAlerts = await db.query(`
      SELECT COUNT(*) as low_stock
      FROM products
      WHERE stock < 5
    `)

    res.json({
      totalSales: sales.rows[0].total_sales,
      orders: sales.rows[0].total_orders,
      customers: customers.rows[0].total_customers,
      products: products.rows[0].total_products,
      stockAlerts: stockAlerts.rows[0].low_stock
    })

  } catch (err) {
    res.status(500).json({ error: 'Dashboard error' })
  }
})

export default router