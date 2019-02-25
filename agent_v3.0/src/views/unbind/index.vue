<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model.trim="listQuery.iccid" clearable style="width: 200px;" class="filter-item" placeholder="请输入iccid"/>
      <el-input v-model.trim="listQuery.tel" clearable style="width: 200px;" class="filter-item" placeholder="请输入接入号"/>

      <el-select v-model="listQuery.operatorid" class="filter-item" filterable clearable placeholder="请选择供应商套餐批次">
        <el-option
          v-for="item in operatorid"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.aname" class="filter-item" filterable clearable placeholder="请选择代理商">
        <el-option
          v-for="item in agent"
          :key="item.value"
          :label="item.label"
          :value="item.label"/>
      </el-select>
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
      <el-button v-waves size="small" type="warning" class="filter-item" @click="action" >批量解绑</el-button>
    </div>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <el-table-column align="center" label="iccid" min-width="160">
        <template slot-scope="scope">
          <span style="color:#66b1ff" @click="jump(scope.row.iccid)">{{ scope.row.iccid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="接入号" min-width="125">
        <template slot-scope="scope">
          <span style="color:#66b1ff" @click="jump(scope.row.tel)">{{ scope.row.tel }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商套餐批次">
        <template slot-scope="scope">
          <span>{{ project }}--{{ scope.row.operatorid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="代理商">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.aname">{{ scope.row.aname?scope.row.aname:'' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="添加时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" min-width="120">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status| statusFilter }}</el-tag>
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
import { getAllUnbind } from '@/api/unbind'
import { agentArr, operatorArr, unbindStatusSelect, unbindStatus } from '@/utils/mapArr'

export default {
  name: 'Unbind',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      return unbindStatus[status]
    }
  },
  data() {
    return {
      project: sessionStorage.getItem('project'),
      pickerOptions: this.processDate(),
      listQuery: {
        starttime: '',
        endtime: '',
        iccid: '',
        tel: '',
        status: '',
        pageNumber: 1,
        pageSize: 10,
        operatorid: '',
        aname: ''
      },
      status: unbindStatusSelect,
      operatorid: '',
      agent: '',
      list: [],
      tableKey: 0,
      total: 0

    }
  },
  created() {
    this.getList()
    this.getSelect()
  },
  methods: {
    jump(card) {
      this.$router.push(`/getInfo?card=${card}`)
    },
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          return new Date(self.listQuery.starttime).getTime() > time.getTime()
        }
      }
    },
    getSelect() {
      agentArr(res => {
        this.agent = res
      })
      operatorArr(res => {
        this.operatorid = res
      })
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
      this.$router.push('/unbindAction')
    },
    handleFilter() {
      this.listQuery.pageNumber = 1
      this.getList('sec')
    },
    handleRefresh() {
      this.listQuery.pageNumber = 1
      this.listQuery.endtime = ''
      this.listQuery.starttime = ''
      this.listQuery.iccid = ''
      this.listQuery.tel = ''
      this.listQuery.status = ''
      this.listQuery.pageNumber = 1
      this.listQuery.operatorid = ''
      this.listQuery.aname = ''
      this.getList('sec')
    },
    getList(type) {
      const loading = this.$loading()
      getAllUnbind(this.listQuery).then(res => {
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
