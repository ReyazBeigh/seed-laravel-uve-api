import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/pages/Dashboard.vue'
import Login from '../views/pages/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
    ,
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {

    const loggedIn = localStorage.getItem('user');

    if (to.name === 'Login' && loggedIn) {

        next({ 'name': 'Dashboard' })
    }else if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next({ 'name': 'Login' })
    } else {

        next()
    }
})

export default router
