<template>
    <h2>{{ state.title }}</h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.相当于vue2中的beforeCreate与created</li>
        <li>2.在beforeCreate之后，created之前执行</li>
        <li>3.setup函数是 Composition API（组合API）的入口</li>
        <li>4.在setup函数中定义的变量和方法最后都是需要 return 出去的 不然无法再模板中使用</li>
        <li>5.setup函数只能是同步的不能是异步的。async setup只能用到异步组件中，结合Suspense使用</li>
    </ul>
</template>

<script>
import { reactive } from 'vue'

export default {

    /**
     * 相当于vue2中的beforeCreate与created、在beforeCreate之后，created之前执行
     * @param props
     * @param ctx
     */
    setup(props, ctx) {
        const state = reactive({ title: 'Setup' })

        console.log(props)
        console.log(ctx)

        // expose to template
        return {
            state
        }
    }
}
</script>