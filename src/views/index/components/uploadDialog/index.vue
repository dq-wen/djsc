<template>
  <div class="uploadDialog">
    <!-- :title="title" -->
    <el-dialog
      width="30%"
      :visible.sync="uploadDialogVisible"
      center>
      <ul class="uploadDialogContent">
        <li>
          <img src="../../images/u157.png"/>
          <p class="title">工业节能-能源“双控”考核</p>
          <div class="downText">下载模板</div>
          <div class="saveText">保存模板</div>
        </li>
        <li>
          <img src="../../images/u157.png"/>
          <p class="title">工业节能-工业节能技术创办-广东省</p>
          <div class="downText">下载模板</div>
          <div class="saveText">已保存</div>
        </li>
        <li>
          <img src="../../images/u157.png"/>
          <p class="title">防疫物资生产-广州市防疫物资生产保障情况表</p>
          <div class="downText">下载模板</div>
           <div class="saveText">保存模板</div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="uploadDialogVisible=false">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'uploadDialog',
  props:{
    title:{
      type:String,
      default(){
        return '提示'
      }
    }
  },
  data(){
    return{
      uploadDialogVisible:false
    }
  },
  methods:{
    //显示弹窗
    showDialogVisible(bool){
      this.uploadDialogVisible = bool;
    },

    //提交
    gitOVer(){
    },
  }
}
</script>
<style lang="scss" scoped>
.uploadDialog{
  .uploadDialogContent{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    li{
      width:30%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img{
        width: 0.4rem;
        height: 0.4rem;
      }
      img,.title{
        margin-bottom: 0.1rem;
      }
      .downText,.saveText{
        cursor: pointer;
      }
      .downText{
        color:red;
        margin-bottom: 0.15rem;
      }
      .saveText{
        color:blue;
      }
    }
  }
}

</style>