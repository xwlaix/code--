<template>
  <el-table
    :data="list"
    element-loading-text="给我一点时间"
    style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单号" min-width="180">
      <template slot-scope="scope">
        <span
          style="color:#66b1ff"
          type="text"
          @click="jump(scope.row)">
          {{ scope.row.orderID }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="时间" min-width="160">
      <template slot-scope="scope">
        {{ scope.row.addtime?scope.row.addtime:''| parseTime('{m}-{d} {h}:{i}') }}
      </template>
    </el-table-column>
    <el-table-column label="套餐价格" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.money }}
      </template>
    </el-table-column>
    <el-table-column label="佣金" align="center" min-width="130">
      <template slot-scope="scope">
        <el-tag :type="scope.row.commission | commissionType"> {{ scope.row.trade_type==5&&type==1?"代理商微信收费无佣金":scope.row.commission?scope.row.commission:"没有分配套餐" }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" align="center" min-width="120">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | showType"> {{ scope.row.status | statusFilter }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getAllOrder } from '@/api/order'
import { statusMap } from '@/utils/mapArr'

export default {
  filters: {
    statusFilter(status) {
      return statusMap[status]
    },
    showType(status) {
      const showType = {
        3: 'success',
        1: 'danger',
        2: 'danger',
        4: ''
      }
      return showType[status]
    },
    commissionType(commission) {
      if (commission && commission !== '0.00' && +commission > 0) {
        return 'success'
      } else {
        return 'danger'
      }
    }
  },
  data() {
    return {
      list: null,
      type: sessionStorage.getItem('type')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    jump(row) {
      this.$router.push(`/order?orderID=${row.orderID}`)
    },
    fetchData() {
      getAllOrder({ pageSize: 8,
        pageNumber: 1 }).then(response => {
        if (+response.code === 0) {
          return false
        }
        this.list = response.data.rows
      })
    }
  }
}
</script>
