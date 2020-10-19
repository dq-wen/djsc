<template>
  <div class="index">
    <uploadefilelist :optionlist="options" :tableData="filelist" :refreshFilelist="refreshFilelist" @changefileList="changefileList"></uploadefilelist>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getfilelist } from './api'
export default {
  data() {
    return{
      options: [{
          value: '1',
          label: '党群服务中心123123123'
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
  created() {
    console.log(this.$store.state)
    console.log(this.USER_INFO)
  },
  mounted(){
    // this.getfilelistData()
  },
  methods: {
    ...mapMutations([
      'USER_INFO'
    ]),
    changefileList(){
      console.log('更新数据index2')
    },
      //
      getfilelistData(){
        console.log(123)
        // getfilelist().then(res => {
        //   console.log(res)
        // })
      }
  }
}
</script>
