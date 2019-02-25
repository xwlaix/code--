<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
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
      <el-input v-model.trim="listQuery.iccid" class="filter-item" style="width:220px" clearable placeholder="请输入ICCID" @keyup.enter.native="handleFilter"/>
      <el-input v-model.trim="listQuery.tel" class="filter-item" style="width:220px" clearable placeholder="请输入接入号" @keyup.enter.native="handleFilter"/>
      <el-input v-model.trim="listQuery.number" class="filter-item" style="width:220px" clearable placeholder="请输入虚拟号" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.aid" class="filter-item" filterable clearable placeholder="请选择代理商">
        <el-option
          v-for="item in agentSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input v-model.trim="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入昵称"/>
      <el-select v-model="listQuery.status" class="filter-item" filterable clearable placeholder="请选择订单状态">
        <el-option
          v-for="item in orderStatusSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="operatorids" class="filter-item" collapse-tags multiple filterable clearable placeholder="请选择套餐批次">
        <el-option
          v-for="item in oidSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input v-model.trim="listQuery.orderID" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单号" @keyup.enter.native="handleFilter"/>
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter"/>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-permission="['kuyuplat:export:rechargeInfo']" v-waves class="filter-item" size="small" type="warning " @click="handleDownload">Java导出</el-button>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      class="table"
      highlight-current-row>
      <el-table-column show-overflow-tooltip align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="订单时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="代理商" min-width="180">
        <template slot-scope="scope">
          <span>{{ aidObject[scope.row.aid]||scope.row.aname }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="昵称" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="套餐批次" min-width="120">
        <template slot-scope="scope">
          <span>{{ oidObject[scope.row.operatorid]||scope.row.oname }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="iccid" min-width="160">
        <template slot-scope="scope">
          <span style="color:#66b1ff;cursor:pointer" @click="jump({iccid:scope.row.iccid})">{{ scope.row.iccid }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="接入号" min-width="160">
        <template slot-scope="scope">
          <span style="color:#66b1ff;cursor:pointer" @click="jump({tel:scope.row.tel})">{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="虚拟号" min-width="160">
        <template slot-scope="scope">
          <span style="color:#66b1ff;cursor:pointer" @click="jump({number:scope.row.number})">{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="订单号" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.orderID }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="状态" min-width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==3?'success':'danger'">{{ statusMap[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="订单金额(元)" min-width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="left" show-overflow-tooltip min-width="100px">
        <template slot-scope="scope">
          <el-button v-permission="['kuyuplat:orderAccountStatus:update']" type="primary" size="mini" @click="updateStatus(scope.row)">修改状态</el-button>
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
import {
  searchOrderAccounts, updateOrderAccountStatus, exportRechargeInfo
} from '@/api/order'
import { statusMap, orderStatusSelect, operatorArr,
  agentArr } from '@/utils/mapArr'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'AmountOrder',
  directives: {
    waves
  },
  data() {
    return {
      statusMap,
      orderStatusSelect,
      pickerOptions: this.processDate(),
      tableKey: 0,
      list: [],
      total: null,
      aidObject: '',
      oidObject: '',
      oidSelect: [],
      agentSelect: [],
      operatorids: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        iccid: '',
        tel: '',
        number: '',
        aid: '',
        nickname: '',
        status: '',
        orderID: this.$route.query.orderID,
        operatorids: '',
        starttime: '',
        endtime: ''
      }
    }
  },
  created() {
    this.getSelect()
    this.getList()
  },
  methods: {
    jump({ iccid = '', tel = '', number = '' }) {
      this.$router.push(`/card/rechargeList?iccid=${iccid}&tel=${tel}&number=${number}`)
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
      agentArr((agentSelect, bankCardObject, alipayObject, anameObject, perObject, aidObject) => {
        this.agentSelect = agentSelect
        this.aidObject = aidObject
      })
      operatorArr((oidSelect, operatorTypeArr, oidObject) => {
        this.oidSelect = oidSelect
        this.oidObject = oidObject
      })
    },
    updateStatus(row) {
      this.$confirm('此操作将该订单修改为订单成功, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateOrderAccountStatus({ id: row.id, status: 3 }, '.el-message-box').then(res => {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
          if (+res.status === 0) {
            row.status = 3
            for (const v of this.list) {
              if (+v.id === +row.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, row)
                break
              }
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleRefresh() {
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
        iccid: '',
        tel: '',
        number: '',
        aid: '',
        nickname: '',
        status: '',
        orderID: '',
        operatorids: '',
        starttime: '',
        endtime: ''
      }
      this.operatorids = []
      this.getList()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
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
    handleDownload() {
      this.$confirm('此操作将导出数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.operatorids.length > 0) {
          this.listQuery.operatorids = this.operatorids
          this.listQuery.operatorids = this.listQuery.operatorids.join(',')
        } else {
          this.listQuery.operatorids = ''
        }
        exportRechargeInfo(this.listQuery, '.filter-container').then(res => {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    getList() {
      if (this.operatorids.length > 0) {
        this.listQuery.operatorids = this.operatorids
        this.listQuery.operatorids = this.listQuery.operatorids.join(',')
      } else {
        this.listQuery.operatorids = ''
      }
      searchOrderAccounts(this.listQuery, '.table').then(res => {
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
<style scoped>
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
