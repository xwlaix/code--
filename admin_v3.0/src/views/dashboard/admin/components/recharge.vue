<template>
  <el-table
    :data="list"
    element-loading-text="给我一点时间"
    style="width: 100%;padding-top: 15px;">
    <el-table-column
      label="排名"
      type="index"
      width="50"/>
    <el-table-column label="代理商" align="center" min-width="180">
      <template slot-scope="scope">
        <span
          style="color:#66b1ff"
          type="text"
          @click="jump(scope.row)">
          {{ scope.row.key }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="充值金额" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.value }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getOrderData } from '@/api/order'

export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    jump(row) {
      this.$router.push(`/agent?name=${row.key}`)
    },
    fetchData() {
      getOrderData({ type: 'month-sonMoney' }).then(response => {
        if (+response.code === 0) {
          return false
        }
        for (const [k, v] of Object.entries(response.data)) {
          this.list.push({ key: k, value: v })
        }
        this.list.sort((a, b) => {
          return b.value - a.value
        })
        this.list = this.list.slice(0, 9)
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '获取代理商排名数据失败！'
        })
      })
    }
  }
}
</script>
