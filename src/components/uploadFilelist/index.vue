<template>
  <div class="uploadFileList">
    <div class="uploadefile">
      <div class="top">
        <span class="title">所属模块</span>
        <el-select v-model="moduleId" @change="changeOption" placeholder="请选择">
          <el-option
            v-for="item in optionlist"
            :key="item.moduleId"
            :label="item.moduleName"
            :value="item.moduleId"
            >
          </el-option>
        </el-select>
        <el-button type="info" @click="getDownFile(moduleId)">模板下载</el-button>
      </div>

      <div class="formBox">
        <span class="title">更新频率</span>
        <!-- <el-form-item label="更新频率"> -->
          <el-select v-model="form.updateFrequency" clearable placeholder="请选择更新时间">
            <el-option v-for="(item,idx) in updateTimes" :key="idx" :label='item' :value='item'></el-option>
            <!-- <el-option :label='item' :value='item'></el-option> -->
          </el-select>
        <!-- </el-form-item> -->
      </div>

       <el-button type="primary" size="small" class="updateBtn" @click="updateStatus">更新填报状态</el-button>

        <!-- accept=".doc,.docx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png,.scv,.csv" -->
      <div class="botton">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="api+'/ftp/upload-file'"
          :on-preview="handlePreview"
          :on-success="uploadeSuccess"
          :on-error="uploadError"
          :show-file-list="false"
          :data="{'moduleId':moduleId,'updateFrequency':form.updateFrequency}"
          :headers="{'X-Token':accessToken}"
          multiple>
          <el-button class="uploadBtn" size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div class="listTitleBox scrollbar">
          <p v-for="item in uploadlists" :key="item.uid" class="filetitle">{{item.name}}</p>
        </div>
        
      </div>
      
    </div>
    <div class="filelist">
      <h3>上传文件列表</h3>
      <el-button type="danger" class="btnDel" @click="delFiles" icon="el-icon-delete" circle></el-button>
      <div class="list">
        <el-table
          :data="tableData"
          max-height="400"
          border
          style="width: 100%"
          @selection-change="selectionChange"
        >
            <el-table-column
              type="selection"
              align="center"
              width="45">
            </el-table-column>
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="45">
            </el-table-column>
            <el-table-column
              prop="moduleName"
              label="所属模块">
            </el-table-column>
            <el-table-column
              prop="fileName"
              label="文件名">
            </el-table-column>
            <el-table-column
              prop="filePath"
              label="上传目录">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="上传时间">
            </el-table-column>
            <el-table-column
              prop="fillStatus"
              width="100"
              label="状态">
              <template slot-scope="scope">
                <span>
                  {{scope.row.fillStatus==0?'未填报':scope.row.fillStatus==1?'已填报':''}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="updateFrequency"
              label="更新频率" >
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDown(scope.$index, scope.row)">
                  下载<i class="el-icon-download"></i>
                </el-button>
                <el-button
                  size="mini"
                  style="margin:10px 0 0"
                  @click="handleDel(scope.$index, scope.row)">
                  删除<i class="el-icon-delete"></i>
                </el-button>
            </template>
          </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { bus } from '../Bus/bus.js'
import { deleteFile,updateStatus} from './api'
export default {
  data() {
    return{
        // firstOption:'4',
        moduleId: '',
        uploadlists:{},
        api:process.env.VUE_APP_BASE_API,
        getSelectionFile:[],

        form:{
          updateFrequency:'每日',
        },
        updateTimes:['每日','每月','每年','每季'],
    }
  },
  props:{
    optionlist:{
      type:Array,
      required: true
    },
    tableData:{
      type:Array,
      required: true
    },
  },
  computed:{
    accessToken(){
      return sessionStorage.getItem('djwjsc_token');
    },
    
    firstOption(){
      this.moduleId = this.$store.state.firstOption
      return  this.moduleId
    }
  },
  watch:{
    firstOption(val){
      this.moduleId = val
    }
  },
  methods: {
    ...mapMutations([
      'USER_INFO',
      'SET_FIRSTOPTION'
    ]),

    //更新填报状态
    updateStatus(){
        this.$confirm('是否要更新全表填报信息，系统将会在每天0点自动更新，点击确定将会立即更新一次?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          updateStatus().then(res=>{
            if(res.data.code==200){
              this.$message({
                type: 'success',
                message: '更新成功!'
              });

              this.$emit('changefileList')
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消'
          // });
        });
    },

    getDownFile(moduleId){
      this.$emit('getDownFile',moduleId)
    },

    changeOption(res){
      console.log(res)
      this.SET_FIRSTOPTION(res);
      this.$refs.upload.clearFiles()
      this.uploadlists = [];
    },

    handlePreview(file) {
      // this.$refs.upload.clearFiles()
    },
    
    uploadeSuccess(res, file, fileList){
      console.log(res,fileList)
      if(res.code==200){
        this.uploadlists = fileList;
        this.$emit('changefileList')
        this.$message.success('文件上传成功！');
      }else{
        this.$message.warning(res.msg);
        this.$refs.upload.clearFiles()
      }
    },

    //上传失败
    uploadError(err, file, fileList){
      let result = JSON.parse(err.message);
      this.$message.warning(result.msg);
      this.$refs.upload.clearFiles()
    },

    //选中的文件
    selectionChange(val){
      this.getSelectionFile = val;
    },

    delFiles(){
      let selectionFileLength = this.getSelectionFile.length
      if(selectionFileLength<=0){
        this.$message.warning('您还未选择要删除的数据')
        return
      }

      let delFiles = [];
      delFiles = this.getSelectionFile.map(item=>{
       return item.filePath
      })
      console.log(delFiles)

      this.$confirm('您确认要删除所选的<span style="color:red">&nbsp;' + selectionFileLength + '&nbsp;</span>条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning',
        center: true
      }).then(() => {
        
        this.deleteFiles(delFiles);
        // deleteFile(delFiles).then(res=>{
        //   if(res.data.code==200){
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功!'
        //     });
        //     this.$refs.upload.clearFiles();
        //     this.uploadlists = [];
        //     this.$emit('changefileList');
        //   }
        // })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //删除文件
    deleteFiles(files){
      deleteFile(files).then(res=>{
        if(res.data.code==200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$refs.upload.clearFiles();
          this.uploadlists = [];
          this.$emit('changefileList');
        }
      })
    },

    //下载文件
    handleDown(idx,row){
      console.log(idx,row)
      this.$emit('downFileBtn',row.filePath);
    },

    //删除单个文件
    handleDel(idx,row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
          this.deleteFiles([row.filePath]);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style lang="scss">
.uploadFileList{
  width: 1000px;
  height: 100%;
  margin: 0 auto 10px;
  .uploadefile{
    position: relative;
    margin-top:50px;
    width: 100%;
    height: 300px;
    box-shadow: 0px 0px 10px 0px #aaa;
    // border: 1px solid red;
    .top{
      padding-top:20px;
      width: 100%;
      height: 50px;
      text-align: center;
      .title{
        margin-right: 20px;
      }
    }
    .formBox{
      position: absolute;
      left: 305px;
      top: 84px;
      z-index: 1;
      .title{
        margin-right: 20px;
      }
    }
    .botton{
      width: 33%;
      height: calc(100% - 50px);
      margin: auto;
      position: relative;
      .upload-demo{
        position: absolute;
        top: 15%;
        width: 100%;
        // transform: translate(0,-50%);
      }
      .uploadBtn{
        position: absolute;
        left: 80%;
        top: 10%;
        // transform: translate(-35%,-50%);
      }
      .listTitleBox{
        position: absolute;
        top: 35%;
        left: 33%;
        width: 100%;
        height: 130px;
        overflow: auto;
        .filetitle{
          margin:0;
          padding:5px 0;
        //   text-align: center;
        }
      }
      
    }

    .updateBtn{
      position: absolute;
      right: 202px;
      top: 90px;
    }
  }
  .filelist{
    width: 100%;
    margin-top:50px;
    padding-top: 1px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px #aaa;
    position: relative;
    // border: 1px solid #454545;
    h3{
      text-align: center;
    }
    .list{
      padding:0 10px 10px;
    }
    .btnDel{
      position: absolute;
      right:15px;
      top:10px;
    }
  }

  
  
}
</style>