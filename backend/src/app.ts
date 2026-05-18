import express from 'express'
import cors from 'cors'

import salesRoutes from './routes/sales.routes'
import customerRoutes from './routes/customers.routes'
import productRoutes from './routes/products.routes'
import dashboardRoutes from './routes/dashboard.routes'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/sales', salesRoutes)
app.use('/customers', customerRoutes)
app.use('/products', productRoutes)
app.use('/dashboard', dashboardRoutes)

export default app