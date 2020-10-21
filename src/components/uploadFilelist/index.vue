<template>
  <div class="bg">
    <div class="index">
      <div class="uploadefile">
        <div class="top">
          <span class="title">所属模块</span>
          <el-select v-model="moduleId" placeholder="请选择">
            <el-option
              v-for="item in optionlist"
              :key="item.moduleId"
              :label="item.moduleName"
              :value="item.moduleId"
              >
            </el-option>
          </el-select>
        </div>

        <div class="botton">
          <el-upload
            class="upload-demo"
            ref=“upload”
            action="api/ftp/upload-file"
            :on-preview="handlePreview"
            :on-success="uploadeSuccess"
            :show-file-list="false"
            :data="{'moduleId':moduleId}"
            :headers="{'X-Token':accessToken}"
            multiple>
            <el-button class="uploadBtn" size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="listTitleBox">
            <p v-for="item in uploadlists" :key="item.uid" class="filetitle">{{item.name}}</p>
          </div>
          
        </div>
        
      </div>
      <div class="filelist">
        <h3>上传文件列表</h3>
        <div class="list">
            <el-table
              :data="tableData"
              max-height="600"
              border
              style="width: 100%">
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
            </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { bus } from '../Bus/bus.js'
export default {
  data() {
    return{
        // firstOption:'4',
        moduleId: '',
        filelist: '',
        uploadlists:{}
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
      return  this.$store.state.firstOption
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

    // changeOption(res){
    //   // console.log(res)
    //   this.SET_FIRSTOPTION(res)
    // },

    handlePreview(file) {
      this.$refs.upload.clearFiles()
    },

    uploadeSuccess(response, file, fileList){
      console.log(fileList)
      this.uploadlists = fileList
      this.filelist = file.name;
      // bus.$emit('refresh','更新数据')
      this.$emit('changefileList')
    },
  }
}
</script>

<style lang="scss">
.index{
  width: 1000px;
  height: 100%;
  margin: 0 auto 20px;
  .uploadefile{
    margin-top:50px;
    width: 100%;
    height: 300px;
    box-shadow: 0px 0px 10px 0px #aaa;
    // border: 1px solid red;
    .top{
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      .title{
        margin-right: 100px;
      }
    }
    .botton{
      width: 33%;
      height: calc(100% - 50px);
      margin: auto;
      position: relative;
      .upload-demo{
        position: absolute;
        top: 30%;
        width: 100%;
        // transform: translate(0,-50%);
      }
      .uploadBtn{
        position: absolute;
        left: 50%;
        top: 10%;
        transform: translate(-35%,-50%);
      }
      .listTitleBox{
        position: absolute;
        top: 40%;
        width: 100%;
        height: 130px;
        overflow: auto;
        .filetitle{
          text-align: center;
        }
      }
      
    }
  }
  .filelist{
    width: 100%;
    margin-top:50px;
    padding-top: 1px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px #aaa;
    // border: 1px solid #454545;
    h3{
      text-align: center;
    }
  }
  
}
</style>