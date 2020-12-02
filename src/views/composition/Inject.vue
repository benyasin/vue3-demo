<template>
    <h3>inject</h3>
    color: {{color}}
</template>

<script lang="ts">
import { inject } from 'vue'
export default {
    name: 'Inject',
    setup(){
        // provide() 和 inject() 可以实现嵌套组件之间的数据传递。这两个函数只能在 setup() 函数中使用。
        // 父级组件中使用 provide() 函数向下传递数据；子级组件中使用 inject() 获取上层传递过来的数据。
        const color = inject('themeColor')

        return {
            color
        }
    }
};
</script>

