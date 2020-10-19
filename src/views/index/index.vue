<template>
  <div class="index">
    <uploadefilelist :optionlist="options" :tableData="filelist" :refreshFilelist="refreshFilelist" @changefileList="changefileList"></uploadefilelist>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getfilelist } from './api'
import { bus } from '@/components/Bus/bus.js'
export default {
  data() {
    return{
      options: [{
          value: '1',
          label: '党群服务中心'
        }],
        value: '1',
        module_id: '1',
        accessToken:'',
        filelist: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        refreshFilelist:'index1',//把这个值传过去就知道上传成功后更新哪个模块的列表了
    }
  },
  created() {
    console.log(this.$store.state)
    console.log(this.USER_INFO)
  },
  mounted(){
    // this.getfilelistData()
    bus.$on('refresh',function(data){
      console.log(data)
    })
  },
  methods: {
    ...mapMutations([
      'USER_INFO'
    ]),
    changefileList(){
      console.log('更新数据index1')
      this.filelist=[{
          date: '2018-08-15',
          name: '嘉盛',
          address: '广州市天河区吉山幼儿园'
        }]
    },
      //获取上传列表数据
      getfilelistData(){
        console.log(123)
        // getfilelist().then(res => {
        //   console.log(res)
        // })
      }
  }
}
</script>
