<template>
  <div class="endFile">
    <ul class="listsOne">
      <li  v-for="item in tableList" :key="item.fileId">
        <img src="../../images/u157.png"/>
        <div class="itemCenter">
          <p class="item-c-top">{{item.chiName}}</p>
          <p class="item-c-foot">填写时间：{{item.createTime}}</p>
        </div>
        <div class="itemRight">
          <p @click="editValue(item)">修改内容</p>
          <p @click="downFileBtn(item.modelFile)">查看内容</p>
        </div>
      </li>
      <!-- <li>
        <img src="../../images/u157.png"/>
        <div class="itemCenter">
          <p class="item-c-top">清洁生产-企业分布</p>
          <p class="item-c-foot">填写时间：2021.03.22</p>
        </div>
        <div class="itemRight">
          <p>修改内容</p>
          <p>查看内容</p>
        </div>
      </li> -->
    </ul>

    <downDialog ref="downDialog" @downFileBtn="downFileBtn" @changefileList="changefileList"/>
  </div>
</template>
<script>
import downDialog from '../downDialog'
import {downloadFile,getFtpFileInfo} from '../../api'
import common from '@/utils/common'
import bus from '@/utils/bus'
import { mapState, mapMutations } from 'vuex'
export default {
  name:'waitFile',
  components:{downDialog},
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
    userId(){
      return sessionStorage.getItem('dj_userId')
    },
  },
  methods:{
    //修改内容
    editValue(val){
      this.$refs.downDialog.showDialogVisible(true,val);
    },

       //下载文件
    downFileBtn(){
      getFtpFileInfo({moduleId:this.moduleId,userId:this.userId}).then(res=>{
        console.log('下载文件',res)
        if(res.data.code==200){
          let data = res.data.data;
          downloadFile({filePath:data.filePath}).then(res=>{
            common.downFile(res);
          })
        }
      })
      
    },

    //上传文件成功后的处理
    changefileList(){
      bus.$emit('C_getfileList');
    },
  }
}
</script>
<style lang="scss" scoped>
   @import "./common.scss"; 
   .endFile{
     width: 100%;
     height: 100%;
   }
</style>