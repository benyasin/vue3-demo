<template>
    <h3>Provide</h3>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.Provide/Inject 机制是用来爷孙组件数据传递的方案(中间无限级都可以)</li>
        <li>2.Provide 是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。在该对象中你可以使用 ES2015 Symbols 作为 key</li>
        <li>3.Inject 是一个字符串数组或一个对象</li>
        <li>4.可以通过将 ref 或 reactive 对象传递给 Provide 使得注入对象的属性具有响应式</li>
        <li>5.Provide/Inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中, 大型项目推荐使用vuex</li>
    </ul>

    <button @click="changeColor('black')">变成黑色</button>

    <Inject/>
</template>

<script lang="ts">
import { provide, ref } from 'vue'
import Inject from './Inject.vue'
export default {
    components: { Inject },
    setup(){
        const color = ref('red')

        // provide() 和 inject() 可以实现嵌套组件之间的数据传递。这两个函数只能在 setup() 函数中使用。
        // 父级组件中使用 provide() 函数向下传递数据；子级组件中使用 inject() 获取上层传递过来的数据。
        provide('themeColor', color)

        const changeColor = (val) => {
            color.value = val
        }

        return {
            color,
            changeColor
        }
    }
};
</script>

