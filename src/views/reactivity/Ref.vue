<template>
    <h2> Ref </h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.接受一个参数值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性 .value。</li>
        <li>2.ref 是 reactive 的一个变形版本，reactive 只接受对象作为入参，ref 解决值类型的数据响应，如果传入 ref 的是一个对象，内部会调 reactive。</li>
        <li>3.isRef 用来判断某个值是否为 ref() 创建出来的对象。</li>
        <li>4.unref 返回 ref 代理的原始对象，这是一个转义接口。</li>
        <li>5.shallowRef 只代理 ref 对象本身，也就是说只有 .value 是被代理的，而 .value 所引用的对象并没有被代理。</li>
        <li>6.toRef() 函数用来把一个响应式对象的的某个 key 值转换成 ref。</li>
        <li>6.toRefs() 函数直接把一个响应式对象的所有key都转成 ref。</li>
    </ul>
</template>

<script lang="ts">
    import {isRef, ref, unref, toRef, toRefs, reactive, shallowRef} from '@vue/reactivity'
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


            // shallowRef用在值对象上
            setTimeout(()=>{
                const refState = ref(0)
                const shallowRefState = shallowRef(0)

                watchEffect(() => {
                    console.log('监听ref对象 refState.value:' + refState.value)
                })

                watchEffect(() => {
                    console.log('监听shallowRef对象 shallowState.value:' + shallowRefState.value)
                })

                refState.value++
                shallowRefState.value++
            },500)


            // shallowRef用在引用对象上
            setTimeout(()=>{
                console.log('-----------------')
                const refState2 = ref({foo:1})
                const shallowRefState2 = shallowRef({foo:1})

                watchEffect(() => {
                    console.log('监听ref对象 refState2.value.foo:' + refState2.value.foo)
                })

                watchEffect(() => {
                    console.log('监听shallowRef对象 shallowState2.value.foo:' + shallowRefState2.value.foo)
                })

                refState2.value.foo++
                shallowRefState2.value.foo++
            },1000)



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

        }
    };
</script>

