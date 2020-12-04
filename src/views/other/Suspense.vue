<template>
    <Suspense>
        <template #default>
            <AsyncComponent :timeout="3000" />
        </template>
        <template #fallback>
            <h2>加载中...</h2>
        </template>
    </Suspense>
</template>

<script>
    import AsyncComponent from '/@components/AsyncComponent.vue'
    export default {
        components:{
            AsyncComponent
        }
    }
</script>