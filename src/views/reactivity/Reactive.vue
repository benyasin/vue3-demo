<template>
    reactive
</template>

<script lang="ts">
import { isRef, reactive, isReactive, toRaw, shallowReactive } from '@vue/reactivity'
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

