<template>
  <div class="app-container calendar-list-container">
    <p class="warn-content">
      <span>
        总佣金:<a>{{ sum }}</a>
      </span>
    </p>
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
      <el-input v-model.trim="listQuery.iccid" clearable style="width: 200px;" class="filter-item" placeholder="请输入iccid号"/>
      <el-select v-model="listQuery.name" class="filter-item" filterable clearable placeholder="请选择代理商" @change="changeAname">
        <el-option
          v-for="item in agent"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input v-model.trim="listQuery.orderID" class="filter-item" style="width: 200px;" clearable placeholder="请输入订单号" />
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <el-button v-waves size="small" type="warning " class="filter-item" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
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

      <el-table-column align="center" label="订单号" min-width="140">
        <template slot-scope="scope">
          <span style="color:#66b1ff" @click="jumpOrder(scope.row.orderID)">{{ scope.row.orderID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="佣金(元)">
        <template slot-scope="scope">
          <el-tag :type="scope.row.money | moneyType"> {{ scope.row.money?scope.row.money==='0.00'?'0.00':scope.row.money:'没分配套餐' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime ?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="代理商" min-width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付类型">
        <template slot-scope="scope">
          <span>{{ scope.row.trade_type|tradeTypeFilter }}</span>
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
import {
  downloadCommission,
  getCommission,
  agentCommission
} from '@/api/commission'
import { agentArr, tradeMap } from '@/utils/mapArr'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Commission',
  directives: {
    waves
  },
  filters: {
    tradeTypeFilter(trade_type) {
      return tradeMap[trade_type]
    },
    moneyType(money) {
      if (money && money !== '0.00' && +money > 0) {
        return 'success'
      } else {
        return 'danger'
      }
    }
  },
  data() {
    return {
      pickerOptions: this.processDate(),
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      agent: [],
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        starttime: null,
        endtime: null,
        name: this.$route.query.name,
        aid: this.$route.query.aid,
        iccid: '',
        orderID: ''
      },
      sum: '',
      loading: false,
      downloadLoading: false
    }
  },
  created() {
    this.getSelect()
    this.getList()
  },
  methods: {
    jump(card) {
      this.$router.push(`/getInfo?card=${card}`)
    },
    jumpOrder(order) {
      this.$router.push(`/order?orderID=${order}`)
    },
    changeAname(value) {
      this.listQuery.aid = value
      this.getSelect()
      this.getList()
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
      if (!this.agent.length) {
        agentArr((res) => {
          this.agent = res
        })
      }
      agentCommission({ type: 'myCountMoney', aid: this.listQuery.aid }).then(res => {
        if (+res.code === 1) {
          this.sum = `${res.data ? res.data : '0.00'}（元）`
        }
      })
    },
    handleRefresh() {
      this.listQuery.pageNumber = 1
      this.listQuery.starttime = null
      this.listQuery.endtime = null
      this.listQuery.name = ''
      this.listQuery.iccid = ''
      this.listQuery.orderID = ''
      this.getSelect()
      this.getList()
    },
    handleFilter() {
      this.listQuery.pageNumber = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getList()
    },
    handleDownload() {
      const loading = this.$loading({
        lock: true,
        fullscreen: false
      })
      downloadCommission({
        name: this.listQuery.name,
        starttime: this.listQuery.starttime,
        endtime: this.listQuery.endtime,
        iccid: this.listQuery.iccid,
        orderID: this.listQuery.orderID,
        aid: this.listQuery.aid
      }).then(response => {
        this.listLoading = false
        loading.close()
        if (+response.code === 1) {
          window.open(response.data.url)
        }
        this.$message({
          type: response.code === 1 ? 'success' : 'error',
          message: response.msg
        })
      }).catch((res) => {
        loading.close()
      })
    },
    getList() {
      this.listLoading = true
      const loading = this.$loading({
        lock: true
      })
      getCommission({
        name: this.listQuery.name,
        pageNumber: this.listQuery.pageNumber,
        pageSize: this.listQuery.pageSize,
        starttime: this.listQuery.starttime,
        endtime: this.listQuery.endtime,
        iccid: this.listQuery.iccid,
        orderID: this.listQuery.orderID,
        aid: this.listQuery.aid
      }).then(response => {
        if (+response.code === 1) {
          this.list = response.data.rows
          this.total = +response.data.total
        }
        this.listLoading = false
        loading.close()
        this.$message({
          type: +response.code === 1 ? 'success' : 'error',
          message: response.msg
        })
      })
    }
  }
}
</script>
<style scoped>
.el-range-separator {
  padding: 0;
  width: 24px !important;
}
.warn-content {
  display: flex;
  margin-top: 0;
}
.warn-content span {
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>

<style scoped>
.el-button + .el-button {
  margin-left: 0;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 140px;
}

.icon-star {
  margin-right: 2px;
}

.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}
</style>
