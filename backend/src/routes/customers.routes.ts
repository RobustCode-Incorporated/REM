import { Router } from 'express'
import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from '../controllers/customers.controller'

const router = Router()

router.get('/', getCustomers)
router.post('/', createCustomer)
router.delete('/:id', deleteCustomer)

export default router