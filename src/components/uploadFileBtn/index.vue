<template>
  <div class="uploadFileBtn">
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="action"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-success="uploadeSuccess"
      :on-error="uploadError"
      :show-file-list="false"
      :data="data"
      :headers="headers"
      :multiple='multiple'>
      <el-button class="uploadBtn" size="small" type="primary">{{btnName}}</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  name:'uploadFileBtn',
  props:{
    action:{
      type:String,
      default(){
        return ''
      }
    },
    data:{
      type:Object,
      default(){
        return{}
      }
    },
    headers:{
      type:Object,
      default(){
        return {}
      }
    },

    multiple:{
      type:Boolean,
      default(){
        return false
      }
    },

    btnName:{
      type:String,
      default(){
        return '上传'
      }
    },
    status:{//判断是否未填报上传还是已填好上传
      type:Number | String,
      default(){
        return 1
      }
    },
    fileName:{ //文件名称
      type:String,
      default(){
        return ''
      }
    }
  },
  mounted(){
  },
  methods:{
    handlePreview(file) {
      // this.$refs.upload.clearFiles()
    },

    //上传文件前
    beforeUpload(file){
      let idx = file.name.lastIndexOf(".")//获取最后一个.的位置
      let getFileName = file.name.slice(0,idx); //获取文件名称
      if(getFileName.trim()!=this.fileName.trim()){
        this.$message.warning('上传文件名称不对');
        return false
      }
      if(this.status==1){
         return new Promise((resolve,reject)=>{
          this.$confirm('此操作将覆盖该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            resolve(true)
          }).catch(() => {
            reject(false)
          });
        })
      }
     
    },
    
    //上传成功
    uploadeSuccess(res, file, fileList){
      console.log(res,fileList)
      if(res.code==200){
        // this.uploadlists = fileList

        this.$emit('changefileList');
        this.$message.success('文件上传成功！');
      }else{
        this.$message.warning(res.msg);
        // this.$refs.upload.clearFiles()
      }
    },

    //上传失败
    uploadError(err, file, fileList){
      let result = JSON.parse(err.message);
      this.$message.warning(result.msg);
      // this.$refs.upload.clearFiles()
    },
  },

}
</script>
<style lang="scss" scoped>
.uploadFileBtn{
  .upload-demo{
    /deep/ .el-button--primary{
      background: none;
      border: none;
      span{
        color:red;
        font-weight: bold;
      }
    }
  }
}
</style>