<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.name" class="filter-item" filterable clearable placeholder="请选择代理商">
        <el-option
          v-for="item in agent"
          :key="item.value"
          :label="item.label"
          :value="item.label"/>
      </el-select>
      <el-input v-model.trim="listQuery.remarks" class="filter-item" style="width:130px" clearable placeholder="请输入备注"/>
      <el-input v-model.trim="listQuery.amount" type="number" class="filter-item" style="width:130px" clearable placeholder="请输入金额（元）"/>
      <div class="el-select filter-item el-select--medium payType">
        <el-radio v-model="type" label="1" style="margin-left:10px">增加</el-radio>
        <el-radio v-model="type" label="2" style="margin-left:10px">减少</el-radio>
      </div>
      <el-button v-waves size="small" type="primary" class="filter-item" @click="recharge" >确认</el-button>
    </div>
    <div class="filter-container">
      <el-input v-model.trim="listQuery.orderID" class="filter-item" style="width: 220px;" clearable placeholder="请输入订单号" />
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
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter"/>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-waves size="small" type="warning " class="filter-item" icon="el-icon-download" @click="webDownload"/>
    </div>
    <p class="warn-content " style="margin : 0">
      账户余额:<a>{{ money }}</a>
    </p>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row
      @cellClick="jump">
      <el-table-column align="center" label="代理商名称" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.aname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号" min-width="160">
        <template slot-scope="scope">
          <span style="color:#66b1ff" @click="jump(scope.row)">{{ scope.row.orderID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="充值时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>

        <el-table-column align="center" label="备注" width="150">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.remarks" trigger="hover" placement="top">
            <p>{{ scope.row.remarks }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.remarks |filterFun }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="充值类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type==2?'danger':'success'">{{ scope.row.type==1?'充值':'扣费' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="变动前的余额">
        <template slot-scope="scope">
          <span>{{ scope.row.ago_amount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="变动余额">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type==2?'danger':'success'">{{ scope.row.type==2?-Math.abs(scope.row.amount):Math.abs(scope.row.amount) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="变动后的余额">
        <template slot-scope="scope">
          <span>{{ scope.row.ago_amount }}</span>
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
import { getAmount } from '@/api/agentAmount'
import { getOne } from '@/api/agent'
import { agentArr } from '@/utils/mapArr'

export default {
  name: 'AgentAmount',
  directives: {
    waves
  },
  filters: {
    filterFun(value) {
      if (value && value.length > 12) {
        value = value.substring(0, 12) + '...'
      }
      return value
    }
  },
  data() {
    return {
      pickerOptions: this.processDate(),
      agent: [],
      aidArr: [],
      listQuery: {
        name: '',
        orderID: '',
        remarks: '',
        amount: '',
        type: '',
        starttime: '',
        endtime: '',
        pageNumber: 1,
        pageSize: 10
      },
      money: '',
      list: [],
      tableKey: 0,
      total: 0

    }
  },
  created() {
    this.getList()
    this.getAmountInfo()
    agentArr((res, bankCard, alipay, aname, per, aid) => {
      this.agent = res
      this.aidArr = aid
    })
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
    getAmountInfo() {
      if (this.listQuery.name) {
        getOne({ name: this.listQuery.name }).then(res => {
          this.money = (res.data.money ? res.data.money : '') + '元'
        })
      }
    },
    jump(row) {
      this.$router.push(`/order?orderID=${row.orderID}`)
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList('sec')
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getList('sec')
    },
    recharge() {
      this.$router.push(`/recharge`)
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
    webDownload() {
      this.downAction()
    },
    downAction(pageSize) {
      const loading = this.$loading({
        lock: true
      })
      getAmount({
        orderID: this.listQuery.orderID,
        pageSize: pageSize,
        pageNumber: 1
      }).then(response => {
        loading.close()
        if (+response.code === 1) {
          const list = response.data.rows
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              '订单号',
              '充值时间',
              '充值类型',
              '扣费前余额',
              '套餐扣费',
              '备注'
            ]
            const filterVal = [
              'orderID',
              'addtime',
              'type',
              'ago_amount',
              'amount',
              'remarks'
            ]
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: `余额信息${new Date().toLocaleDateString()}`
            })
            this.$message({
              type: 'success',
              message: response.msg
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '数量过多'
          })
          this.$prompt('', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPlaceholder: '请输入导出数量',
            inputErrorMessage: '数量填写不正确',
            inputValue: 10000,
            inputValidator: function(value) {
              if (/(^[1-9]\d*$)/.test(+value)) {
                return true
              } else {
                return false
              }
            }
          }).then(({ value }) => {
            this.downAction(value)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'type') {
            return +v[j] === 1 ? '充值' : '扣费'
          } else if (j === 'amount') {
            return +v['type'] === 1 ? -Math.abs(v[j]) : -Math.abs(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getList(type) {
      const loading = this.$loading()
      getAmount(this.listQuery).then(res => {
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
