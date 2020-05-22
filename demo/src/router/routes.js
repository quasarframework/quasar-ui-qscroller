
const routes = [
  {
    path: '/',
    redirect: '/docs'
  },
  {
    path: '/docs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/examples',
    component: () => import('layouts/Examples.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Examples.vue'),
        children: [
          {
            path: '',
            redirect: '/examples/string'
          },
          {
            path: 'string',
            component: () => import('pages/String.vue')
          },
          {
            path: 'time',
            component: () => import('pages/Time.vue')
          },
          {
            path: 'date',
            component: () => import('pages/Date.vue')
          },
          {
            path: 'time-range',
            component: () => import('pages/TimeRange.vue')
          },
          {
            path: 'date-range',
            component: () => import('pages/DateRange.vue')
          },
          {
            path: 'date-time',
            component: () => import('pages/DateTime.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/demo',
    component: () => import('layouts/ScrollerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Scroller.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
