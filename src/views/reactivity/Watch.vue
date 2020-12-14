<template>
    <h2> Watch </h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.与watchEffect相比，惰性地执行副作用。更具体地说明应触发侦听器重新运行的状态。访问侦听状态的先前值和当前值。</li>
        <li>2.使用 watch() 函数可以监听多个数据源。源数组中必须是ref对象或返回reactive对象的函数。</li>
        <li>3.watch的默认的更新时机是异步的。执行时机在nextTick（Promise.resolve()）之后。</li>
        <li>4.返回值是停止函数,一旦调用后就不再监听该对象。</li>
    </ul>
</template>

<script lang="ts">
import { effect, reactive, ref } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
export default {
    setup(){
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
            console.log('监听数组中的ref对象count:' + prevCount, count, ',监听数组中的reactive对象obj.count',prevObjCount, objCount)
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

