import { defineStore } from 'pinia'

export const useSalesStore = defineStore('sales', {
  state: () => ({
    sales: [] as any[],
    customers: [
      { id: 'C1', name: 'Jean Dupont' },
      { id: 'C2', name: 'Marie Laurent' },
    ],
    products: [
      { id: 'P1', name: 'Laptop', price: 1200 },
      { id: 'P2', name: 'Mouse', price: 25 },
    ],
  }),

  actions: {
    addSale(customerId: string, productIds: string[]) {
      const customer = this.customers.find(c => c.id === customerId)
      const selectedProducts = this.products.filter(p =>
        productIds.includes(p.id)
      )

      const total = selectedProducts.reduce(
        (sum, p) => sum + p.price,
        0
      )

      const newSale = {
        id: 'S' + (this.sales.length + 1),
        customer,
        products: selectedProducts,
        total,
        date: new Date().toISOString().split('T')[0],
      }

      this.sales.push(newSale)
    },

    deleteSale(id: string) {
      this.sales = this.sales.filter(s => s.id !== id)
    },
  },
})