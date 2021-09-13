<template>
<div class=''>
    <!-- attrs 传值 -->
    <base-input
        label="姓名"
        class="name-input"
        placeholder="请输入姓名"
        test-attrs="$attrs"
    ></base-input>
    <!-- listeners -->
    <child1
    :p-child1="child1"
    :p-child2="child2"
    :p-child-attrs="1234"
    v-on:test1="onTest1"
    v-on:test2="onTest2"
    ></child1>
</div>
</template>

<script>
import BaseInput from './baseInput.vue'
import child1 from './child1.vue'
export default {
components: {BaseInput, child1},
data() {
return {
    child1: "pChild1的值",
    child2: "pChild2的值"
};
},
methods: {
    onTest1() {
        console.log('test1 runing .....');
    },
    onTest2(val) {
        console.log('test2 runing ....' +val);
    }
},
created() {

},
mounted() {
    
},
}
</script>
<style scoped>
</style>