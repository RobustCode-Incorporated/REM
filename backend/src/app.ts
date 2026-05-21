import express from 'express'
import cors from 'cors'

import customersRoutes from './routes/customers.routes'
import productsRoutes from './routes/products.routes'
import salesRoutes from './routes/sales.routes'
import dashboardRoutes from './routes/dashboard.routes'

import authRoutes from './modules/auth/auth.routes'

const app = express()

/**
 * =========================
 * CORS
 * =========================
 */

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

/**
 * =========================
 * JSON PARSER
 * =========================
 */

app.use(express.json())

/**
 * =========================
 * ROOT TEST
 * =========================
 */

app.get('/', (_req, res) => {
  res.json({
    status: 'Backend running',
  })
})

/**
 * =========================
 * AUTH
 * =========================
 */

app.use('/auth', authRoutes)

/**
 * =========================
 * MODULES
 * =========================
 */

app.use('/customers', customersRoutes)
app.use('/products', productsRoutes)
app.use('/sales', salesRoutes)
app.use('/dashboard', dashboardRoutes)

export default app