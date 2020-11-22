<template>
  <div>
      <header>
        <div  class="metal-parts-left" style="left: 176px;"></div>
        <div  class="metal-parts-right"></div>
        <div  class="metal-parts-bottom"></div>
        <div  class="metal-parts-line" style="width: calc(100% - 1112px);"></div>
    </header>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  methods:{},
  mounted(){}
}
</script>
<style>
    header{
        position: relative;
        height: 62px;
        padding: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        background-color: #0e1a31;
        background: url(./../assets/image/header-top.png) no-repeat top left;
    }
    .metal-parts-left{
        position: absolute;
        left: 176px;
        top: 43px;
        width: 480px;
        height: 23px;
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
        background-image: url(./../assets/image/header-left.png);
        z-index: 100;
    }
    .metal-parts-right{
        position: absolute;
        right: 0;
        top: 0;
        width: 56px;
        height: 66px;
        background-image: url(./../assets/image/header-right.png);
        background-position: 56px 0px;
        z-index: 100;
    }
    .metal-parts-bottom{
        position: absolute;
        right: 0;
        bottom: -4px;
        width: 456px;
        height: 20px;
        background-image: url(./../assets/image/header-right.png);
        background-position: 456px 20px;
        z-index: 100;
    }
     .metal-parts-line{
        position: absolute;
        right: 456px;
        bottom: -4px;
        height: 8px;
        width: calc(100% - 1112px);
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
        background-image: url(./../assets/image/header-border.png);
        z-index: 100;
     }
</style>