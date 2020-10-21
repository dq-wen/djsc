<template>
  <div class="index">
    <uploadefilelist :optionlist="options" :tableData="filelist" :refreshFilelist="refreshFilelist" @changefileList="changefileList"></uploadefilelist>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getfilelist , moduleList} from '../index/api'
import { bus } from '@/components/Bus/bus.js'
export default {
  data() {
    return{
      options: [{
          value: '1',
          label: '党群服务中心7788'
        }],
        value: '1',
        module_id: '1',
        accessToken:'',
        filelist: [{
          date: '2016-05-03',
          name: '王小虎123123123',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        refreshFilelist:'index2'
    }
  },
  computed:{
    userId(){
      return sessionStorage.getItem('dj_userId')
    }
  },
  created() {
    console.log(this.$store.state)
    console.log(this.USER_INFO)
  },
  mounted(){
    this.getListData()
    bus.$on('refresh',function(data){
      console.log(data)
    })
  },
  methods: {
    ...mapMutations([
      'USER_INFO'
    ]),
    changefileList(){
      console.log('更新数据index2')
    },
      getListData(){
      let params = {
        userId:this.userId
      }

      //获取所属模块
      moduleList(params).then(res=>{
        console.log(res)
      })

      //获取上传列表
      getfilelist(params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
