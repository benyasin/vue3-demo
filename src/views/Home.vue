<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue-next.js App"/>
    </div>
</template>

<script lang="ts">
    import HelloWorld from "/@components/HelloWorld.vue";

    export default {
        name: "Home",
        components: {
            HelloWorld,
        },
    };
</script>
