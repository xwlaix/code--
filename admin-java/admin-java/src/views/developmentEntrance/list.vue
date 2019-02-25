<template>
  <div class="app-container">
    <el-button v-permission="['kuyuplat:excel:monthBalance','kuyuplat:card:monthBalance']" class="el-button" size="mini" type="primary" @click="jump('/development/monthlyBalance')">月套餐月末扣费停机</el-button>
    <el-button class="el-button" size="mini" type="primary" @click="jump('/development/map')">地图</el-button>
    <el-button class="el-button" size="mini" type="primary" @click="jump('/other/API')">API文档</el-button>
  </div>
</template>

<script>
export default {
  name: 'DevelopmentEntrance',
  data() {
    return {
    }
  },
  methods: {
    jump(type) {
      this.$router.push(type)
    }
  }
}
</script>
<style scoped>
.el-button{
  margin-top:10px;
}
</style>

