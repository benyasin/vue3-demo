<template>
    <h2> Reactive </h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.接收一个普通对象然后返回该普通对象的响应式代理。等同于 2.x 的 Vue.observable()</li>
        <li>2.基于 ES2015 的 Proxy 实现，返回的代理对象不等于原始对象, 建议仅使用代理对象而避免依赖原始对象。</li>
        <li>3.Vue3中响应数据核心是 reactive, reactive 中的实现是由 proxy 加 effect 组合。</li>
        <li>4.isReactive 检查对象是否是 reactive创建的响应式 proxy。</li>
        <li>5.toRaw 返回 reactive 或 readonly 代理的原始对象，这是一个转义接口。</li>
        <li>6.markRaw 标记一个对象，使其永远不会转换为代理。返回对象本身。</li>
        <li>7.shallowReactive 创建一个响应式代理，该代理跟踪其自身 property 的响应性，但不执行嵌套对象的深度响应式转换。</li>
    </ul>
</template>

<script lang="ts">
import { isRef, reactive, isReactive, toRaw, toRefs, shallowReactive } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
export default {
    setup(){
        const obj = { count: 0 }
        // 创建响应式数据对象 state，初始值为 { count: 0 }
        const state = reactive(obj)

        state.count++                  // 此处不需要通过 .value 就能直接访问原始值
        console.log(state.count)       // 输出 1

        console.log(isRef(state))       // 检查对象是否是 ref创建的响应式 proxy
        console.log(isReactive(state))  // 检查对象是否是 reactive创建的响应式 proxy


        console.log(toRaw(state) === obj) // toRaw返回 reactive 或 readonly 代理的原始对象
        console.log(toRaw(state), obj)

        // shallowReactive浅响应
        const shallowState = shallowReactive({
            foo: 1,
            nested: {
                bar: 1
            }
        })

        watchEffect(() => {
            console.log('监听reactive对象shallowState.foo:' + shallowState.foo)
        })

        watchEffect(() => {
            console.log('监听reactive对象shallowState.nested.bar:' + shallowState.nested.bar)
        })

        // 改变状态本身的性质是响应式的
        shallowState.foo++
        // ...但是不转换嵌套对象
        console.log(isReactive(shallowState.nested)) // false
        shallowState.nested.bar++ // 非响应式
    }
};
</script>

