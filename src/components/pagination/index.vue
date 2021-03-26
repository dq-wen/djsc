<template>
  <div class="pagination">
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageType.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageType.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name:'pagination',
  props:{
    // currentPage:{
    //   type:Number | String,
    //   default(){
    //     return 1
    //   }
    // },
    // pageSize:{
    //   type:Number | String,
    //   default(){
    //     return 10
    //   }
    // },
    pageType:{
      type:Object,
      default(){
        return{}
      },
    },
    total:{
      type:Number | String,
      default(){
        return 0
      }
    },
  },
  methods:{
    //每页数
    handleSizeChange(val){
      this.pageType.pageSize = val;
      this.$emit('handleSizeChange')
    },

    //第几页
    handleCurrentChange(val){
      this.pageType.pageNum = val;
      this.$emit('handleCurrentChange')
    },

  }
}
</script>
<style lang="scss" scoped>
  .pagination{
    text-align: right;
    margin-top: 0.2rem;
    // /deep/ .el-pagination{
    //   .el-pagination__total{
    //     font-size: 0.036rem;
    //     color: #ccc;
    //     font-weight: bold;
    //   }
    //   .btn-prev,.btn-next{
    //     background: #192a3f;
    //     color:#fff;
    //   }
    //   .btn-prev.active,.btn-next.active{
    //      color:#409EFF;
    //   }
    //   .btn-prev:hover,.btn-next:hover{
    //      color:#409EFF;
    //   }

    //   .el-pager{
    //     li{
    //       background: #192a3f;
    //       color:#fff;
    //     }
    //     li.btn-quickprev{
    //       color:#fff;
    //     }
    //     li.active{
    //       color:#409EFF;
    //     }
    //     li:hover{
    //       color:#409EFF;
    //     }
    //     .number{
    //       font-size: 0.036rem;
    //     }
    //   }
    // } 
  }
</style>