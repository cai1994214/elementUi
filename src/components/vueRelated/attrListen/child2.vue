<template>
<div class=''>
    <div class="child-2">
    <p>in child->child2:</p>
    <p>props: {{pChild2}}</p>
    <p>$attrs: {{this.$attrs}}</p>
        <button @click="$emit('test2','按钮点击')">触发事件</button>
    <hr> 
    </div>
</div>
</template>

<script>

export default {
components: {},
data() {
return {

};
},
props:["pChild2"],
methods: {

},
created() {

},
mounted() {
    this.$emit("test1");
    console.log(this.$attrs);
},
}
</script>
<style scoped>
</style>