<template>
  <div
    :source ="source"
    class="app-container"
  >
    <div class="filter-container">
      <el-input v-model.trim="listQuery.iccid" clearable style="width: 200px;" class="filter-item" placeholder="请输入iccid" @keyup.enter.native="handleFilter"/>
      <el-input v-model.trim="listQuery.tel" clearable style="width: 200px;" class="filter-item" placeholder="请输入接入号" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.operatorid" class="filter-item" filterable clearable placeholder="请选择套餐批次" @keyup.enter.native="handleFilter">
        <el-option
          v-for="item in oidSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.aid" class="filter-item" filterable clearable placeholder="请选择代理商">
        <el-option
          v-for="item in agentSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-date-picker
        v-model="listQuery.starttime"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="开始日期"
        class="filter-item"
      />
      <el-date-picker
        v-model="listQuery.endtime"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
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
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter"/>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-permission="['kuyuplat:card:imeiReRecord']" v-waves size="small" type="warning" class="filter-item" @click="action" >批量解绑</el-button>
    </div>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      class="table"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <el-table-column show-overflow-tooltip align="center" label="iccid" min-width="160">
        <template slot-scope="scope">
          <span style="color:#66b1ff;cursor:pointer" @click="jump(`?iccid=${scope.row.iccid}`)">{{ scope.row.iccid }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="接入号" min-width="125">
        <template slot-scope="scope">
          <span style="color:#66b1ff;cursor:pointer" @click="jump(`?tel=${scope.row.tel}`)">{{ scope.row.tel }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="套餐批次">
        <template slot-scope="scope">
          <span>{{ oidObject[scope.row.operatorid]?`${oidObject[scope.row.operatorid]}--${scope.row.operatorid}`:scope.row.operatorid }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="代理商">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.aname">{{ scope.row.aname?scope.row.aname:'' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="添加时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="状态" min-width="120">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status| statusFilter }}</el-tag>
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
import waves from '@/directive/waves' // 水波纹指令
import { agentArr, operatorArr, unbindStatusSelect, unbindStatus } from '@/utils/mapArr'
import { findImeiReRecord } from '@/api/unbind'
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
  props: {
    source: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pickerOptions: this.processDate(),
      listQuery: {
        starttime: '',
        endtime: '',
        iccid: this.$route.query.iccid,
        tel: this.$route.query.tel,
        status: '',
        pageNo: 1,
        pageSize: 10,
        operatorid: '',
        aid: ''
      },
      status: unbindStatusSelect,
      oidSelect: [],
      agentSelect: [],
      list: [],
      oidObject: '',
      tableKey: 0,
      total: 0

    }
  },
  created() {
    if (!this.source) {
      this.getList()
    }
    this.getSelect()
  },
  methods: {
    jump(card) {
      this.$router.push(`/business/flowInfo${card}`)
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
      agentArr(agentSelect => {
        this.agentSelect = agentSelect
      })
      operatorArr((oidSelect, operatorTypeArr, oidObject) => {
        this.oidSelect = oidSelect
        this.oidObject = oidObject
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList('sec')
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList('sec')
    },
    action() {
      this.$router.push('/business/unbindAction')
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList('sec')
    },
    handleRefresh() {
      this.listQuery = {
        starttime: '',
        endtime: '',
        iccid: '',
        tel: '',
        status: '',
        pageNo: 1,
        pageSize: 10,
        operatorid: '',
        aid: ''
      }
      this.getList('sec')
    },
    getList(type) {
      findImeiReRecord(this.listQuery, '.table').then(res => {
        if (res.status === 0) {
          this.list = res.data.rows
          this.total = +res.data.total
        }
        if (type === 'sec') {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
        }
      })
    }
  }
}
</script>
