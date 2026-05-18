import express from 'express'
import cors from 'cors'

import customersRoutes from './routes/customers.routes'
import productsRoutes from './routes/products.routes'
import salesRoutes from './routes/sales.routes'
import dashboardRoutes from './routes/dashboard.routes'

const app = express()

app.use(cors())
app.use(express.json())

// ROUTES
app.use('/customers', customersRoutes)
app.use('/products', productsRoutes)
app.use('/sales', salesRoutes)
app.use('/dashboard', dashboardRoutes)

export default app