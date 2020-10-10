<template>
    <div class="home">
        <div>计数器: <span class="red">{{count}}</span></div>

        <button class="btn-add" @click="countAdd">{{btnText}}</button>
    </div>
</template>

<script lang="ts">
    import {ref} from 'vue'

    export default {
        setup() {
            const count = ref(0)
            const btnText = ref("点击增加count值")

            const countAdd = () => {
                count.value++;
            }

            return {
                count,
                btnText,
                countAdd
            }
        }
    }

</script>
<style lang="scss">
    .home {
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
    }
</style>
