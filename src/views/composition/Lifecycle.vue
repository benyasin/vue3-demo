<template>
    <h2> Lifecycle </h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.选项 API 生命周期选项和组合式 API 之间的映射</li>
        <li>&nbsp;&nbsp; beforeCreate -> use setup()</li>
        <li>&nbsp;&nbsp; created -> use setup()</li>
        <li>&nbsp;&nbsp; beforeMount -> onBeforeMount</li>
        <li>&nbsp;&nbsp; mounted -> onMounted</li>
        <li>&nbsp;&nbsp; beforeUpdate -> onBeforeUpdate</li>
        <li>&nbsp;&nbsp; updated -> onUpdated</li>
        <li>&nbsp;&nbsp; beforeUnmount -> onBeforeUnmount</li>
        <li>&nbsp;&nbsp; unmounted -> onUnmounted</li>
        <li>&nbsp;&nbsp; errorCaptured -> onErrorCaptured</li>
        <li>&nbsp;&nbsp; renderTracked -> onRenderTracked</li>
        <li>&nbsp;&nbsp; renderTriggered -> onRenderTriggered</li>
    </ul>
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

