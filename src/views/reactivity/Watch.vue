<template>
    watch
</template>

<script lang="ts">
import { effect, reactive, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
export default {
    setup(){
        // 使用 reactive() 函数定义响应式数据
        const count = ref(0)
        const obj = reactive({ count: 0 })

        // 使用 watch() 函数定义副作用函数
        // 与watchEffect相比，是惰性执行的
        // 执行时机在nextTick（Promise.resolve()）之后
        const stopWatchRef = watch(
            () => obj.count,
            (count, prevCount) => {
                console.log('监听单个ref对象count:' + prevCount, count)
            }
        )

        // 使用 watch() 函数监听多个数据源
        watch([count, () => obj.count],([count, objCount], [prevCount, prevObjCount]) => {
            console.log('监听数组中的ref对象count:' + prevCount, count)
            console.log('监听数组中的reactive对象obj.count:' + prevObjCount, objCount)
        })

        // 一秒后修改响应式数据，这会触发副作用函数重新执行
        // 关于watch更多用法，参照源码或这篇博客 https://bengbu-yuezhang.github.io/2019/12/31/vue%E6%BA%90%E7%A0%813/
        setTimeout(async() => {
            count.value ++;
            count.value ++;
            count.value ++;

            obj.count ++;
            obj.count ++;
            obj.count ++;

            // watch的默认的更新时机是异步的
            await nextTick()

            stopWatchRef();
            console.log('停止监听单个ref对象...')

            obj.count ++;
            count.value ++;
        }, 1000)
    }
};
</script>

