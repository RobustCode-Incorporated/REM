import { Router } from 'express'
import { db } from '../db'

const router = Router()

/**
 * GET ALL SALES (with customer info)
 */
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
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

    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales' })
  }
})

/**
 * CREATE SALE (TRANSACTION)
 */
router.post('/', async (req, res) => {
  const client = await db.connect()

  try {
    await client.query('BEGIN')

    const { customer_id, products } = req.body

    /**
     * 1. CREATE SALE HEADER
     */
    const saleResult = await client.query(
      `
      INSERT INTO sales (customer_id, total)
      VALUES ($1, 0)
      RETURNING *
      `,
      [customer_id]
    )

    const sale = saleResult.rows[0]

    let total = 0

    /**
     * 2. INSERT SALE ITEMS
     */
    for (const item of products) {
      const productRes = await client.query(
        `SELECT price FROM products WHERE id = $1`,
        [item.productId]
      )

      const price = productRes.rows[0].price
      const quantity = item.quantity || 1

      total += price * quantity

      await client.query(
        `
        INSERT INTO sale_items (sale_id, product_id, price, quantity)
        VALUES ($1, $2, $3, $4)
        `,
        [sale.id, item.productId, price, quantity]
      )
    }

    /**
     * 3. UPDATE TOTAL
     */
    await client.query(
      `UPDATE sales SET total = $1 WHERE id = $2`,
      [total, sale.id]
    )

    await client.query('COMMIT')

    res.json({ ...sale, total })
  } catch (err) {
    await client.query('ROLLBACK')
    res.status(500).json({ error: 'Sale creation failed' })
  } finally {
    client.release()
  }
})

/**
 * DELETE SALE (CASCADE)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    await db.query(`DELETE FROM sales WHERE id = $1`, [id])

    res.json({ message: 'Sale deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' })
  }
})

export default router