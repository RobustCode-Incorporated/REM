import { Router } from 'express'

const router = Router()

/**
 * HEALTH CHECK
 */
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running correctly',
    timestamp: new Date().toISOString(),
  })
})

/**
 * SIMPLE CORS TEST RESPONSE
 */
router.get('/cors-test', (_req, res) => {
  res.json({
    cors: true,
    message: 'If you see this in frontend, CORS is working',
  })
})

/**
 * MOCK KPI (NO DATABASE)
 */
router.get('/mock-kpis', (_req, res) => {
  res.json({
    totalSales: 1234,
    orders: 42,
    customers: 18,
    stockAlerts: 3,
  })
})

/**
 * MOCK LIST TEST
 */
router.get('/mock-products', (_req, res) => {
  res.json([
    { id: '1', name: 'Product A', price: 10, stock: 5 },
    { id: '2', name: 'Product B', price: 20, stock: 2 },
  ])
})

export default router