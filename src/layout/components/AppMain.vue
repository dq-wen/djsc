<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: 'AppMain',
  computed: {

    key() {
      console.log(this.$route.meta.id)
      this.SET_ROUTERID(this.$route.meta.id);
      return this.$route.path
    }
  },
  methods: {
    ...mapMutations([
      "SET_ROUTERID"
    ]),
  },
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow-y:auto;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
