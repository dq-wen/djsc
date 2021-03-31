<template>
  <div class="waitFile">
    <ul class="listsOne">
      <li v-for="item in tableList" :key="item.fileId">
        <img src="../../images/u157.png"/>
        <div class="itemCenter">
          <p class="item-c-top">{{item.chiName}}</p>
          <p class="item-c-foot" v-show="item.nextTime">剩余填写时间：{{item.nextTime}}天</p>
        </div>
        <div class="itemRight">
          <p @click="upload2(item.fillRelation)" v-if="item.fillRelation">上传模板</p>

          <uploadFileBtn 
            :action="api+'/ftp/upload-file'"
            :headers="{'X-Token':accessToken}"
            :data="{'moduleId':moduleId,'modelId':item.modelId}"
            :btnName="'上传模板'"
            @changefileList="changefileList"
            :status="0"
            :fileName="item.chiName"
            v-else
          />
          <p @click="downFileBtn(item.modelFile)">下载模板</p>
        </div>
      </li>
  </ul>
    <uploadDialog  ref="uploadDialog" :title="uploadDialogTitle" @downFileBtn="downFileBtn" @changefileList="changefileList"/>
  </div>
  
</template>
<script>
import {downloadFile} from '../../api'
import { mapState, mapMutations } from 'vuex'
import common from '@/utils/common'
import uploadDialog from '../uploadDialog'
import bus from '@/utils/bus'
import uploadFileBtn from '@/components/uploadFileBtn'
export default {
  name:'waitFile',
  components:{
    uploadDialog,
    uploadFileBtn,
  },
  data(){
    return{
      // uploadlists:{},
      api:process.env.VUE_APP_BASE_API,
      // getSelectionFile:[],
      uploadDialogTitle:'上传模板',
    }
  },
  props:{
    tableList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  computed:{
    ...mapState(["moduleId"]),
    accessToken(){
      return sessionStorage.getItem('djwjsc_token');
    },
    // userId(){
    //   return sessionStorage.getItem('dj_userId')
    // },
  },
  methods:{
    //下载模板
    downFileBtn(filePath){
      downloadFile({filePath:filePath}).then(res=>{
        common.downFile(res);
      })
    },

    changefileList(){
      bus.$emit('C_getfileList');
    },

    //上传模板弹窗
    upload2(fillRelation){
      this.$refs.uploadDialog.showDialogVisible(fillRelation)
    },
  }
}
</script>
<style lang="scss" scoped>
   @import "./common.scss"; 
   .waitFile{
     width: 100%;
     height: 100%;
   }
</style>