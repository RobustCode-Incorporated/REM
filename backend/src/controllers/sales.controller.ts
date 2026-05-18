import { Request, Response } from 'express'
import { pool } from '../db/index'

export const getSales = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sales ORDER BY created_at DESC'
    )

    return res.json(result.rows)
  } catch (err) {
    console.error('SALES ERROR:', err)
    return res.status(500).json({ error: 'Sales error' })
  }
}