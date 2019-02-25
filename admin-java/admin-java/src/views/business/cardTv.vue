<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="listQuery.status" class="filter-item" filterable clearable placeholder="请选择状态">
        <el-option
          v-for="item in statusSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter"/>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-waves v-permission="['kuyuplat:excel:cardTvBatchAdd']" size="small" type="primary" class="filter-item" @click="handleAdd">导入</el-button>
    </div>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      :stripe="true"
      class="table"
      row-key="id"
      size="mini"
      element-loading-text="给我一点时间"
      highlight-current-row>
      <el-table-column show-overflow-tooltip align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="账号" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="卡密" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==2||scope.row.status==3?'danger':''">{{ scope.row.status===1?'库存':scope.row.status===2?'已卖出':scope.row.status===3?'失效':'' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="添加时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="订单id">
        <template slot-scope="scope">
          <span>{{ scope.row.orderid }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.pageNo"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.pageSize"
        :pager-count="5"
        :total="total"
        background
        layout="total, sizes,jumper, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import { cardTvFind } from '@/api/seckill'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'CardTv',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      statusSelect: [
        {
          value: '1',
          label: '库存'
        }, {
          value: '2',
          label: '已卖出'
        }, {
          value: '3',
          label: '失效'
        }
      ],
      listQuery: {
        status: '',
        pageNo: 1,
        pageSize: 10
      },
      total: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleAdd() {
      this.$router.push('/business/cardTvAdd')
    },
    handleFilter() {
      this.getList()
    },
    handleRefresh() {
      this.listQuery.pageNo = 1
      this.listQuery.status = ''
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    getList() {
      cardTvFind({}, '.table').then(res => {
        if (+res.status === 0) {
          this.list = res.data.rows
          this.total = +res.data.total
        }
        this.$message({
          type: +res.status === 0 ? 'success' : 'error',
          message: res.message
        })
      })
    }
  }
}
</script>
