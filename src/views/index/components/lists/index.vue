<template>
  <div class="lists">
    <div class="nullTableList" v-if="tableList&&tableList.length<=0">
      暂无数据
    </div>
    <waitFile v-show="activeName==0" :tableList="tableList"/>
    <endFile v-show="activeName==1" :tableList="tableList"/>
  </div>
</template>
<script>
  import waitFile from '../listsContent/waitFile';
  import endFile from '../listsContent/endFile'
  export default {
    name:'lists',
    components:{
      waitFile,
      endFile
    },
    props:{
      activeName:{
        type:Number | String,
        default(){
          return 0
        }
      },
      tableList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
    }
  }
</script>
<style lang="scss" scoped>
  .lists{
    width:100%;
    height:100%;
    .nullTableList{
      color:#ccc;
      text-align: center;
      line-height: 4rem;
    }
  }
</style>