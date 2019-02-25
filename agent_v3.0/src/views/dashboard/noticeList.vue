<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.starttime"
        type="date"
        placeholder="开始日期"
        class="filter-item"
      />
      <el-date-picker
        v-model="listQuery.endtime"
        :picker-options="pickerOptions"
        type="date"
        placeholder="结束日期"
        class="filter-item"
      />
      <el-input v-model.trim="listQuery.tetle" class="filter-item" style="width: 220px;" clearable placeholder="请输入标题" />
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
    </div>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row
      @cellClick="jump">
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.tetle }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.content" trigger="hover" placement="top">
            <p style="width:300px">{{ scope.row.content }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.content |filterFun }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" min-width="140">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="jump(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.pageNumber"
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
import waves from '@/directive/waves' // 水波纹指令
import { getNotice } from '@/api/data'

export default {
  name: 'NoticeList',
  directives: {
    waves
  },
  filters: {
    filterFun: function(value) {
      if (value && value.length > 12) {
        value = value.substring(0, 12) + '...'
      }
      return value
    }
  },
  data() {
    return {
      pickerOptions: this.processDate(),
      listQuery: {
        orderID: '',
        pageNumber: 1,
        pageSize: 10
      },
      amount: '',
      list: [],
      tableKey: 0,
      total: 0

    }
  },
  created() {
    this.getList()
  },
  methods: {
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          return new Date(self.listQuery.starttime).getTime() > time.getTime()
        }
      }
    },
    jump(row) {
      this.$router.push(`/notice?id=${row.id}`)
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList('sec')
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getList('sec')
    },
    handleFilter() {
      this.listQuery.pageNumber = 1
      this.getList('sec')
    },
    handleRefresh() {
      this.listQuery.pageNumber = 1
      this.listQuery.orderID = ''
      this.getAmountInfo()
      this.getList('sec')
    },
    getList(type) {
      const loading = this.$loading()
      getNotice(this.listQuery).then(res => {
        this.list = res.data.rows
        this.total = +res.data.total
        loading.close()
        if (type === 'sec') {
          this.$message({
            type: res.code === 1 ? 'success' : 'error',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>
