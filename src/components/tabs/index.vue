<template>
  <div class="wjTabs">
     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabArr" :key="item.id" :label="item.name" :name="item.id"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name:'tabs',
  data(){
    return{
      activeName:'1',
    }
  },
  props:{
    tabArr:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    handleClick(val){
      this.$emit('changeTab',val.index)
    }
  }
}
</script>
<style lang="scss" scoped>
  .wjTabs{
    /deep/ .el-tabs{
      .el-tabs__header{
        margin:0;
      }
      .el-tabs__nav-scroll{
        padding-left:0.3rem;
      }
      .el-tabs__item{
        font-weight: bold;
        height: 0.5rem;
        line-height: 0.5rem;
      }
    }
  }
</style>