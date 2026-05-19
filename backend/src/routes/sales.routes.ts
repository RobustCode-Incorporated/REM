import { Router } from 'express'
import { pool } from '../db'

const router = Router()

// =========================
// GET ALL SALES
// =========================
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.total,
        s.created_at,
        c.name AS customer_name,
        c.email AS customer_email
      FROM sales s
      LEFT JOIN customers c ON c.id = s.customer_id
      ORDER BY s.created_at DESC
    `)

    return res.json(result.rows)
  } catch (err) {
    console.error('🔥 SALES GET ERROR:', err)

    return res.status(500).json({
      error: 'Failed to fetch sales',
      details: err instanceof Error ? err.message : err,
    })
  }
})

// =========================
// CREATE SALE (TRANSACTION SAFE)
// =========================
router.post('/', async (req, res) => {
  const client = await pool.connect()

  try {
    const { customer_id, products } = req.body

    // =========================
    // VALIDATION BASIC
    // =========================
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: 'Products array is required',
      })
    }

    await client.query('BEGIN')

    // =========================
    // CREATE SALE HEADER
    // =========================
    const saleResult = await client.query(
      `
      INSERT INTO sales (customer_id, total)
      VALUES ($1, 0)
      RETURNING *
      `,
      [customer_id || null]
    )

    const sale = saleResult.rows[0]
    let total = 0

    // =========================
    // INSERT ITEMS
    // =========================
    for (const item of products) {
      const productRes = await client.query(
        `SELECT price FROM products WHERE id = $1`,
        [item.productId]
      )

      // 🔴 SAFE CHECK (IMPORTANT FIX)
      if (productRes.rows.length === 0) {
        throw new Error(`Product not found: ${item.productId}`)
      }

      const price = Number(productRes.rows[0].price)
      const quantity = Number(item.quantity || 1)

      total += price * quantity

      await client.query(
        `
        INSERT INTO sale_items (sale_id, product_id, price, quantity)
        VALUES ($1, $2, $3, $4)
        `,
        [sale.id, item.productId, price, quantity]
      )
    }

    // =========================
    // UPDATE TOTAL
    // =========================
    await client.query(
      `UPDATE sales SET total = $1 WHERE id = $2`,
      [total, sale.id]
    )

    await client.query('COMMIT')

    return res.json({
      ...sale,
      total,
    })
  } catch (err) {
    await client.query('ROLLBACK')

    console.error('🔥 SALES CREATE ERROR:', err)

    return res.status(500).json({
      error: 'Sale creation failed',
      details: err instanceof Error ? err.message : err,
    })
  } finally {
    client.release()
  }
})

// =========================
// DELETE SALE
// =========================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await pool.query(`DELETE FROM sales WHERE id = $1`, [id])

    return res.json({ message: 'Sale deleted' })
  } catch (err) {
    console.error('🔥 SALES DELETE ERROR:', err)

    return res.status(500).json({
      error: 'Delete failed',
      details: err instanceof Error ? err.message : err,
    })
  }
})

export default router