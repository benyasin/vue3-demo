<template>
    <h2>这是一个异步组件</h2>
</template>

<script>
    function sleep(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    export default {
        name: "AsyncComponent",
        props: {
            timeout: {
                type: Number,
                required: true
            }
        },
        async setup(props) {
            await sleep(props.timeout);
        }
    };
</script>