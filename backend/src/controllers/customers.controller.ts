import { Request, Response } from 'express'
import { pool } from '../db/index'

// GET all customers
export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM customers ORDER BY created_at DESC'
    )

    return res.json(result.rows)
  } catch (error) {
    console.error('🔥 GET CUSTOMERS ERROR:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// CREATE customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body

    const result = await pool.query(
      `INSERT INTO customers (name, email)
       VALUES ($1, $2)
       RETURNING *`,
      [name, email]
    )

    return res.json(result.rows[0])
  } catch (error) {
    console.error('🔥 CREATE CUSTOMER ERROR:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// DELETE customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await pool.query('DELETE FROM customers WHERE id = $1', [id])

    return res.json({ message: 'deleted' })
  } catch (error) {
    console.error('🔥 DELETE CUSTOMER ERROR:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}