<template>
    <h2> Event </h2>
    <ul style="text-align: left; padding-left: 300px">
        <li>1.vue3新增emits选项，需要将组件发送的自定义事件定义在emits选项中</li>
        <li>2.setup的第二个参数，context.emit方法中，从第二参数往后，可以传递任意参数</li>
        <li>3.完全去除了$on、$off、$once三个event emitter实例方法</li>
        <li>4.实例event bus的方法推荐引入外部事件库，如 <a href="https://github.com/developit/mitt">mitt</a> or <a href="https://github.com/scottcorgan/tiny-emitter">tiny-emitter</a> </li>
    </ul>

    <custom-event @myEvent="handleMyEvent" @myEvent2="handleMyEvent2"/>
</template>

<script lang="ts">
import CustomEvent from '/@components/CustomEvent.vue'
export default {
    components: { CustomEvent },
    setup(){
        function handleMyEvent(){
            console.log('parent myEvent clicked!!!!!')
        }
        function handleMyEvent2(params){
            console.log('parent myEvent2 clicked!!!!!', params)
        }
        return {
            handleMyEvent,
            handleMyEvent2,
        }
    }
};
</script>

