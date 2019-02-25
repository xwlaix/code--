<template>
  <div class="app-container calendar-list-container">
    <p class="warn-content">
      <span>
        总充值:<a>{{ sum }}</a>
      </span>
      <span>
        本月充值:<a>{{ nowRecharge }}</a>
      </span>
      <span>
        本月佣金:<a>{{ nowAmount }}</a>
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
      <el-input v-model.trim="listQuery.card" clearable style="width: 200px;" class="filter-item" placeholder="请输入卡号"/>
      <el-select v-model="listQuery.aname" class="filter-item" filterable clearable placeholder="请选择代理商">
        <el-option
          v-for="item in agent"
          :key="item.value"
          :label="item.label"
          :value="item.label"/>
      </el-select>
      <el-input v-model.trim="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入昵称" />
      <el-input v-model.trim="listQuery.orderID" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单号" />
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
      <el-table-column align="center" label="订单时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime ?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="昵称" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="代理商" min-width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.aname }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="iccid" min-width="160">
        <template slot-scope="scope">
          <span style="color:#66b1ff" @click="jump(scope.row.iccid)">{{ scope.row.iccid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单号" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.orderID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" min-width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==3?'success':'danger'">{{ scope.row.status |statusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单金额(元)" min-width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="佣金(元)" min-width="130">
        <template slot-scope="scope">
          <el-tag :type="scope.row.commission | commissionType"> {{ scope.row.trade_type==5&&type==1?"代理商微信收费无佣金":scope.row.commission?scope.row.commission:"没有分配套餐" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收益(元)" min-width="130">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sy | commissionType"> {{ scope.row.trade_type==5&&type==1?"代理商微信收费无收益":scope.row.sy?scope.row.sy:"没有设置结算价" }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="套餐名称" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.pname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付类型" min-width="120">
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
  getAllOrder,
  getAgentCommission,
  getOrderData,
  downOrder
} from '@/api/order'
import { statusMap, tradeMap, agentArr } from '@/utils/mapArr'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Order',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      return statusMap[status]
    },
    tradeTypeFilter(trade_type) {
      return tradeMap[trade_type]
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
      pickerOptions: this.processDate(),
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      agent: [],
      type: sessionStorage.getItem('type'),
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        starttime: null,
        endtime: null,
        aname: '',
        nickname: '',
        card: '',
        orderID: this.$route.query.orderID
      },
      oname: '',
      sum: '',
      nowRecharge: '',
      nowAmount: '',
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
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          return new Date(self.listQuery.starttime).getTime() > time.getTime()
        }
      }
    },
    getSelect() {
      agentArr((res) => {
        this.agent = res
      })
      getAgentCommission({ type: 'month' }).then(res => {
        if (+res.code === 1) {
          const month = new Date().getMonth() + 1
          this.nowAmount = res.data[month + '月'] ? res.data[month + '月'] : '0.00' + '(元)'
        }
      })
      getOrderData({ type: 'month-money' }).then(res => {
        if (+res.code === 1) {
          this.nowRecharge = res.data['0'] ? res.data['0'] : '0.00' + '(元)'
        }
      })
      getOrderData({ type: 'money' }).then(res => {
        if (+res.code === 1) {
          this.sum = res.data['0'] ? res.data['0'] : '0.00' + '(元)'
        }
      })
    },
    handleRefresh() {
      this.listQuery.pageNumber = 1
      this.listQuery.starttime = null
      this.listQuery.endtime = null
      this.listQuery.aname = ''
      this.listQuery.nickname = ''
      this.listQuery.card = ''
      this.listQuery.orderID = ''
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
      downOrder({
        aname: this.listQuery.aname,
        starttime: this.listQuery.starttime,
        endtime: this.listQuery.endtime,
        nickname: this.listQuery.nickname,
        orderID: this.listQuery.orderID,
        card: this.listQuery.card
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
      })
    },
    getList() {
      this.listLoading = true
      const loading = this.$loading({
        lock: true
      })
      getAllOrder({
        aname: this.listQuery.aname,
        pageNumber: this.listQuery.pageNumber,
        pageSize: this.listQuery.pageSize,
        starttime: this.listQuery.starttime,
        endtime: this.listQuery.endtime,
        nickname: this.listQuery.nickname,
        orderID: this.listQuery.orderID,
        card: this.listQuery.card
      }).then(response => {
        if (+response.code === 1) {
          this.list = response.data.rows
          this.total = +response.data.total
        }
        this.listLoading = false
        loading.close()
        this.$message({
          type: response.code === 1 ? 'success' : 'error',
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
