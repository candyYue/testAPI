<template>
    <el-menu :default-openeds="openeds" router :default-active="activeIndex" >
      <el-submenu v-for="apiItem in menuList" :key="apiItem.key"
      :index="`${apiItem.key}`" >
        <template slot="title"><i class="el-icon-menu"></i>{{apiItem.name}}</template>
        <el-menu-item v-for="api in apiItem.children" :key="api.key"
          :route="{name: 'API', params: {key:api.key}}"
          :index="`/develop/${api.key}`"
        >
          {{ api.name }}
           <!-- :route="{name: 'API', params: {key:api.key}}" -->
        </el-menu-item>
      </el-submenu>
    </el-menu>

</template>

<script>
export default {
  name: 'v-menu',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openeds: []
    }
  },
  computed: {
    activeIndex () {
      return this.$route.path
    }
  },
  watch: {
    menuList: {
      handler (val) {
        this.openeds = this.menuList.map(item => item.key)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.el-menu-item.is-active{
  background-color: #ecf5ff;
}
</style>
