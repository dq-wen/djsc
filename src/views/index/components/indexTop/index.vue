<template>
  <ul class="indexTop">
    <li>
      <img src="../../images/icon.png"/>
    </li>
    <li>
      <p>{{userName}}，祝你开心每一天!</p>
      <!-- <p>经济主题|  统计局--XX科--XX室</p> -->
    </li>
    <li>
      <i></i>
      <p>待填写文档数</p>
      <p>{{waitThing}} 份</p>
    </li>
  </ul>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name:'indexTop',
  computed:{
    ...mapState(["waitThing"]),
     userName(){
      return sessionStorage.getItem('dj_userName')
    },
  },
  
}
</script>
<style lang="scss" scoped>
.indexTop{
  display: flex;
  justify-content: space-between;
  height: 1.5rem;
  width:100%;
  background: #fff;
  margin-bottom:0.2rem;
  li{
    display: flex;
    justify-content: center;
  }
  li:first-of-type{
    width: 10%;
    align-items: center;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  li:nth-of-type(2){
    width: 80%;
    flex-direction: column;
    // p:last-of-type{
    //   margin-top:0.3rem;
    //   font-size: 0.14rem;
    //   color:#666;
    // }
  }
  li:last-of-type{
    flex-direction: column;
    align-items: center;
    width: 10%;
    position: relative;
    i{
      position: absolute;
      left:0;
      display: block;
      height: 0.5rem;
      width: 1px;
      background: #ccc;
    }
    p:last-of-type{
      color:red;
      margin-top:0.1rem;
      font-size: 0.3rem;
    }

  }
}
</style>