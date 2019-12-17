<template>
  <el-container>
    <el-aside width="220px">
      <v-menu :menu-list="API"/>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import API from './API'
import VMenu from './components/Menu.vue'
export default {
  components: {
    VMenu
  },
  data () {
    return {
      API
    }
  },
  mounted () {
    // console.log(API)
  }
}
</script>
<style lang="scss">
.el-main{
  overflow: scroll;
}
</style>
