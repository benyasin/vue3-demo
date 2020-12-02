<template>
    effect
</template>

<script lang="ts">
import { effect, reactive, ref, stop } from '@vue/reactivity'
export default {
    setup(){
        // 使用 reactive() 函数定义响应式数据
        const count = ref(0)
        const obj = reactive({ count: 0 })

        // 使用 effect() 函数定义副作用函数, 注意，监听对象每次变更都会触发副作用函数
        effect(() => {
            console.log('监听ref对象count:' + count.value)
        })

        const runner = effect(() => {
            console.log('监听reactive对象obj.count:' + obj.count)
        })

        // 一秒后修改响应式数据，这会触发副作用函数重新执行
        setTimeout(async() => {
            count.value ++;
            count.value ++;
            count.value ++;

            obj.count ++;
            obj.count ++;
            obj.count ++;

            //停止监听obj
            stop(runner);

            obj.count ++;
            count.value ++;
        }, 1000)
    }
};
</script>

