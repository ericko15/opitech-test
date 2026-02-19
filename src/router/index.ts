import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'products',
    component: () => import('../views/ProductList.vue'),
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetail.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
