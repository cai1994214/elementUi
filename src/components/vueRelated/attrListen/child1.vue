<template>
  <div class="">
    <div class="child-1">
      <p>in child1:</p>
      <p>props: {{ pChild1 }}</p>
      <p>$attrs: {{ this.$attrs }}</p>
      <hr />
      <child2 v-bind="$attrs" v-on="$listeners"></child2>
    </div>
  </div>
</template>

<script>
import child2 from "./child2.vue";
export default {
  components: { child2 },
  data() {
    return {};
  },
  props: ["pChild1"],
  methods: {},
  created() {},
  mounted() {
    // this.$emit("test1");
  },
};
</script>
<style scoped>
</style>
