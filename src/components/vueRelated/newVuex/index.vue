<template>
  <div>
      <Tab></Tab>
      <Page></Page>

    <PartOne/>
    <PartTwo/>
  </div>
</template>

<script>
import Tab from './components/Tab'
import Page from './components/Page'

import PartOne from './components/Part3'
import PartTwo from './components/Part3/index2.vue'
export default {
    name:'Nvue',
    components:{Tab,Page,PartOne,PartTwo},
    props:{},
    data(){
        return {
        }
    },
    watch:{},
    computed:{},
    methods:{
    },
    created(){},
    mounted(){}
}
</script>
<style  scoped>

</style>