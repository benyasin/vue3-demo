import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "/@views/Home.vue";

const routes: Array<any> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/counter",
        name: "Counter",
        component: () => import("../views/Counter.vue"),
    },
    {
        path: "/todomvc",
        name: "TodoMVC",
        component: () => import("../views/TodoMVC.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;