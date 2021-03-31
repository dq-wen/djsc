<template>
  <div class="uploadDialog">
    <!-- :title="title" -->
    <el-dialog
      width="30%"
      :visible.sync="uploadDialogVisible"
      center>
      <ul class="uploadDialogContent">
        <li v-for="(item,idx) in lists" :key="idx">
          <img src="../../images/u157.png"/>
          <p class="title">{{item.chiName}}</p>
          <div class="downText" v-if="item.fillStatus==1" @click="saveDownFileBtn()">下载模板</div>
          <div class="downText" v-else @click="downFileBtn(item.modelFile)">下载模板</div>
          <div class="saveText s_active" v-if="item.fillStatus==1">已保存</div>
          <div class="saveText" v-else>
           <uploadFileBtn 
            :action="api+'/ftp/upload-file'"
            :headers="{'X-Token':accessToken}"
            :data="{'moduleId':moduleId}"
            :btnName="'保存模板'"
            @changefileList="changefileList"
          />
          </div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="submit" :disabled="btnDisable>=0?true:false">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import uploadFileBtn from '@/components/uploadFileBtn'
import {fileListRelation,getFtpFileInfo} from '../../api'
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
    userId(){
      return sessionStorage.getItem('dj_userId')
    },
  },
  data(){
    return{
      uploadDialogVisible:false,
      lists:[],
      api:process.env.VUE_APP_BASE_API,
      fillRelation:'',//用于刷新弹窗内容
      btnDisable:'',
    }
  },
  methods:{
    //未保存下载模板
    downFileBtn(path){
      this.$emit('downFileBtn',path);
    },

    //已保存下载模板
    saveDownFileBtn(){
      getFtpFileInfo({moduleId:this.moduleId,userId:this.userId}).then(res=>{
        if(res.data.code==200){
          let data = res.data.data;
           this.$emit('downFileBtn',data.filePath);
        }
      })
    },

    //保存模板成功后处理
    changefileList(){
      this.getDialogContent(this.fillRelation);
    },

    //获取弹窗内容
    getDialogContent(fillRelation){
      fileListRelation({fillRelation:fillRelation,userId:this.userId}).then(res=>{
        console.log('关联多张表格数据',res)
        if(res.data.code ==200){
          this.lists = res.data.data;
          this.uploadDialogVisible = true;
          this.btnDisable = this.lists.findIndex(item=>item.fillStatus==0);//存在未保存文件，提交按钮不能点击
        }
      })
    },

    //显示弹窗
    showDialogVisible(fillRelation){
      this.fillRelation = fillRelation;
      this.getDialogContent(this.fillRelation);
      // this.uploadDialogVisible = bool;
      // this.lists = data;
    },

    //提交
    submit(){
      this.uploadDialogVisible = false;
      this.$emit('changefileList');//刷新列表
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
      }
      .saveText{
        /deep/ .uploadFileBtn{
          span{
            color:blue;
          }
        }
      }
      .s_active{
        margin-top:0.1rem;
        color:#999;
      }
    }
  }
}

</style>