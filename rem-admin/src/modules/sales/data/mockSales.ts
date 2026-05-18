import type { Sale } from '../types/sales.types'

export const sales: Sale[] = [
  {
    id: 'S-001',
    customer: {
      id: 'C-001',
      name: 'Jean Dupont',
      email: 'jean@mail.com'
    },
    products: [
      { id: 'P-001', name: 'Laptop', price: 1200, stock: 5 }
    ],
    total: 1200,
    date: '2026-05-18'
  },
  {
    id: 'S-002',
    customer: {
      id: 'C-002',
      name: 'Marie Laurent',
      email: 'marie@mail.com'
    },
    products: [
      { id: 'P-002', name: 'Mouse', price: 25, stock: 50 }
    ],
    total: 25,
    date: '2026-05-17'
  }
]