<template>
    <div>{{ readersNumber }} {{ book.title }}</div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    /**
     * 相当于vue2中的beforeCreate与created、在beforeCreate之后，created之前执行
     * @param props
     * @param ctx
     */
    setup(props, ctx) {
        const readersNumber = ref(0)
        const book = reactive({ title: 'Vue 3 Guide' })

        console.log(props)
        console.log(ctx)

        // expose to template
        return {
            readersNumber,
            book
        }
    }
}
</script>