<template>
    lifecycle
</template>

<script lang="ts">

    /**
     * 选项 API 生命周期选项和组合式 API 之间的映射

         beforeCreate -> use setup()

         created -> use setup()

         beforeMount -> onBeforeMount

         mounted -> onMounted

         beforeUpdate -> onBeforeUpdate

         updated -> onUpdated

         beforeUnmount -> onBeforeUnmount

         unmounted -> onUnmounted

         errorCaptured -> onErrorCaptured

         renderTracked -> onRenderTracked

         renderTriggered -> onRenderTriggered
     */
    import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue'

    export default {
        setup() {
            console.log('setup')

            onBeforeMount(() => {
                console.log('beforeMount!')
            })
            onBeforeUpdate(() => {
                console.log('beforeUpdate!')
            })
            onBeforeUnmount(() => {
                console.log('beforeUnmount!')
            })
            onMounted(() => {
                console.log('mounted!')
            })
            onUpdated(() => {
                console.log('updated!')
            })
            onUnmounted(() => {
                console.log('unmounted!')
            })
        }
    }
</script>

