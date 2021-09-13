<template>
<div class=''>
    <label >
        {{label}}-
        {{$attrs.placeholder}}-
        <input v-bind="$attrs"/>
    </label>
</div>
</template>

<script>

export default {
components: {},
data() {
return {

};
},
props:["label"],
methods: {

},
created() {

},
mounted() {
    // attrs 除了props class style 的属性都会传入子集
    console.log(this.$attrs)
},
}
</script>
<style scoped>
</style>