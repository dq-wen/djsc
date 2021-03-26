<template>
  <div class="index">
    <!-- <comConent></comConent> -->
    <indexTop/>
    <indexContent/>
  </div>
</template>

<script>
import indexTop from './components/indexTop'
import indexContent from './components/indexContent'
export default {
  components:{indexTop,indexContent},
  data() {
    return{
    }
  },
  mounted(){
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .index{
    // height:calc(100% - 0.05rem);
    height: 100%;
    // padding-top:0.5rem;
    border-top: 1px solid #ccc;
    background: #ccc;
  }
</style>
