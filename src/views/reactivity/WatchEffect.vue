<template>
    watchEffect
</template>

<script lang="ts">
import { reactive, ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
export default {
    setup(){
        // 使用 reactive() 函数定义响应式数据
        const count = ref(0)
        const obj = reactive({ count: 0 })

        // 使用 watchEffect() 函数定义副作用函数,
        // 默认值时会首先执行一次副作用函数
        // 只在监听对象最后一次变更后触发副作用函数
        watchEffect(() => {
            console.log('监听reactive对象obj.count:' + obj.count)
        })

        //返回值是停止函数,一旦调用后就不再监听该对象
        const stopWatchRef = watchEffect(() => {
            console.log('监听ref对象count:' + count.value)
        })

        // 一秒后修改响应式数据，这会触发副作用函数重新执行
        setTimeout(async() => {
            count.value ++;
            count.value ++;
            count.value ++;

            obj.count ++;
            obj.count ++;
            obj.count ++;

            stopWatchRef();
            console.log('停止监听ref对象...')

            obj.count ++;
            count.value ++;
        }, 1000)
    }
};
</script>

