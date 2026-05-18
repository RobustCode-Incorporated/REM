import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/DashboardLayout.vue'),

    children: [
      {
        path: '',
        name: 'dashboard',
        component: () =>
          import('../pages/dashboard/DashboardPage.vue'),
      },

      {
        path: 'sales',
        name: 'sales',
        component: () =>
          import('../modules/sales/pages/SalesPage.vue'),
      },
    ],
  },

  {
    path: '/login',
    name: 'login',
    component: () =>
      import('../pages/auth/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router