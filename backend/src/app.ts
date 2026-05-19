import express from 'express'
import cors from 'cors'

import customersRoutes from './routes/customers.routes'
import productsRoutes from './routes/products.routes'
import salesRoutes from './routes/sales.routes'
import dashboardRoutes from './routes/dashboard.routes'
import authRoutes from './modules/auth/auth.routes'


const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://opulent-journey-4jwwjx6w66xx3jvv5-5173.app.github.dev',
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

app.use(express.json())

app.use('/customers', customersRoutes)
app.use('/products', productsRoutes)
app.use('/sales', salesRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/auth', authRoutes)


export default app