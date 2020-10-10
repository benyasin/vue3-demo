<template>
    <div class="title">这是一个计数器</div>

    <div class="counter">原值: <span class="red">{{count}}</span></div>
    <div class="counter">原值的10倍: <span class="red">{{count10}}</span></div>

    <button class="btn-add" @click="countAdd">{{btnText}}</button>
</template>

<script lang="ts">
    import {ref, computed} from 'vue'

    export default {
        setup() {
            const count = ref(0)
            const btnText = ref("点击增加count值")

            const countAdd = () => {
                count.value++;
            }

            const count10 = computed(() => {
                return count.value * 10
            })

            return {
                count,
                count10,
                btnText,
                countAdd
            }
        }
    }

</script>
<style lang="scss">
    .title {
        font-size: 24px;
        font-weight: bold;
    }

    .counter {
        text-align: right;
        padding-right: 40%;
    }

    .red {
        color: red;
        margin: 0 20px;
        font-size: 20px;
    }

    .btn-add {
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
