<template>
    ref
</template>

<script lang="ts">
    import {isRef, ref, unref, toRef, toRefs, reactive, shallowRef, shallowReactive, isReactive} from '@vue/reactivity'
    import {watchEffect} from '@vue/runtime-core'

    export default {
        setup() {
            // 创建响应式数据对象 count，初始值为 0
            const count = ref(0)

            // 如果要访问 ref() 创建出来的响应式数据对象的值，必须通过 .value 属性才可以
            console.log(count.value) // 输出 0

            // 让 count 的值 +1
            count.value++

            // 再次打印 count 的值
            console.log(count.value) // 输出 1


            // isRef() 用来判断某个值是否为 ref() 创建出来的对象；应用场景：当需要展开某个可能为 ref() 创建出来的值的时候
            console.log(isRef(count)) // true

            // 如果参数为 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val
            console.log(unref(count))


            // toRef 可以用来为源响应式对象上的 property 性创建一个 ref。然后可以将 ref 传递出去，从而保持对其源 property 的响应式连接。
            const state = reactive({
                foo: 1,
                bar: 1
            })

            const fooRef = toRef(state, 'foo')

            fooRef.value++
            console.log(state.foo) // 2
            console.log(state.bar) // 1

            state.foo++
            console.log(fooRef.value) // 3

            state.bar++
            console.log(fooRef.value) // 3


            // toRefs
            // 将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的ref。
            const state2 = reactive({
                foo: 1,
                bar: 1
            })

            const stateAsRefs = toRefs(state2)

            // ref 和 原始property “链接”
            state2.foo++
            console.log(stateAsRefs.foo.value) // 2
            state2.bar++
            console.log(stateAsRefs.bar.value) // 2

            stateAsRefs.foo.value++
            console.log(state2.foo) // 3
            stateAsRefs.bar.value++
            console.log(state2.bar) // 3


            // shallowRef
            const refState = ref({
                foo: 1
            })
            const shallowRefState = shallowRef({
                foo: 1
            })

            watchEffect(() => {
                console.log('监听reactive对象shallowState.foo:' + refState.value.foo)
            })

            watchEffect(() => {
                console.log('监听reactive对象shallowState.nested.bar:' + shallowRefState.value.foo)
            })

            refState.value.foo++
            shallowRefState.value.foo++
        }
    };
</script>

