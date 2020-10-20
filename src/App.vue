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
}
</script>
