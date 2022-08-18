import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index'),
            meta: {
                icon: '',
                title: '',
                keepAlive: true
            }
        }
    ]
})

export default router