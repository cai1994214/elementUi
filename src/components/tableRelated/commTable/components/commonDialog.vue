<template>
  <el-dialog
    :title="DialogTitle"
    center
    destroy-on-close
    :close-on-click-modal="false"
    :before-close="handleClose"
    :visible.sync="visible"
  >
    <div class="content">
      <slot name="cont"></slot>
    </div>
    <slot name="footerBtn"></slot>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    DialogTitle: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose(){
      this.$emit('handleClose')
    }
  }
};
</script>
<style scoped>
</style>
