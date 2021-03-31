<template>
  <div class="uploadDialog">
    <!-- :title="title" -->
    <el-dialog
      width="30%"
      :visible.sync="uploadDialogVisible"
      :show-close="false"
      :close-on-click-modal='false'
      center>
      <ul class="uploadDialogContent">
        <li v-for="(item,idx) in lists" :key="idx">
          <img src="../../images/u157.png"/>
          <p class="title">{{item.chiName}}</p>
          <div class="downText" v-if="item.fillStatus==1" @click="saveDownFileBtn(item.modelId,item.moduleId)">下载模板</div>
          <div class="downText" v-else @click="downFileBtn(item.modelFile)">下载模板</div>
          <div class="saveText s_active" v-if="item.fillStatus==1">已保存</div>
          <div class="saveText" v-else>
           <uploadFileBtn 
            :action="api+'/ftp/upload-file'"
            :headers="{'X-Token':accessToken}"
            :data="{'moduleId':item.moduleId,'modelId':item.modelId}"
            :btnName="'保存模板'"
            :status="0"
            :fileName="item.chiName"
            @changefileList="changefileList"
          />
            <!-- <p class="saveTemplate">保存模板</p>
            <input class="uploadFile" type="file" @change="uploadFile($event,item.chiName)"/> -->
          </div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="uploadDialogVisible=false">取 消</el-button> -->
        <el-button type="primary" @click="submit" :disabled="btnDisable>=0?true:false">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import uploadFileBtn from '@/components/uploadFileBtn'
import {fileListRelation,getFtpFileInfo} from '../../api'
import axios from '@/axios'
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

      formData:'',
    }
  },
  methods:{
    uploadFile(e,name){
      let file = e.target.files[0];

      let idx = file.name.lastIndexOf(".")//获取最后一个.的位置
      let getFileName = file.name.slice(0,idx); //获取文件名称
      if(name.trim() != getFileName.trim()){//清空前后空格
        this.$message.warning('上传文件名称不对');
        return false
      }
      let formData = new FormData();
      formData.append('file',file)
      formData.append('moduleId',this.moduleId)
      
      // this.formData = formData;
      // axios({
      //   method: "post",
      //   url: this.api + '/ftp/upload-file',
      //   data:this.formData,
      //   headers:`{X-Token:${this.accessToken},'Content-Type': 'multipart/form-data'}`
      // }).then(rs => {
      //   console.log(rs)
      // })
      // console.log(formData)
    },
    //未保存下载模板
    downFileBtn(path){
      this.$emit('downFileBtn',path);
    },

    //已保存下载模板
    saveDownFileBtn(modelId,moduleId){
      getFtpFileInfo({modelId:modelId,moduleId:moduleId,userId:this.userId}).then(res=>{
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
        margin-top:0.1rem;
        position: relative;
        .uploadFile{
          width: 0.8rem;
          opacity: 0;
          z-index: 100;
          padding:0 0.2rem;
        }
        .uploadFile:hover{
          cursor: pointer;
        }
        .saveTemplate{
          color:blue;
          position: absolute;
          padding-top:0.03rem;
          top: 0;
          left:0.15rem;
        }
        .saveTemplate:hover{
          cursor: pointer;
        }
      }
      .s_active{
        color:#999;
      }
    }
  }
}

</style>