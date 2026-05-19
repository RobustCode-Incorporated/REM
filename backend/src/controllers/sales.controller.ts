import { Request, Response } from 'express'
import { pool } from '../db/index'

export const getSales = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.total,
        s.created_at,

        json_build_object(
          'id', c.id,
          'name', c.name,
          'email', c.email
        ) AS customer,

        COALESCE(
          json_agg(
            json_build_object(
              'id', si.id,
              'quantity', si.quantity,
              'price', si.price,
              'product', json_build_object(
                'id', p.id,
                'name', p.name,
                'price', p.price
              )
            )
          ) FILTER (WHERE si.id IS NOT NULL),
          '[]'
        ) AS items

      FROM sales s
      LEFT JOIN customers c ON c.id = s.customer_id
      LEFT JOIN sale_items si ON si.sale_id = s.id
      LEFT JOIN products p ON p.id = si.product_id

      GROUP BY s.id, c.id
      ORDER BY s.created_at DESC
    `)

    return res.status(200).json(result.rows)
  } catch (err: any) {
    console.error('🔥 SALES ERROR FULL:', err)

    return res.status(500).json({
      error: 'Failed to fetch sales',
      details: err.message,
    })
  }
}