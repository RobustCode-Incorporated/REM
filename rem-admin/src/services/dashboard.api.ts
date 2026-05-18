import { api } from './api'

export const DashboardAPI = {
  async getKpis() {
    const res = await api.get('/dashboard/kpis')
    return res.data
  },
}