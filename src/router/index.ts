import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "/@views/Home.vue";

const routes: Array<any> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/hello",
        name: "Hello",
        component:  import(/* webpackChunkName: "vueinfo" */ "../views/Home.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});

export default router;