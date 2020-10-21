<template>
  <div class="com_conent">
    <uploadefilelist 
      :optionlist="options" 
      :tableData="filelist" 
      :firstOption="firstOption"
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
      filelist: [],
      firstOption:''
    }
  },
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
          console.log('所属模块',res.data.data)
          let getData = res.data.data;
          this.options = this.getDatafilter(this.routerId,getData)
          this.firstOption = this.options[0].moduleId
        }
      })

      //获取上传列表
      getfilelist(params).then(res => {
        console.log('上传列表',res.data.data)
        let getListData = res.data.data;

        this.filelist = this.getDatafilter(this.routerId,getListData)

      })
    },

    //数据筛选
    getDatafilter(routerId,data){
      let finalyData = []
      switch(routerId){
        case 2:
          finalyData = data.filter(item=>item.moduleId==2)
          break
        case 3:
          finalyData = data.filter(item=>item.moduleId==18)
          break
        case 5:
          finalyData = data.filter(item=>item.moduleId==12)
          break
        case 9:
          finalyData = data.filter(item=>item.moduleId==17)
          break
        case 10:
          finalyData = data.filter(item=>item.moduleId==11)
          break
        case 11:
          finalyData = data.filter(item=>item.moduleId==14)
          break
        case 12:
          finalyData = data.filter(item=>item.moduleId==16)
          break
        case 13:
          finalyData = data.filter(item=>item.moduleId==4 || item.moduleId==5 || item.moduleId==6 || item.moduleId==7 || item.moduleId==8 || item.moduleId==9)
          break
        case 14:
          finalyData = data.filter(item=>item.moduleId==1)
          break
        case 15:
          finalyData = data.filter(item=>item.moduleId==15)
          break
        case 16:
          finalyData = data.filter(item=>item.moduleId==3)
          break
        case 17:
          finalyData = data.filter(item=>item.moduleId==13)
          break
        case 18:
          finalyData = data.filter(item=>item.moduleId==10)
          break
        default:
          finalyData = data
      }
      return finalyData
    }
  }
}
</script>
<style lang="scss" scoped>

</style>