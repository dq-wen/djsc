<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import utils from '@/utils/utils'
export default {
  name: 'App',
  mounted() {
    utils.initRouter(this);
  },
  watch:{ 
    $route: {
      handler(to, from) {
        utils.initRouter(this);
      }
    }
  }
}
</script>
<style>
  /* 解决element-ui的table表格控件表头与内容列不对齐问题 */
  .el-table th.gutter{
    display: table-cell!important;
  }
</style>
