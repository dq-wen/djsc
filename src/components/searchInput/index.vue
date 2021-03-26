<template>
  <div class="inputSearchCarNum" :style="{width:searchWidth,float:searchfloatRight}">
    <el-form @submit.native.prevent>
      <el-input
          v-model.trim="searchCarNum"
          @keyup.enter.native="searchCarBtn(searchCarNum)"
          :placeholder="placeholderName"
        >
          <i
            @click="searchCarBtn(searchCarNum)"
            slot="suffix"
            class="el-input__icon el-icon-search"
            v-loading="searchCarLoading"
          ></i>
        </el-input>
      </el-form>
  </div>
</template>
<script>
export default {
  name:'inputSearchCarNum',
  data(){
    return{
      searchCarNum:'',
      searchCarLoading:false,
    }
  },
  props:{
    searchWidth:{
      type:String,
      default(){
        return ''
      }
    },
    searchfloatRight:{
      type:String,
      default(){
        return ''
      }
    },
    placeholderName:{
      type:String,
      default(){
        return '请输入查询内容'
      }
    }

  },
  methods:{
    searchCarBtn(val){
      // this.searchCarLoading = true;
      this.$emit('searchInputVal',val)
    },

    closeSearchLoading(boolean){
      this.searchCarLoading = boolean;
    }
  },
}
</script>
<style lang="scss" scoped>
   .inputSearchCarNum{
      // width: 0.58rem;
      // float:right;
      /deep/ .el-input__inner {
        border-radius: 0.05rem;
        border: 0 none;
        background: rgba(2, 15, 43, 0.1);
        color: #999;
        display: inline-block;
        height: 0.3rem;
        line-height: 0.3rem;
        outline: 0;
        padding: 0.012rem 0.05rem;
        width: 100%;
      }
      /deep/ .el-input__icon{
        line-height: 0px;
      }
    }
</style>