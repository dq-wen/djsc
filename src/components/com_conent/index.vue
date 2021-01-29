<template>
  <div class="com_conent">
    <uploadefilelist 
      :optionlist="options" 
      :tableData="filelist"
      @getDownFile="getDownFile" 
      @changefileList="changefileList">
    </uploadefilelist>
    <el-dialog
      title="模板下载列表"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <ul class="downFileList">
        <li v-for="item in downFileData" :key="item.modelFile">
          <a  @click="downFileBtn(item.modelFile)">{{item.chiName}}</a>
        </li>
      </ul>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import { getfilelist , moduleList,downModelList,downloadFile} from './api'
import uploadefilelist from '../uploadFilelist'
import { mapState, mapMutations } from "vuex";
export default {
  name:'com_conent',
  components:{
    uploadefilelist
  },
  data() {
    return{
      options: [],
      filelist: [],
      dialogVisible:false,
      downFileData:[],
    }
  },
  computed:{
    userId(){
      return sessionStorage.getItem('dj_userId')
    },
    routerId(){
      return this.$store.state.routerId
    },

    titleName(){
      return this.$store.state.titleName
    },

  },
  mounted(){
    this.getListData()
  },
  methods:{
     ...mapMutations([
      "SET_FIRSTOPTION"
    ]),

    //下载
    downFileBtn(modelFile){
      downloadFile({filePath:modelFile}).then(res=>{
        if(res.type=='application/json'){
          let reader = new FileReader();
          reader.onload =e =>{
            let err = JSON.parse(e.target.result);
            this.$Modal.error({
                title: '错误提示:',
                content: err.message
            });
          }
          reader.readAsText(res)
        }else{
          this.content = res.data;
          const filename = res.filename.split(';')[1].split('=')[1];
          this.filename = decodeURI(filename)
          const blob = new Blob([this.content])
          if (window.navigator.msSaveOrOpenBlob) {
            // 兼容IE10
            navigator.msSaveBlob(blob, this.filename)
          } else {
            //  chrome/firefox
            const aTag = document.createElement('a')
            aTag.download = JSON.parse(this.filename);
            aTag.href = URL.createObjectURL(blob)
            aTag.click()
            URL.revokeObjectURL(aTag.href)
          }
        }
      })
    },

    //得到下载模板
    getDownFile(moduleId){
      downModelList({userId:this.userId,moduleId:moduleId}).then(res=>{
        if(res.data.code ==200){
          this.downFileData = res.data.data || [];
          // this.downFileData.forEach(item=>{
          //   item['name'] = item.modelFile.split('/').pop().toLowerCase();
          // })
          console.log(this.downFileData)
          if(this.downFileData&&this.downFileData.length>=1){
            this.dialogVisible = true;
          }else{
            this.$message.warning('暂无模板下载');
          }
          
        }
        
      })
    },

    changefileList(){
      this.getfilelist({userId:this.userId})
    },

    getListData(){
       let params = {
        userId:this.userId
      }

      //获取所属模块
      moduleList(params).then(res=>{
        if(res.data.code==200){
          let getData = res.data.data;
          this.options = this.getDatafilter(this.titleName,getData,);
          this.SET_FIRSTOPTION(this.options[0].moduleId)
        }
      })

      this.getfilelist(params);
    },

    //获取上传列表
    getfilelist(params){
      getfilelist(params).then(res => {
        let getListData = res.data.data;
        this.filelist = this.getDatafilter(this.titleName,getListData)

      })
    },

    //数据筛选
    getDatafilter(titleName,data){
      let finalyData = [];
      if(this.userId == process.env.VUE_APP_ADMIN_ID){
        finalyData = data.filter(item=>item.plateName == titleName);
      }else{
        finalyData = data;
      }
      return  finalyData;
      // let finalyData = []
      // switch(routerId){
      //   case 2:
      //     finalyData = data.filter(item=>item.moduleId==2)
      //     break
      //   case 3:
      //     finalyData = data.filter(item=>item.moduleId==18)
      //     break
      //   case 5:
      //     finalyData = data.filter(item=>item.moduleId==12)
      //     break
      //   case 9:
      //     finalyData = data.filter(item=>item.moduleId==17)
      //     break
      //   case 10:
      //     finalyData = data.filter(item=>item.moduleId==11 || item.moduleId==20 || item.moduleId==21 || item.moduleId==22)
      //     break
      //   case 11:
      //     finalyData = data.filter(item=>item.moduleId==14)
      //     break
      //   case 12:
      //     finalyData = data.filter(item=>item.moduleId==16)
      //     break
      //   case 13:
      //     finalyData = data.filter(item=>item.moduleId==4 || item.moduleId==5 || item.moduleId==6 || item.moduleId==7 || item.moduleId==8 || item.moduleId==9)
      //     break
      //   case 14:
      //     finalyData = data.filter(item=>item.moduleId==1)
      //     break
      //   case 15:
      //     finalyData = data.filter(item=>item.moduleId==15)
      //     break
      //   case 16:
      //     finalyData = data.filter(item=>item.moduleId==3)
      //     break
      //   case 17:
      //     finalyData = data.filter(item=>item.moduleId==13)
      //     break
      //   case 18:
      //     finalyData = data.filter(item=>item.moduleId==10)
      //     break
      //   default:
      //     finalyData = data
      // }
      // return finalyData
    }
  }
}
</script>
<style lang="scss" scoped>
  .com_conent{
    ul,ol{
      list-style:none;
      padding:0;
      margin:0;
    }

    .downFileList{
      li{
        text-align: center;
        line-height:30px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        a{
          text-decoration: underline;
          color:#409EFF;
        }
        a:hover{
          color:red;
        }
      }
    }
  }
 
</style>