import { Router } from 'express'
import { db } from '../db'

const router = Router()

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM customers')
  res.json(result.rows)
})

export default router