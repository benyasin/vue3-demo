<template>
    <button @click="isOpen = true">打开</button>

    <Teleport to="body">
        <div class="confirm-modal" v-if="isOpen">
            <p>Modal内容</p>
            <button @click="isOpen = false">关闭</button>
        </div>
    </Teleport>
</template>

<script>
    import {ref} from 'vue'
    export default {
        setup(){
            const isOpen = ref(false)
            return {isOpen}
        }
    }
</script>

<style>
    .confirm-modal{
        border: 1px solid #d3d3d3;
        border-radius: 5px;
        padding: 15px;
        text-align: center;
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
</style>