<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.aid" class="filter-item" filterable clearable placeholder="请选择代理商" @change="changeAid">
        <el-option
          v-for="item in agent"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.operatorid" class="filter-item" filterable clearable placeholder="请选择供应商套餐批次类型" @clear="handleFilter" @change="handleFilter">
        <el-option
          v-for="item in operatorid"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button v-waves class="filter-item" size="small" type="success" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <el-button v-waves size="small" type="primary" class="filter-item" @click="down">导出</el-button>
    </div>
    <el-table
      :data="items.slice((listQuery.page-1)*listQuery.limit,listQuery.page*listQuery.limit)"
      element-loading-text="给我一点时间"
      style="width: 100%;padding-top: 15px;">
      <el-table-column
        label="排序"
        type="index"
        width="50"/>
      <el-table-column label="供应商套餐批次" align="center" min-width="160">
        <template slot-scope="scope">
          {{ project }}--{{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column label="上级比例" align="center">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column label="下级代理商比例" align="center">
        <template slot-scope="scope">
          {{ listQuery.aid?scope.row.sub:'' }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" min-width="140">
        <template slot-scope="scope">
          <el-button v-permission="['agent.update']" type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-permission="['agent.update']" type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
        </template>

      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getPer, updatePer } from '@/api/agent'
import waves from '@/directive/waves' // 水波纹指令
import { agentArr, operatorArr } from '@/utils/mapArr'
import { parseTime } from '@/utils'

export default {
  name: 'Per',
  directives: {
    waves
  },
  data() {
    return {
      items: [],
      listQuery: {
        page: 1,
        limit: 10,
        aid: this.$route.query.aid ? +this.$route.query.aid : '',
        operatorid: ''
      },
      agent: '',
      total: null,
      operatorid: '',
      project: sessionStorage.getItem('project'),
      per: {},
      superiorPer: {},
      subordinatePre: {}
    }
  },
  created() {
    this.getPerList()
    setTimeout(() => {
      this.changeAid(this.listQuery.aid)
    }, 1000)
  },
  methods: {
    changeAid(value, operatorid) {
      this.items = []
      this.subordinate = Object.assign(this.per, JSON.parse(this.per[this.listQuery.aid]))
      for (const [k, v] of Object.entries(this.superiorPer)) {
        if (v) {
          if (+operatorid) {
            if (+operatorid === +k) {
              if (this.subordinate[k]) {
                this.items.push({ key: k, value: v, sub: this.subordinate[k] })
              } else {
                this.items.push({ key: k, value: v, sub: 0 })
              }
            }
          } else {
            if (this.subordinate[k]) {
              this.items.push({ key: k, value: v, sub: this.subordinate[k] })
            } else {
              this.items.push({ key: k, value: v, sub: 0 })
            }
          }
        }
      }
      this.total = this.items.length
    },
    refresh() {
      agentArr((res, bankCard, alipay, aname, per) => {
        this.agent = res
        this.per = Object.assign(this.per, per)
      })
    },
    getPerList() {
      operatorArr(res => {
        this.operatorid = res
      })
      getPer().then(res => {
        this.superiorPer = Object.assign(this.superiorPer, JSON.parse(res.data))
        this.refresh()
      })
    },
    down() {
      this.downloadLoading = true
      const loading = this.$loading({ fullscreen: false, target: document.querySelector('.app-container') })
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['供应商套餐批次', '上级比例', '下级代理商比例']
        const filterVal = ['key', 'value', 'sub']
        const list = this.items
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `下级返点比例${new Date().toLocaleDateString()}`,
          autoWidth: this.autoWidth
        })
        loading.close()
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleUpdate(row) {
      this.$prompt('', `${this.project}--${row.key}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入该批次设定的比例',
        inputValue: row.sub
      })
        .then(({ value }) => {
          if (+value === +row.sub) {
            this.$message({
              type: 'info',
              message: '没有修改'
            })
          } else {
            var update = {}
            var key = row.key
            update[key] = value
            var updataePer = JSON.stringify(
              Object.assign(this.subordinatePre, update)
            )
            updatePer({ id: this.listQuery.aid, per: updataePer }).then(
              res => {
                if (+res.status === 0) {
                  this.refresh()
                  row.sub = value
                }
                this.$message({
                  type: +res.status === 0 ? 'success' : 'error',
                  message: res.message
                })
              }
            )
          }
        })
        .catch(() => {})
    },
    handleDelete(row) {
      this.$confirm('此操作将重置该批次比例, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var update = {}
          var key = row.key
          update[key] = 0
          var updataePer = JSON.stringify(
            Object.assign(this.subordinatePre, update)
          )
          updatePer({ aid: this.listQuery.aid, per: updataePer }).then(
            res => {
              if (+res.status === 0) {
                this.refresh()
                row.sub = 0
              }
              this.$message({
                type: +res.status === 0 ? 'success' : 'error',
                message: res.message
              })
            }
          )
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
    },
    handleRefresh() {
      this.listQuery.operatorid = ''
      this.refresh()
      this.changeAid(this.listQuery.aid)
      this.listQuery.page = 1
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    },
    handleFilter() {
      this.changeAid(this.listQuery.aid, this.listQuery.operatorid)
      this.listQuery.page = 1
    }
  }
}
</script>
