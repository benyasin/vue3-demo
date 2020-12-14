<template>
    <h2> WatchEffect </h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。</li>
        <li>2.使用 watchEffect() 函数定义副作用函数。默认值时会首先执行一次副作用函数, 只在监听对象最后一次变更后触发副作用函数。</li>
        <li>3.返回值是停止函数,一旦调用后就不再监听该对象。</li>
        <li>4.watchEffect的默认的更新时机是异步的。执行时机在nextTick（Promise.resolve()）之后。。</li>
        <li>5.有时副作用函数会执行一些异步的副作用，这些响应需要在其失效时清除。接收一个 onInvalidate 函数作入参，用来注册清理失效时的回调。</li>
        <li>6. &nbsp;&nbsp; <br/>
            &nbsp;&nbsp; a、effect() 函数来自于 @vue/reactivity ，而 watchEffect() 函数来自于 @vue/runtime-core。<br/>
            &nbsp;&nbsp; b、它们的区别在于：effect() 是非常底层的实现，watchEffect() 是基于 effect() 的封装，<br/>
            &nbsp;&nbsp; c、watchEffect() 会维护与组件实例以及组件状态(是否被卸载等)的关系，如果一个组件被卸载，那么 watchEffect() 也将被 stop，但 effect() 则不会。</li>
    </ul>
</template>

<script lang="ts">
import { reactive, ref } from '@vue/reactivity'
import { watchEffect, nextTick} from '@vue/runtime-core'
export default {
    setup(){
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

            //await nextTick()

            stopWatchRef();
            console.log('停止监听ref对象...')

            obj.count ++;
            count.value ++;
        }, 1000)



        //异步副作用
        watchEffect(async (onInvalidate) => {
            let validate = true
            //我们在Promise解析之前注册清除函数
            onInvalidate(() => {
                validate = false
            })

            const data = await fetch(''+ obj.count)
            if (validate){
                /* 正常使用 data */
            } else {
                /* 说明当前副作用已经无效了，抛弃即可 */
            }
        })
    }
};
</script>

