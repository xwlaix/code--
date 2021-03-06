<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-date-picker
        v-model="month"
        value-format="yyyy-MM"
        type="month"
        class="filter-item"
        placeholder="选择日期"/>
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter"/>
      <el-button v-waves class="filter-item" size="small" type="success" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-waves class="filter-item" size="small" type="warning " icon="el-icon-download" @click="webDownload"/>
    </div>
    <el-card>
      <div class="chart-container">
        <chart
          :x-data="xData"
          :legend-data="legendData"
          :series-data0="seriesData0"
          :series-data1="seriesData1"
          :series-data2="seriesData2"
          height="100%"
          width="100%"/>
      </div>
    </el-card>
    <el-card style="margin-top:15px;">
      <el-table
        ref="multipleTable"
        :data="list.slice((listQuery.pageNo-1)*listQuery.pageSize,listQuery.pageNo*listQuery.pageSize)"
        :fit ="true"
        row-key="id"
        element-loading-text="给我一点时间"
        size="mini"
        class="multipleTable"
        tooltip-effect="dark"
        highlight-current-row>
        <el-table-column align="center" label="卡号" show-overflow-tooltip min-width="180">
          <template slot-scope="scope">
            <span type="text">{{ scope.row.msisdns }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span type="text">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总流量" show-overflow-tooltip>
          <template slot-scope="scope">
            <span type="text">{{ scope.row.sumflow| flowFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="已用量" show-overflow-tooltip>
          <template slot-scope="scope">
            <span type="text">{{ scope.row.useflow | flowFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="使用率" show-overflow-tooltip>
          <template slot-scope="scope">
            <span type="text">{{ scope.row| perFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page="listQuery.pageNo"
          :page-sizes="[10,20,30, 50,100,500,1000]"
          :page-size="listQuery.pageSize"
          :pager-count="5"
          :total="total"
          background
          layout="total, sizes,jumper, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
    </el-card>

  </div>

</template>

<script>
import Chart from '@/components/Charts/mixChart'
import { cardFlowDetail } from '@/api/card'
import waves from '@/directive/waves' // 水波纹指令
import { toSize } from '@/utils'

export default {
  name: 'FlowDetail',
  components: { Chart },
  directives: {
    waves
  },
  filters: {
    flowFilter(value) {
      return toSize(+value * 1024)
    },
    perFilter(value) {
      return +value.useflow === 0 ? '0%' : +value.sumflow === 0 ? '100%' : +((+value.useflow / +value.sumflow) * 100).toFixed(2) + '%'
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10
      },
      total: null,
      xData: [],
      legendData: ['总流量', '已用流量', '使用率'],
      seriesData0: [],
      seriesData1: [],
      seriesData2: [],
      cardId: this.$route.query.id,
      msisdns: this.$route.query.card,
      month: this.getMonth()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getMonth() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      return year.toString() + '-' + month.toString()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.xData = []
      this.seriesData0 = []
      this.seriesData1 = []
      this.seriesData2 = []
      this.list = []
      this.total = 0
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
    },
    handleRefresh() {
      this.getList()
    },
    getList() {
      cardFlowDetail({ cardId: this.cardId, month: this.month, msisdns: this.msisdns }, '.multipleTable').then(
        res => {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
          if (res.status === 0) {
            var dataJson = JSON.parse(res.data)
            var sumArr = []
            var useArr = []
            var perArr = []
            var xdata = []
            dataJson.map((data, i) => {
              this.list.push(Object.assign(data, { msisdns: this.msisdns }))
              sumArr.push(+(+data.sumflow / 1024).toFixed(2))
              useArr.push(+(+data.useflow / 1024).toFixed(2))
              perArr.push(+((+data.useflow / +data.sumflow) * 100).toFixed(2))
              xdata.push(data.time)
            })
            this.total = dataJson.length
            this.xData = [].concat(xdata)
            this.seriesData0 = [].concat(sumArr)
            this.seriesData1 = [].concat(useArr)
            this.seriesData2 = [].concat(perArr)
          }
        }
      )
    },
    webDownload() {
      this.downAction()
    },
    downAction() {
      cardFlowDetail({ cardId: this.cardId, month: this.month, msisdns: this.listQuery.msisdns }, '.multipleTable').then(res => {
        if (+res.status === 0) {
          const list = JSON.parse(res.data)
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              'iccid',
              '时间',
              '总量',
              '已用流量',
              '使用率'
            ]
            const filterVal = [
              'iccid',
              'time',
              'sumflow',
              'useflow',
              'per'
            ]
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: `流量详细信息${new Date().toLocaleDateString()}`
            })
            this.$message({
              type: 'success',
              message: res.message
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
          if (j === 'iccid') {
            return this.msisdns
          } else if (j === 'useflow') {
            return toSize(+v[j] * 1024)
          } else if (j === 'sumflow') {
            return toSize(+v[j] * 1024)
          } else if (j === 'per') {
            return +((+v['useflow'] / +v['sumflow']) * 100).toFixed(2)
          } else {
            return v[j]
          }
        })
      )
    } }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

