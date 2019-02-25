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
      <el-input v-model.trim="listQuery.applicationName" clearable class="filter-item" style="width: 200px;" placeholder="请输入申请人" @keyup.enter.native="handleFilter"/>
      <el-input v-model.trim="listQuery.auditorName" clearable class="filter-item" style="width: 200px;" placeholder="请输入审核人" @keyup.enter.native="handleFilter"/>
      <el-input v-model.trim="listQuery.orderNo" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单号" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" class="filter-item" filterable clearable placeholder="请选择退款状态">
        <el-option
          v-for="item in statusSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.refundType" class="filter-item" filterable clearable placeholder="请选择退款类型">
        <el-option
          v-for="item in refundTypeSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter"/>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-waves size="small" type="warning " class="filter-item" icon="el-icon-download" @click="handleDownload"/>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      class="table"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <el-table-column show-overflow-tooltip align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="订单号" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="申请人姓名" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.applicationName }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="审核人姓名" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.auditorName }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="退款金额(元)" min-width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.refundFee }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="申请时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="审核时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.auditorTime }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="状态" min-width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==2?'success':'danger'">{{ statusMap[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="理由">
        <template slot-scope="scope">
          <span>{{ scope.row.reason }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="退款类型" min-width="150">
        <template slot-scope="scope">
          <span>{{ refundTypeMap[scope.row.refundType] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="left" show-overflow-tooltip min-width="100px">
        <template slot-scope="scope">
          <el-button v-permission="['kuyuplat:order:refundApproval']" v-if="scope.row.status==1" type="danger" size="mini" @click="approvalRefund(scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" title="退款审核">
      <el-form ref="dataForm" :rules="rules" :model="temp" :inline="true" class="dialog" label-position="right" label-width="9rem">
        <el-form-item label="请选择审核状态" prop="status">
          <el-radio v-model="temp.status" label="2" style="margin-left:10px;width:90px">通过</el-radio>
          <el-radio v-model="temp.status" label="3" style="margin-left:10px;width:90px">拒绝</el-radio>
        </el-form-item>
        <el-form-item v-show="temp.status==3" label="拒绝理由">
          <el-input v-model.trim="temp.reason" clearable placeholder="拒绝理由"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
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
  searchRefundApplications, approvalRefund
} from '@/api/refund'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'Refund',
  directives: {
    waves
  },
  data() {
    return {
      pickerOptions: this.processDate(),
      tableKey: 0,
      list: [],
      total: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        orderNo: '',
        applicationName: '',
        auditorName: '',
        status: '',
        refundType: '',
        starttime: '',
        endtime: ''
      },
      statusMap: {
        1: '申请成功',
        2: '退款成功',
        3: '退款失败',
        4: '退款关闭'
      },
      refundTypeMap: {
        1: '微信退款', 2: '余额退款', 3: '其他(微信 + 余额)'
      },
      statusSelect: [
        {
          value: 1,
          label: '申请成功'
        }, {
          value: 2,
          label: '退款成功'
        }, {
          value: 3,
          label: '退款失败'
        }, {
          value: 4,
          label: '退款关闭'
        }
      ],
      refundTypeSelect: [
        {
          value: '1',
          label: '微信退款'
        }, {
          value: '2',
          label: '余额退款'
        }, {
          value: '3',
          label: '其他(微信+余额)'
        }
      ],
      dialogFormVisible: false,
      rules: {
        status: [
          {
            required: true,
            message: '请选择审核状态',
            trigger: 'blur'
          }
        ]
      },
      temp: {
        id: '',
        status: '',
        reason: ''
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    approvalRefund(row) {
      this.temp.id = row.id
      this.status = ''
      this.reason = ''
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          if (+this.temp.status === 3 && !this.temp.reason) {
            this.$message({
              type: 'error',
              message: '拒绝请填写理由！'
            })
            return false
          }
          approvalRefund(this.temp, '.el-dialog__footer').then(res => {
            this.$message({
              type: +res.status === 0 ? 'success' : 'error',
              message: res.message
            })
            if (res.status === 0) {
              this.dialogFormVisible = false
              this.getList('sec')
            }
          })
        }
      })
    },
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
    // updateStatus(row) {
    //   this.$confirm('此操作将该订单修改为订单成功, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     searchRefundApplications({ id: row.id, status: 3 }, '.el-message-box').then(res => {
    //       this.$message({
    //         type: +res.status === 0 ? 'success' : 'error',
    //         message: res.message
    //       })
    //       if (+res.status === 0) {
    //         row.status = 3
    //         for (const v of this.list) {
    //           if (+v.id === +row.id) {
    //             const index = this.list.indexOf(v)
    //             this.list.splice(index, 1, row)
    //             break
    //           }
    //         }
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消'
    //     })
    //   })
    // },
    handleRefresh() {
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
        orderNo: '',
        applicationName: '',
        auditorName: '',
        status: '',
        refundType: '',
        starttime: '',
        endtime: ''
      }
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
      // downOrder(this.listQuery, '.table').then(res => {
      //   if (+res.status === 0) {
      //     window.open(res.data.url)
      //   }
      //   this.$message({
      //     type: res.status === 0 ? 'success' : 'error',
      //     message: res.message
      //   })
      // })
    },
    getList() {
      searchRefundApplications(this.listQuery, '.table').then(res => {
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

