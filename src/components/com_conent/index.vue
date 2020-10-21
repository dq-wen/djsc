<template>
  <div class="com_conent">
    <uploadefilelist 
      :optionlist="options" 
      :tableData="filelist" 
      :refreshFilelist="refreshFilelist" 
      @changefileList="changefileList">
    </uploadefilelist>
  </div>
</template>
<script>
import { getfilelist , moduleList} from './api'
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
      filelist: [{
        moduleName:'',
        fileName: '2016-05-03',
        filePath: '王小虎123123123',
        createTime: '上海市普陀区金沙江路 1518 弄'
      }],
      refreshFilelist:'index2'
    }
  },
  props:['routerPath'],
  computed:{
    userId(){
      return sessionStorage.getItem('dj_userId')
    },
    routerId(){
      return this.$store.state.routerId
    }
  },
  mounted(){
    this.getListData()
  },
  methods:{
    changefileList(){

    },

    getListData(){
       let params = {
        userId:this.userId
      }

      //获取所属模块
      moduleList(params).then(res=>{
        if(res.data.code==200){
          console.log(res.data.data)
          let getData = res.data.data;
          switch(this.routerId){
            case 10:
              this.options = getData.filter(item=>item.moduleId==11)
              break
            case 13:
              this.options = getData.filter(item=>item.moduleId==4 || item.moduleId==5 || item.moduleId==6 || item.moduleId==7 || item.moduleId==8 || item.moduleId==9)
              break
            default:
              this.options = getData
          }
          
        }
      })

      //获取上传列表
      getfilelist(params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>