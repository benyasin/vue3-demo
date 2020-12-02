<template>
    event
</template>

<script lang="ts">
import { reactive, ref } from '@vue/reactivity'
export default {
    setup(){
        // 使用 reactive() 函数定义响应式数据
        const count = ref(0)
        const obj = reactive({ count: 0 })

        
    }
};
</script>

