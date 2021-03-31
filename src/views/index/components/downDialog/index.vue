<template>
  <div class="uploadDialog">
    <!-- :title="title" -->
    <el-dialog
      width="20%"
      :visible.sync="uploadDialogVisible"
      center>
      <ul class="uploadDialogContent">
        <li>
          <img src="../../images/u157.png"/>
          <p class="title">{{itemList.fileName}}</p>
          <div class="downText" @click="downFileBtn(itemList.modelFile)">下载文件</div>
          <!-- <div class="saveText">上传文件</div> -->
          <uploadFileBtn 
            :action="api+'/ftp/upload-file'"
            :headers="{'X-Token':accessToken}"
            :data="{'moduleId':moduleId}"
            :btnName="'上传文件'"
            @changefileList="changefileList"
            class="uploadFileClass"
          />
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import uploadFileBtn from '@/components/uploadFileBtn'
export default {
  name:'uploadDialog',
  components:{uploadFileBtn},
  props:{
    title:{
      type:String,
      default(){
        return '提示'
      }
    }
  },
  computed:{
    ...mapState(["moduleId"]),
    accessToken(){
      return sessionStorage.getItem('djwjsc_token');
    },
  },
  data(){
    return{
      uploadDialogVisible:false,
      itemList:{},
      api:process.env.VUE_APP_BASE_API,
    }
  },
  methods:{
    //显示弹窗
    showDialogVisible(bool,val){
      this.uploadDialogVisible = bool;
      this.itemList = val;
    },

    //上传文件成功后的处理
    changefileList(){
      this.$emit('changefileList');
      this.uploadDialogVisible = false;
    },

    //下载文件
    downFileBtn(){
     this.$emit('downFileBtn')
    },

  }
}
</script>
<style lang="scss" scoped>
.uploadDialog{
  .uploadDialogContent{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    li{
      // width:30%;
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
      .downText{
        cursor: pointer;
        color:red;
        margin: 0.15rem 0;
        font-weight: bold;
        font-size: 0.12rem;
      }
      .uploadFileClass{
        /deep/ .el-button{
          span{
            color:blue;
          }
        }
      }
    }
  }
}

</style>