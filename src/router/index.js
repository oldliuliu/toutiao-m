import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')
const Vidio = () => import('@/views/Vidio')
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home', component: Home
      },
      {
        path: 'my', component: My
      },
      {
        path: 'question', component: Question
      },
      {
        path: 'vidio', component: Vidio
      }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes
})

export default router
