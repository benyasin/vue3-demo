<template>
    <h5>自定义事件的组件</h5>
    <button @click="handleClickEvent">点击事件1</button>
    <button @click="handleClickEvent2">点击事件2</button>
</template>
<script>
    export default {
        emits:['myEvent','myEvent2'],
        setup(props, ctx){
             function handleClickEvent() {
                console.log('child myEvent clicked!!!!')
                 ctx.emit('myEvent')
             }
            function handleClickEvent2() {
                console.log('child myEvent2 clicked!!!!')
                ctx.emit('myEvent2', 'message')
            }
             return {
                 handleClickEvent,
                 handleClickEvent2
             }
        }
    };
</script>