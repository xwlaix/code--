<template>
  <div class="app-container calendar-list-container">
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
      <el-select v-model="listQuery.etime" class="filter-item" clearable placeholder="请选择服务期止时间">
        <el-option
          v-for="item in etime"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input v-model.trim="listQuery.card" class="filter-item" style="width:220px" clearable placeholder="请输入卡号"/>
      <el-input v-model.trim="listQuery.remarks" class="filter-item" style="width:130px" clearable placeholder="请输入备注"/>
      <el-select v-model="listQuery.aid" class="filter-item" filterable clearable placeholder="请选择代理商">
        <el-option
          v-for="item in agent"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.operatorid" class="filter-item" filterable clearable placeholder="请选择供应商套餐批次">
        <el-option
          v-for="item in operatorid"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.operator_type" class="filter-item" clearable placeholder="请选择运营商类型">
        <el-option
          v-for="item in operator_type"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>

      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves class="filter-item" size="small" type="success" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <el-button v-waves class="filter-item" size="small" type="warning " icon="el-icon-download" @click="handleDownload">导出</el-button>
      <el-button v-waves class="filter-item" size="small" type="warning " icon="el-icon-download" @click="webDownload">前端导出</el-button>
      <el-button v-waves v-if="type!=3" class="filter-item" size="small" type="danger " @click="chooseCard">勾选分卡</el-button>
      <el-button v-waves v-if="type!=3" class="filter-item" size="small" type="danger " @click="delCard">勾选回收</el-button>
      <el-button v-waves v-if="type!=3" class="filter-item" size="small" type="warning " @click="excelCard">Excle分卡</el-button>
      <el-button v-waves v-if="type!=3" class="filter-item" size="small" type="success " @click="operateList">操作记录</el-button>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      ref="multipleTable"
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row
      @cell-click="toggleSelection"
      @selection-change="select">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column align="center" label="iccid" min-width="200">
        <template slot-scope="scope">
          <span style="color:#66b1ff" type="text" @click="jump(scope.row.iccid)">{{ scope.row.iccid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="接入号" min-width="140">
        <template slot-scope="scope">
          <span style="color:#66b1ff" @click="jump(scope.row.tel)">{{ scope.row.tel }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="虚拟号" min-width="120">
        <template slot-scope="scope">
          <span style="color:#66b1ff" @click="jump(scope.row.number)">{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="卡片余额（元）" min-width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已用流量" min-width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.useflow| useflowFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="卡状态" min-width="105">
        <template slot-scope="scope">
          <el-tag :type="scope.row.card_status==1?'':scope.row.card_status==2?'success':'warning'">{{ scope.row.card_status| cardStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="实名状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.real_status==1?'danger':'success'">{{ scope.row.real_status==1?'未认证':'认证' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="运营商类型">
        <template slot-scope="scope">
          <span>{{ scope.row.operator_type==1?'移动':scope.row.operator_type==2?'电信':'联通' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="代理商名称" min-width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.aid?scope.row.aname:'' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="供应商套餐批次" >
        <template slot-scope="scope">
          <span>{{ project }}--{{ scope.row.oid }}</span>
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

      <el-table-column align="center" label="添加时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结束时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.endtime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" min-width="320">
        <template slot-scope="scope">
          <el-button v-loading="loading" type="primary" size="mini" @click="refresh(scope.row)">刷新</el-button>
          <el-button v-loading="loading" v-if="remarksType" type="success" size="mini" @click="remarks(scope.row)">备注</el-button>
          <el-button v-loading="loading" v-if="type==1" type="success" size="mini" @click="unbind(scope.row)">解绑</el-button>
          <el-button v-loading="loading" type="warning" size="mini" @click="password(scope.row)">密码</el-button>
          <el-button v-loading="loading" v-if="type!=3" type="danger" size="mini" @click="recycle(scope.row)">回收</el-button>
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
    <el-dialog
      :visible.sync="dialogVisible"
      title="提示">
      <el-select v-model="aid" class="filter-item" filterable clearable placeholder="请选择代理商">
        <el-option
          v-for="item in agent"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assign">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCard, deleteCard, downLoadCard, updateRemarks, changePassword, divideCardJava } from '@/api/card'
import { getInfo } from '@/api/cardInfo'
import waves from '@/directive/waves' // 水波纹指令
import { cardStatusMap, package_type, etime, agentArr, operatorArr } from '@/utils/mapArr'
import { toSize } from '@/utils'
import { changeUnbind } from '@/api/unbind'

export default {
  name: 'Card',
  directives: {
    waves
  },
  filters: {
    useflowFilter(value) {
      return toSize(+value * 1024)
    },
    cardStatusFilter(card_status) {
      return cardStatusMap[card_status]
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
      pickerOptions: this.processDate(),
      tableKey: 0,
      list: [],
      project: sessionStorage.getItem('project'),
      total: null,
      listLoading: true,
      agent: [],
      operatorid: [],
      aid: '',
      aname: '',
      operator_type: package_type,
      etime,
      remarksType: [733, 1180].find((n) => n === +sessionStorage.getItem('aid')),
      type: sessionStorage.getItem('type'),
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        starttime: null,
        endtime: null,
        etime: '',
        aid: this.$route.query.aid,
        operatorid: '',
        operator_type: '',
        remarks: '',
        card: '',
        card_type: ''
      },
      aidArr: {},
      oname: '',
      loading: false,
      downloadLoading: false,
      dialogVisible: false,
      selectArr: []
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
    select(selection, row) {
      this.selectArr = selection
    },
    toggleSelection(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    chooseCard() {
      if (this.selectArr.length === 0) {
        this.$message.error('请选中后提交！')
        return false
      }
      this.dialogVisible = true
    },
    delCard() {
      if (this.selectArr.length === 0) {
        this.$message.error('请选中后提交！')
        return false
      }
      const loading = this.$loading({
        lock: true
      })
      this.selectArr.map((v, i) => {
        deleteCard({ id: v.id }).then(res => {
          if (i === this.selectArr.length - 1) {
            loading.close()
            this.dialogVisible = false
          }
          this.$message({
            type: res.code === 1 ? 'success' : 'error',
            message: res.msg
          })
          if (+res.code === 1) {
            v.aid = ''
            v.aname = ''
            for (const data of this.list) {
              if (data.id === v.id) {
                const index = this.list.indexOf(data)
                this.list.splice(index, 1, v)
              }
            }
          }
        })
      })
    },
    assign() {
      if (this.selectArr.length === 0) {
        this.$message.error('请选中后提交！')
        return false
      }
      if (!this.aid) {
        this.$message.error('请选择要分配的代理商后提交！')
        return false
      }
      const loading = this.$loading({
        lock: true
      })
      this.selectArr.map((v, i) => {
        divideCardJava({ uid: sessionStorage.getItem('uid'), did: 0, iccid: v.iccid, sid: this.aid, type: sessionStorage.getItem('type'), aid: sessionStorage.getItem('aid') })
          .then(res => {
            if (i === this.selectArr.length - 1) {
              loading.close()
              this.dialogVisible = false
            }
            this.$message({
              type: +res.status === 0 ? 'success' : 'error',
              message: res.message
            })
            if (+res.status === 0) {
              v.aid = this.aid
              v.aname = this.aidArr[this.aid]
              for (const data of this.list) {
                if (data.id === v.id) {
                  const index = this.list.indexOf(data)
                  this.list.splice(index, 1, v)
                }
              }
            }
          })
      })
    },
    excelCard() {
      this.$router.push('/excelCard')
    },
    operateList() {
      this.$router.push('/operateList')
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
      operatorArr(res => {
        this.operatorid = res
      })
      agentArr((res, bankCard, alipay, aname, per, aid) => {
        this.agent = res
        this.aidArr = aid
      })
    },
    handleRefresh() {
      this.listQuery.pageNumber = 1
      this.listQuery.starttime = null
      this.listQuery.endtime = null
      this.listQuery.etime = ''
      this.listQuery.aid = ''
      this.listQuery.operatorid = ''
      this.listQuery.operator_type = ''
      this.listQuery.remarks = ''
      this.listQuery.card = ''
      this.listQuery.card_type = ''
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
      this.listQuery.page = val
      this.getList()
    },
    refresh(row) {
      const loading = this.$loading({
        lock: true
      })
      getInfo({ card: row.iccid || row.tel }).then(res => {
        loading.close()
        this.$message({
          type: res.code === 1 ? 'success' : 'error',
          message: res.msg
        })
        if (+res.code === 1) {
          row.card_status = res.data.cardstatus ? res.data.cardstatus.toString() : ''
          for (const v of this.list) {
            if (v.id === row.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, row)
              break
            }
          }
        }
      })
    },
    recycle(row) {
      this.$confirm('此操作将回收卡片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true
        })
        deleteCard({ id: row.id }).then(res => {
          loading.close()
          this.$message({
            type: res.code === 1 ? 'success' : 'error',
            message: res.msg
          })
          if (+res.code === 1) {
            row.aid = ''
            row.aname = ''
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
    unbind(row) {
      if (+row.operator_type !== 2) {
        this.$message({
          type: 'error',
          message: '解绑功能仅支持电信卡！'
        })
        return false
      }
      this.$confirm('此操作将进行机卡, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true
        })
        changeUnbind({
          cards: row.iccid || row.tel
        }).then(res => {
          loading.close()
          this.$message({
            type: res.code === 1 ? 'success' : 'error',
            message: res.msg
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    remarks(row) {
      this.$prompt('', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入卡片备注',
        inputErrorMessage: '卡片备注不能为空',
        inputValue: row.remarks,
        inputValidator: function(value) {
          if (value) {
            return true
          } else {
            return false
          }
        }
      }).then(({ value }) => {
        updateRemarks({
          remarks: value,
          id: row.id
        }).then(res => {
          this.$message({
            type: +res.code === 1 ? 'success' : 'error',
            message: res.msg
          })
          if (+res.code === 1) {
            row.remarks = value
            for (const v of this.list) {
              if (v.id === row.id) {
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
    password(row) {
      this.$prompt('', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入卡片密码',
        inputErrorMessage: '卡片密码不能为空',
        inputValidator: function(value) {
          if (value) {
            return true
          } else {
            return false
          }
        }
      }).then(({ value }) => {
        changePassword({
          password: value,
          id: row.id
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    webDownload(pageSize) {
      const loading = this.$loading({
        lock: true
      })
      getCard({
        starttime: this.listQuery.starttime,
        endtime: this.listQuery.endtime,
        etime: this.listQuery.etime,
        aid: this.listQuery.aid,
        operator_type: this.listQuery.operator_type,
        operatorid: this.listQuery.operatorid,
        remarks: this.listQuery.remarks,
        card_type: this.listQuery.card_type,
        pageSize: pageSize,
        pageNumber: 1
      }).then(response => {
        loading.close()
        if (+response.code === 1) {
          const list = response.data.rows
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              'iccid',
              '接入号',
              '虚拟号',
              '卡片余额（元）',
              '已用流量',
              '卡状态',
              '实名状态',
              '运营商类型',
              '代理商名称',
              '供应商套餐批次',
              '备注',
              '添加时间',
              '结束时间'
            ]
            const filterVal = [
              'iccid',
              'tel',
              'number',
              'amount',
              'useflow',
              'card_status',
              'real_status',
              'operator_type',
              'aname',
              'oid',
              'remarks',
              'addtime',
              'endtime'
            ]
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: `卡片信息${new Date().toLocaleDateString()}`
            })
            this.$message({
              type: 'success',
              message: response.msg
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '卡片数量过多'
          })
          this.$prompt('', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPlaceholder: '请输入到处卡片数量',
            inputErrorMessage: '卡片数量填写不正确',
            inputValue: 10000,
            inputValidator: function(value) {
              if (/(^[1-9]\d*$)/.test(+value)) {
                return true
              } else {
                return false
              }
            }
          }).then(({ value }) => {
            this.webDownload(value)
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
          if (j === 'card_status') {
            return cardStatusMap[v[j]]
          } else if (j === 'real_status') {
            return +v[j] === 1 ? '未认证' : '认证'
          } else if (j === 'operator_type') {
            return +v[j] === 1 ? '移动' : +v[j] === 2 ? '电信' : '联通'
          } else if (j === 'oid') {
            return this.project + v[j]
          } else if (j === 'useflow') {
            return toSize(+v[j] * 1024)
          } else {
            return v[j]
          }
        })
      )
    },
    handleDownload() {
      const loading = this.$loading({
        lock: true,
        fullscreen: false
      })
      downLoadCard({
        etime: this.listQuery.etime,
        starttime: this.listQuery.starttime,
        endtime: this.listQuery.endtime,
        aid: this.listQuery.aid,
        operatorid: this.listQuery.operatorid,
        remarks: this.listQuery.remarks,
        card: this.listQuery.card,
        card_type: this.listQuery.card_type,
        operator_type: this.listQuery.operator_type
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
      loading.close()
    },

    getList() {
      this.listLoading = true
      const loading = this.$loading({
        lock: true
      })
      getCard({
        starttime: this.listQuery.starttime,
        endtime: this.listQuery.endtime,
        etime: this.listQuery.etime,
        aid: this.listQuery.aid,
        operator_type: this.listQuery.operator_type,
        operatorid: this.listQuery.operatorid,
        remarks: this.listQuery.remarks,
        card_type: this.listQuery.card_type,
        pageSize: this.listQuery.pageSize,
        pageNumber: this.listQuery.pageNumber,
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
<style>
/* .edit-input .el-input__inner{
  padding:0 3px!important;
  width: 50px;
  float: left;
} */
</style>

<style scoped>

.el-icon-circle-check-outline {
  position: absolute;
  right: 4px;
  top: 16px;
}
.el-icon-circle-close-outline {
  position: absolute;
  right: -10px;
  top: 16px;
}
.el-button + .el-button {
  margin-left: 0;
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
