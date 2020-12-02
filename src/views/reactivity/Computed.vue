<template>
    computed
</template>

<script lang="ts">
import { computed, ref } from '@vue/reactivity'
export default {
    setup(){
        const count = ref(1)

        // 使用 getter 函数，并为从 getter 返回的值返回一个不变的响应式 ref 对象
        const plusOne = computed(() => count.value + 1)

        console.log(plusOne.value) // 2

        plusOne.value++ // error


        // 它可以使用具有 get 和 set 函数的对象来创建可写的 ref 对象
        const plusOne2 = computed({
            get: () => count.value + 1,
            set: val => {
                count.value = val - 1
            }
        })

        plusOne2.value = 1
        console.log(count.value) // 0
    }
};
</script>

