<template>
    <h2> NextTick </h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.nextTick 是 vue 中的更新策略，也是性能优化手段，基于JS执行机制实现；vue 中我们改变数据时不会立即触发视图。</li>
        <li>2.如果需要实时获取到最新的DOM，这个时候可以手动调用 nextTick。</li>
        <li>3.nextTick接受函数作为参数，同时nextTick会创建一个微任务。</li>
    </ul>

    <input id="input" :value="message"/>
</template>

<script lang="ts">
    import {nextTick, ref, onMounted} from 'vue'

    export default {
        setup() {
            // nextTick 是 vue 中的更新策略，也是性能优化手段，基于JS执行机制实现
            // vue 中我们改变数据时不会立即触发视图，如果需要实时获取到最新的DOM，这个时候可以手动调用 nextTick
            // nextTick接受函数作为参数，同时nextTick会创建一个微任务。

            // queueJob接受函数作为参数，queueJob会将参数push到queue队列中，在当前宏任务执行结束之后，清空队列。
            // queuePostFlushCb接受函数或者又函数组成的数组作为参数，queuePostFlushCb会将将参数push到postFlushCbs队列中，在当前宏任务执行结束之后，清空队列。
            // queueJob执行的优先级高于queuePostFlushCb
            // queueJob和queuePostFlushCb允许在清空队列的期间添加新的成员。

            /**
             *  const p = Promise.resolve()
             export function nextTick(fn?: () => void): Promise<void> {
              return fn ? p.then(fn) : p
            }
             */
            const message = ref('Hello!')

            const changeMessage = async newMessage => {
                message.value = newMessage
                console.log((document.getElementById('input') as HTMLInputElement).value)

                // 这里获取DOM的value是旧值
                await nextTick()
                await nextTick(()=>{
                    console.log('micro task')
                })

                // nextTick 后获取DOM的value是更新后的值
                console.log('Now DOM is updated')
                console.log((document.getElementById('input') as HTMLInputElement).value)
            }

            onMounted(() => {
                changeMessage('world')
            })

            return {
                message
            }
        }
    };
</script>

