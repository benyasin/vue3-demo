import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "/@views/Home.vue";

const routes: Array<any> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/reactivity/ref",
        name: "Ref",
        component: () => import("../views/reactivity/Ref.vue"),
    },
    {
        path: "/reactivity/reactive",
        name: "Reactive",
        component: () => import("../views/reactivity/Reactive.vue"),
    },
    {
        path: "/reactivity/computed",
        name: "Computed",
        component: () => import("../views/reactivity/Computed.vue"),
    },
    {
        path: "/reactivity/effect",
        name: "Effect",
        component: () => import("../views/reactivity/Effect.vue"),
    },
    {
        path: "/reactivity/watch",
        name: "Watch",
        component: () => import("../views/reactivity/Watch.vue"),
    },
    {
        path: "/reactivity/watchEffect",
        name: "WatchEffect",
        component: () => import("../views/reactivity/WatchEffect.vue"),
    },
    {
        path: "/composition/setup",
        name: "Setup",
        component: () => import("../views/composition/Setup.vue"),
    },
    {
        path: "/composition/lifecycle",
        name: "Lifecycle",
        component: () => import("../views/composition/Lifecycle.vue"),
    },
    {
        path: "/composition/provide",
        name: "Provide",
        component: () => import("../views/composition/Provide.vue"),
    },
    {
        path: "/composition/inject",
        name: "Inject",
        component: () => import("../views/composition/Inject.vue"),
    },
    {
        path: "/composition/nextTick",
        name: "NextTick",
        component: () => import("../views/composition/nextTick.vue"),
    },
    {
        path: "/composition/event",
        name: "Event",
        component: () => import("../views/composition/Event.vue"),
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