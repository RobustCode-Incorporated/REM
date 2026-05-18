import { Request, Response } from 'express'
import { pool } from '../db/index'

// =========================
// GET ALL PRODUCTS
// =========================
export const getProducts = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    )

    return res.json(result.rows)
  } catch (err) {
    console.error('🔥 GET PRODUCTS ERROR:', err)

    return res.status(500).json({
      error: 'Failed to fetch products',
    })
  }
}

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body

    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      })
    }

    const result = await pool.query(
      `INSERT INTO products (name, price, stock)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, price || 0, stock || 0]
    )

    return res.json(result.rows[0])
  } catch (err) {
    console.error('🔥 CREATE PRODUCT ERROR:', err)

    return res.status(500).json({
      error: 'Failed to create product',
    })
  }
}

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await pool.query('DELETE FROM products WHERE id = $1', [id])

    return res.json({ message: 'deleted' })
  } catch (err) {
    console.error('🔥 DELETE PRODUCT ERROR:', err)

    return res.status(500).json({
      error: 'Failed to delete product',
    })
  }
}