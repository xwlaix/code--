<template>
  <div class="app-container calendar-list-container">

    <el-tabs type="border-card">
      <el-tab-pane>
        <div class="filter-container">
          <el-button v-waves size="small" type="primary" class="filter-item" @click="addWithdrawals">申请提现</el-button>
          <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh()">刷新</el-button>
        </div>
        <span slot="label"><i class="el-icon-date"/> 提现申请</span>
        <el-table
          :data="list"
          :key="tableKey"
          :fit ="true"
          row-key="id"
          element-loading-text="给我一点时间"
          size="mini"
          highlight-current-row>
          <el-table-column align="center" label="id" >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="申请时间" min-width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.addtime ?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="提现金额（元）" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="提现状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status==3?'danger':scope.row.status==2?'success':''">{{ scope.row.status|statusFilter }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="失败原因" width="180">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.reason" trigger="hover" placement="top">
                <p>{{ scope.row.reason }}</p>
                <div slot="reference">
                  <el-tag size="medium">{{ scope.row.reason |filterFun }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column align="center" label="审批时间" min-width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.approvaltime ?scope.row.approvaltime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
      </el-tab-pane>
      <el-tab-pane v-if="type!=3" label="提现审核">
        <div class="filter-container">
          <el-select v-model="agentListQuery.aname" class="filter-item" filterable clearable placeholder="请选择代理商">
            <el-option
              v-for="item in agent"
              :key="item.value"
              :label="item.label"
              :value="item.label"/>
          </el-select>
          <el-select v-model="agentListQuery.status" class="filter-item" clearable placeholder="请选择提现状态">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter">{{ $t('table.search') }}</el-button>
          <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh('getAgent')">刷新</el-button>
        </div>
        <el-table
          :data="agentList"
          :key="agentTableKey"
          :fit ="true"
          row-key="id"
          element-loading-text="给我一点时间"
          size="mini"
          highlight-current-row>
          <el-table-column align="center" label="id" >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="代理商名称" min-width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.aname }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="申请时间" min-width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.addtime?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="银行卡" min-width="150">
            <template slot-scope="scope">
              <span>{{ bankCard[scope.row.aname] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="支付宝" min-width="150">
            <template slot-scope="scope">
              <span>{{ alipay[scope.row.aname] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="提现金额（元）" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="提现状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status==3?'danger':scope.row.status==2?'success':''">{{ scope.row.status|statusFilter }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="失败原因" width="150">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.reason" trigger="hover" placement="top">
                <p>{{ scope.row.reason }}</p>
                <div slot="reference">
                  <el-tag size="medium">{{ scope.row.reason |filterFun }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" label="审批时间" min-width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.approvaltime?scope.row.approvaltime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.actions')" align="center" min-width="500">
            <template slot-scope="scope">
              <el-button v-if="+scope.row.status===1" type="primary" size="mini" @click="handleUpdate(scope.row)">通过</el-button>
              <el-button v-if="+scope.row.status===1" type="danger" size="mini" @click="handleRefuse(scope.row)">拒绝</el-button>
              <el-tag v-if="+scope.row.status!==1" :type="scope.row.status==3?'danger':''">{{ +scope.row.status ===2?'已通过':'已拒绝' }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            :current-page="agentListQuery.pageNumber"
            :page-sizes="[10,20,30, 50]"
            :page-size="agentListQuery.pageSize"
            :pager-count="5"
            :total="agentTotal"
            background
            layout="total, sizes,jumper, prev, pager, next"
            @size-change="agentSizeChange"
            @current-change="agentCurrentChange"/>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { getInfo } from '@/api/agent'
import { getWithdrawals, getWithdrawalsAgent, getWithdrawalsData, addWithdrawals, updateWithdrawals } from '@/api/withdraw'
import waves from '@/directive/waves' // 水波纹指令
import { withdrawStatusMap, agentArr, withdrawStatus } from '@/utils/mapArr'

export default {
  name: 'Withdraw',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      return withdrawStatusMap[status]
    },
    filterFun(value) {
      if (value && value.length > 12) {
        value = value.substring(0, 12) + '...'
      }
      return value
    }
  },
  data() {
    return {
      tableKey: 0,
      agentTableKey: 0,
      list: [],
      agentList: [],
      total: null,
      agentTotal: null,
      status: withdrawStatus,
      listLoading: true,
      agent: [],
      listQuery: {
        pageNumber: 1,
        pageSize: 10
      },
      aid: sessionStorage.getItem('aid'),
      uid: sessionStorage.getItem('uid'),
      agentListQuery: {
        pageNumber: 1,
        pageSize: 10,
        aname: '',
        status: ''
      },
      bankCard: {},
      alipay: {},
      type: '',
      loading: false
    }
  },
  created() {
    this.getSelect()
    this.getList()
    this.getList('getAgent')
  },
  methods: {
    getSelect() {
      getInfo().then(res => {
        this.type = res.data.type
      })
      agentArr((Arr, bankCard, alipay) => {
        this.agent = Arr
        this.bankCard = bankCard
        this.alipay = alipay
      })
    },
    handleRefresh(type) {
      if (type === 'getAgent') {
        this.agentListQuery.aname = ''
        this.agentListQuery.status = ''
        this.agentListQuery.pageNumber = 1
      } else {
        this.listQuery.pageNumber = 1
      }
      this.getList(type)
    },
    addWithdrawals() {
      getWithdrawalsData({ did: 0, aid: this.aid, uid: this.uid }).then(res => {
        if (+res.status === 0) {
          this.$confirm(`可提现金额为：${res.data}`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            addWithdrawals({ did: 0, aid: this.aid, uid: this.uid }).then(res => {
              this.$message({
                type: +res.status === 0 ? 'success' : 'error',
                message: res.message
              })
              if (+res.status === 0) {
                this.getList()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消  '
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.$confirm('此操作将通过提现, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateWithdrawals({
          did: 0,
          status: 2,
          id: row.id
        }).then(res => {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
          if (+res.status === 0) {
            this.getList('getAgent')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleRefuse(row) {
      this.$prompt('', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入拒绝原因',
        inputErrorMessage: '拒绝理由不能为空',
        inputValidator: function(value) {
          if (value) {
            return true
          } else {
            return false
          }
        }
      }).then(({ value }) => {
        updateWithdrawals({
          did: 0,
          status: 3,
          reason: value,
          id: row.id
        }).then(res => {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
          if (+res.status === 0) {
            this.getList('getAgent')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleFilter() {
      this.agentListQuery.pageNumber = 1
      this.getList('getAgent')
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getList()
    },
    agentSizeChange(val) {
      this.agentListQuery.pageSize = val
      this.getList('getAgent')
    },
    agentCurrentChange(val) {
      this.agentListQuery.pageNumber = val
      this.getList('getAgent')
    },
    getList(type) {
      this.listLoading = true
      const loading = this.$loading({
        lock: true
      })
      if (type === 'getAgent') {
        getWithdrawalsAgent({
          aname: this.agentListQuery.aname,
          pageNumber: this.agentListQuery.pageNumber,
          pageSize: this.agentListQuery.pageSize,
          status: this.agentListQuery.status
        }).then(response => {
          if (+response.code === 1) {
            this.agentList = response.data.rows
            this.agentTotal = +response.data.total
          }
          this.listLoading = false
          loading.close()
          this.$message({
            type: response.code === 1 ? 'success' : 'error',
            message: response.msg
          })
        })
      } else {
        getWithdrawals().then(response => {
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
}
</script>
<style>
.el-range-separator {
  padding: 0;
  width: 24px !important;
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
