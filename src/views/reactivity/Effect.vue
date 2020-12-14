<template>
    <h2> Effect </h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.effect 作为 reactive 的核心，主要负责收集依赖，更新依赖。</li>
        <li>2.用来运行副作用函数，默认是立即执行的。它可以是 lazy 的，这时我们可以手动执行它。</li>
        <li>3.@vue/reactivity 提供了 stop 函数用来停止一个副作用。effect 函数会返回effect 本身，把这个返回值传递给 stop 函数，就可以停止掉这个 effect。</li>
        <li>4.effect 传递第二个参数作为选项，可以指定“调度器”。所谓调度器就是用来指定如何运行副作用函数的。实际上就是 watchEffect() 函数的实现思路。</li>
    </ul>
</template>

<script lang="ts">
    import {effect, reactive, ref, stop} from '@vue/reactivity'

    export default {
        setup() {
            const count = ref(0)
            const obj = reactive({count: 0})

            // 使用 effect() 函数定义副作用函数, 注意，监听对象每次变更都会触发副作用函数
            effect(() => {
                console.log('监听ref对象count:' + count.value)
            })

            const effector = effect(() => {
                console.log('监听reactive对象obj.count:' + obj.count)
            })

            const runner = effect(
                () => {
                    console.log('xxx')
                },
                {lazy: true}  // 指定 lazy
            )

            runner() // 手动执行副作用函数

            // 一秒后修改响应式数据，这会触发副作用函数重新执行
            setTimeout(() => {
                count.value++;
                count.value++;
                count.value++;

                obj.count++;
                obj.count++;
                obj.count++;

                //停止监听obj
                stop(effector);

                obj.count++;
                count.value++;
            }, 500)


            //定义scheduler
            const obj2 = reactive({count: 1})
            effect(() => {
                console.log('scheduler：'+obj2.count)
            }, {
                // 指定调度器为 queueJob
                scheduler: queueJob
            })

            // 调度器实现
            const queue: Function[] = []
            let isFlushing = false

            function queueJob(job: () => void) {
                if (!queue.includes(job)) queue.push(job)
                if (!isFlushing) {
                    isFlushing = true
                    Promise.resolve().then(() => {
                        let fn
                        while (fn = queue.shift()) {
                            fn()
                        }
                    })
                }
            }
            setTimeout( () => {
                obj2.count++
                obj2.count++
                obj2.count++
            }, 2000)

        }
    };
</script>

