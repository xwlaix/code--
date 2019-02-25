<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model.trim="listQuery.old_card" clearable style="width: 200px;" class="filter-item" placeholder="请输入原卡号"/>
      <el-input v-model.trim="listQuery.new_card" clearable style="width: 200px;" class="filter-item" placeholder="请输入iccid"/>
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

      <el-select v-model="listQuery.status" class="filter-item" filterable clearable placeholder="请选择状态">
        <el-option
          v-for="item in status"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <el-button v-waves size="small" type="warning" class="filter-item" @click="action" >批量处理</el-button>
    </div>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <el-table-column align="center" label="原卡号" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.old_card }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="新卡号" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.new_card }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="添加时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime ?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="旧流量">
        <template slot-scope="scope">
          <span>{{ scope.row.old_sumflow |ToSize }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="新流量">
        <template slot-scope="scope">
          <span>{{ scope.row.new_sumflow|ToSize }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" min-width="90">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==1?'':'success'">{{ scope.row.status==1?'提交中':'处理成功' }}</el-tag>
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
import { getchangeList } from '@/api/changePackage'
import { toSize } from '@/utils'

export default {
  name: 'ChangePackage',
  directives: {
    waves
  },
  filters: {
    ToSize(flow) {
      return toSize((+flow) * 1024)
    }
  },
  data() {
    return {
      pickerOptions: this.processDate(),
      listQuery: {
        starttime: '',
        endtime: '',
        old_card: '',
        new_card: '',
        status: '',
        aid: '',
        pageNumber: 1,
        pageSize: 10
      },
      status: [
        {
          value: '1',
          label: '提交中'
        },
        {
          value: '2',
          label: '处理成功'
        }
      ],
      agent: '',
      list: [],
      tableKey: 0,
      total: 0,
      aname: ''
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
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList('sec')
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getList('sec')
    },
    action() {
      this.$router.push('/changeAction')
    },
    handleFilter() {
      this.listQuery.pageNumber = 1
      this.getList('sec')
    },
    handleRefresh() {
      this.listQuery.pageNumber = 1
      this.listQuery.endtime = ''
      this.listQuery.old_card = ''
      this.listQuery.new_card = ''
      this.listQuery.status = ''
      this.listQuery.starttime = ''
      this.listQuery.aid = ''
      this.getList('sec')
    },
    getList(type) {
      const loading = this.$loading()
      getchangeList(this.listQuery).then(res => {
        if (+res.code === 1) {
          this.list = res.data.rows
          this.total = +res.data.total
        }
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
