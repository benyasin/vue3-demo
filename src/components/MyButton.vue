<template>
    <button :disabled="disabled" class="btn-child" @click="handleClick">{{text}}</button>
</template>

<script>
    export default {
        name: 'MyButton',
        props: {
            text: String,
            disabled: {
                type: Boolean,
                default: false
            },
        },
        setup(props, ctx) {
            const {disabled} = props
            const {emit} = ctx
            // 将点击事件 emit 给父组件
            const handleClick = () => {
                !disabled && emit('onClick')
            }
            return {
                handleClick
            }
        }
    }
</script>

<style lang="scss">
    .btn-child {
        margin-top: 30px;
        padding: 3px 10px;
        border: 1px solid #bfbfbf;
        border-radius: 5px;
        cursor: pointer;
        outline: none;

        &:active, &:focus {
            border: 1px solid #00a073;
        }
    }
</style>
