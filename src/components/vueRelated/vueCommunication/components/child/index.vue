<template>
<div class="parent">
  父亲级别 : <strong>只用作中转</strong>
  {{booleanFn}}
  <son />
</div>
</template>

<script>
import Son from '../grandson/index.vue'
export default {
name: 'ProvideParent',
inject: ['nameObj', 'age', 'cityFn', 'boolean'],
computed: {
  booleanFn() {
    return this.boolean()
  }
},
components: { Son }
}
</script>

<style lang="scss" scoped>
.parent{
height:100px;
line-height: 100px;
border: 2px solid  #feafef;
padding:0 10px;
margin-top: 20px;
strong{
  font-size: 20px;
  text-decoration: underline;;
}

}
</style>
