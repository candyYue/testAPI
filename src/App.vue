<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
*{
  margin:0;
  padding:0;
}
html,body,#app,.el-container{
  height: 100%;
}
.el-row+.el-row{
  margin-top: 20px;
}
</style>
