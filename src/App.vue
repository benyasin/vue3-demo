<template>
    <div class="view">
        <div id="nav">
            <div>
                <b>🚀 vue3-demo </b>
            </div>
            <div>
                <router-link to="/"> Home</router-link>
            </div>
            <div class="group">
                <div>响应式API</div>
                <ul>
                    <li><router-link to="/reactivity/ref">Ref</router-link></li>
                    <li><router-link to="/reactivity/reactive">Reactive</router-link></li>
                    <li><router-link to="/reactivity/computed">Computed</router-link></li>
                    <li><router-link to="/reactivity/effect">Effect</router-link></li>
                    <li><router-link to="/reactivity/watchEffect">WatchEffect</router-link></li>
                    <li><router-link to="/reactivity/watch">Watch</router-link></li>
                </ul>
            </div>
            <div class="group">
                <div>组合式API</div>
                <ul>
                    <li><router-link to="/composition/setup">Setup</router-link></li>
                    <li><router-link to="/composition/lifecycle">Lifecycle</router-link></li>
                    <li><router-link to="/composition/provide">Provide&Inject</router-link></li>
                    <li><router-link to="/composition/nextTick">NextTick</router-link></li>
                    <li><router-link to="/composition/event">Event</router-link></li>
                </ul>
            </div>
            <div class="group">
                <div>其它特性</div>
                <ul>
                    <li><router-link to="/other/fragment">Fragment</router-link></li>
                    <li><router-link to="/other/teleport">Teleport</router-link></li>
                    <li><router-link to="/other/suspense">Suspense</router-link></li>
                </ul>
            </div>
            <div>
                <router-link to="/counter"> Counter</router-link>
            </div>
            <div>
                <router-link to="/todomvc"> TodoMVC</router-link>
            </div>
        </div>
        <div id="content">
            <router-view/>
        </div>
    </div>
</template>