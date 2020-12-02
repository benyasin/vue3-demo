<template>
    <h3>Provide</h3>
    <button @click="changeColor('black')">变成黑色</button>

    <Inject/>
</template>

<script lang="ts">
import { provide, ref } from 'vue'
import Inject from './Inject.vue'
export default {
    components: { Inject },
    setup(){
        const color = ref('red')

        // provide() 和 inject() 可以实现嵌套组件之间的数据传递。这两个函数只能在 setup() 函数中使用。
        // 父级组件中使用 provide() 函数向下传递数据；子级组件中使用 inject() 获取上层传递过来的数据。
        provide('themeColor', color)

        const changeColor = (val) => {
            color.value = val
        }

        return {
            color,
            changeColor
        }
    }
};
</script>

