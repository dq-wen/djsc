<template>
  <div class="indexContent">
    <tabs :tabArr="tabArr" @changeTab="changeTab"/>
    <div class="searchValue">
      <searchInput @searchInputVal="searchInputVal"/>
    </div>
    <lists :activeName="activeName" :tableList="tableList" 
      v-loading="tableListLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      style="min-height:4rem"
    />
    <pagination 
      :pageType.sync="pageType" 
      :total="total"
      @handleSizeChange="()=>{this.getListsPage(this.pageType)}"
      @handleCurrentChange="()=>{this.getListsPage(this.pageType)}"
    />

  </div>
</template>
<script>
import pagination from '@/components/pagination'
import tabs from '@/components/tabs'
import Lists from '../lists'
import searchInput from '@/components/searchInput'
import { mapState, mapMutations } from 'vuex'
import {fileListPage} from '../../api'
import bus from '@/utils/bus'
export default {
  name:'indexContent',
  data(){
    return{
      tabArr:[{id:'1',name:'未填报'},{id:'2',name:'已填报'}],
      activeName:0,
      pageType:{
        userId:sessionStorage.getItem('dj_userId'),
        chiName:'',
        fillStatus:0,//未填报
        pageNum:1,
        pageSize:10
      },
      total:0,//总数
      tableList:[],//列表数据
      tableListLoading:false,
    }
  },
  components:{pagination,tabs,Lists,searchInput},
  computed:{
    ...mapState(["moduleId"]),
    // userId(){
    //   return sessionStorage.getItem('dj_userId')
    // },
  },
  created(){
    //获取分页列表
    bus.$on('C_getfileList',e=>{
      this.pageInit()
      this.getListsPage(this.pageType)
    })
  },
  mounted(){
    console.log('主题moduleId',this.moduleId);
    // console.log(this.userId)
    this.getListsPage(this.pageType)//获取分页列表
  },
  methods:{
    handleOk(convertedData) {
      console.log(9999)
      console.log(convertedData)
    },

    ...mapMutations([
      'SET_WAITTHING'
    ]),

    //分页初始化
    pageInit(){
      this.pageType.pageNum = 1;
      this.pageType.pageSize = 10;
    },

    //tab栏切换
    changeTab(num){
      this.activeName = num;
      this.pageInit();//分页初始化
      this.pageType.fillStatus = num;
      this.getListsPage(this.pageType)
    },

    //获取分页列表
    getListsPage(type){
      this.tableListLoading = true;
      fileListPage(type).then(res=>{
        this.tableListLoading = false;
        if(res.data.code==200){
          let data = res.data.data;
          this.total = data.total;
          this.tableList = data.list;

          if(this.activeName==0){
            this.SET_WAITTHING(this.total);
          }
        }
      })
    },

    //查询数据
    searchInputVal(val){
      this.pageInit();//分页初始化
      this.pageType.chiName = val;
      this.getListsPage(this.pageType);
    },
  },
}
</script>
<style lang="scss" scoped>
  .indexContent{
    width:14rem;
    margin:0 auto;
    padding-bottom:0.1rem;
    background: #fff;
    position: relative;
    // box-shadow: 0px 0px 10px 0px #aaa;
    .searchValue{
      position:absolute;
      right: 2rem;
      top: 0.1rem;
    }
  }
</style>