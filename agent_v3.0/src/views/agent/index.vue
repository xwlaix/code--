<template>
  <div class="app-container calendar-list-container">
    <p class="warn-content">
      代理商登陆网址:
      <a :href="dls_url" target="_blank">{{ dls_url }}</a>
    </p>
    <div class="filter-container">
      <el-input v-model.trim="listQuery.name" style="width: 200px;" clearable class="filter-item" placeholder="请输入代理商名称" @keyup.enter.native="handleFilter" @clear="handleRefresh"/>
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves class="filter-item" size="small" type="success" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <el-button class="filter-item" size="small" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves class="filter-item" size="small" type="warning " icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      :data="list.slice((listQuery.page-1)*listQuery.limit,listQuery.page*listQuery.limit)"
      :key="tableKey"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <!-- header-cell-class-name ='header-cell-class-name'
     row-class-name='row-class-name' cell-class-name='cell-class-name' -->
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="名称" min-width="190">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录账号" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="银行卡" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.bankCard }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付宝" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.alipay }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.accountType| typeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="返点类型">
        <template slot-scope="scope">
          <span>{{ scope.row.per| perFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="剩余佣金(元)" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账户余额(元)" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="添加时间" min-width="135">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" min-width="500">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="goCard(scope.row)">卡片</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="info" size="mini" @click="handlePassword(scope.row)">密码</el-button>
          <el-button type="info" size="mini" @click="goCommission(scope.row)">佣金</el-button>
          <el-button v-if="scope.row.per == 0||!scope.row.per" type="success" size="mini" @click="goPackage(scope.row)">套餐设置</el-button>
          <el-button v-else type="primary" size="mini" @click="goPre(scope.row)">返点</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :inline="true" :model="temp" label-position="left" label-width="9rem">
        <el-form-item v-if="dialogStatus=='create'" label="代理商登陆账号" prop="username">
          <el-input v-model.trim="temp.username" clearable/>
        </el-form-item>
        <el-form-item v-if="dialogStatus!='password'" label="代理商名称" prop="name">
          <el-input v-model.trim="temp.name" clearable/>
        </el-form-item>
        <el-form-item v-if="dialogStatus!='password'" label="代理商类型" prop="accountType" style="padding-right: 45px;">
          <el-radio v-model="temp.accountType" label="1" style="margin-left:0;width:5rem;white-space: nowrap;">行业用户</el-radio>
          <el-radio v-model="temp.accountType" label="2" style="margin-left:0;width:4rem">渠道用户</el-radio>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'||dialogStatus=='password'" label="代理商密码" prop="password">
          <el-input v-model.trim="temp.password" clearable/>
        </el-form-item>
        <el-form-item v-if="dialogStatus!='password'" label="代理商电话" prop="phone">
          <el-input v-model.trim="temp.phone" clearable/>
        </el-form-item>
        <el-form-item v-if="dialogStatus!='password'" label="代理商地区">
          <el-cascader :options="options" v-model="selectedOptions" size="large" @change="handleChange"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAgent,
  addAgent,
  updateAgent,
  deleteAgent,
  changePassword
} from '@/api/agent'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // 水波纹指令
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data'

export default {
  name: 'Agent',
  directives: {
    waves
  },
  filters: {
    perFilter(per) {
      if (+per === 0 || per == null) {
        per = '套餐返点'
      } else {
        per = '比例返点'
      }
      return per
    },
    typeFilter(accountType) {
      const statusMap = {
        1: '行业用户',
        2: '渠道用户'
      }
      return statusMap[accountType]
    }
  },
  data() {
    return {
      dls_url: document.location.protocol + '//' + window.location.host + '/go',
      options: provinceAndCityData,
      selectedOptions: [],
      tableKey: 0,
      list: [],
      total: null,
      listQuery: {
        page: 1,
        limit: 10,
        name: this.$route.query.name
      },
      temp: {
        id: undefined,
        name: '',
        phone: '',
        username: '',
        province: '',
        city: '',
        accountType: '',
        password: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        name: [
          {
            required: true,
            message: '代理商名称不能为空',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '代理商登陆账号不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '代理商密码不能为空',
            trigger: 'blur'
          }
        ],
        accountType: [
          {
            required: true,
            message: '代理商类型不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getList('all')
  },
  methods: {
    goCard(row) {
      this.$router.push(`/card?aid=${row.id}`)
    },
    goCommission(row) {
      this.$router.push(`/commission?name=${row.name}&aid=${row.id}`)
    },
    goPackage(row) {
      this.$router.push(`/package?type=agent&name=${row.name}&aid=${row.id}`)
    },
    goPre(row) {
      this.$router.push(`/per?aid=${row.id}`)
    },
    handleChange(value) {
      this.temp.province = CodeToText[value[0]]
      this.temp.city = CodeToText[value[1]]
    },
    handleRefresh() {
      this.listQuery.page = 1
      this.listQuery.name = ''
      this.getList('all')
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        phone: '',
        username: '',
        province: '',
        city: '',
        accountType: '',
        password: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true
          })
          addAgent(this.temp).then(res => {
            loading.close()
            if (+res.code === 1) {
              this.getList('all')
              this.dialogFormVisible = false
            } else {
              this.dialogFormVisible = true
            }
          }).catch(() => {
            this.dialogFormVisible = false
          })
        }
      })
    },
    handleUpdate(row) {
      if (TextToCode[row.province]) {
        this.selectedOptions = [TextToCode[row.province].code, (TextToCode[row.province][row.city] ? TextToCode[row.province][row.city].code : '')]
      } else {
        this.selectedOptions = []
      }
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          const loading = this.$loading({
            lock: true
          })
          if (this.dialogStatus === 'password') {
            changePassword({
              id: tempData.id,
              password: tempData.password
            }).then((res) => {
              loading.close()
              this.dialogFormVisible = false
              this.$notify({
                title: '结果',
                message: res.msg,
                type: res.code === 1 ? 'success' : 'error',
                duration: 2000
              })
              loading.close()
            })
            return false
          }
          updateAgent({
            id: tempData.id,
            name: tempData.name,
            phone: tempData.phone,
            accountType: tempData.accountType,
            province: tempData.province,
            city: tempData.city
          }).then((res) => {
            if (+res.code === 1) {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '结果',
              message: res.msg,
              type: res.code === 1 ? 'success' : 'error',
              duration: 2000
            })
            loading.close()
          })
        }
      })
    },
    handlePassword(row) {
      this.dialogStatus = 'password'
      this.temp = Object.assign({}, row) // copy obj
      this.temp.password = ''
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该代理商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const loading = this.$loading({
            lock: true
          })
          deleteAgent({
            id: row.id
          }).then((res) => {
            this.$notify({
              title: '结果',
              message: res.msg,
              type: res.code === 1 ? 'success' : 'error',
              duration: 2000
            })
            if (+res.code === 1) {
              const index = this.list.indexOf(row)
              this.list.splice(index, 1)
            }
            loading.close()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleDownload() {
      const loading = this.$loading({
        lock: true
      })
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          'ID',
          '名称',
          '登录账号',
          '电话',
          '银行卡',
          '支付宝',
          '类型',
          '返点类型',
          '剩余佣金（元）',
          '账户余额（元）',
          '添加时间'
        ]
        const filterVal = [
          'id',
          'name',
          'username',
          'phone',
          'bankCard',
          'alipay',
          'accountType',
          'per',
          'amount',
          'money',
          'addtime'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `代理商信息${new Date().toLocaleDateString()}`
        })
        loading.close()
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getList(type) {
      const loading = this.$loading({
        lock: true
      })
      if (type !== 'all') {
        getAgent({
          name: this.listQuery.name
        }).then(response => {
          if (+response.code === 1) {
            this.list = response.data
            this.total = response.data.length
          }
          this.$message({
            type: response.code === 1 ? 'success' : 'error',
            message: response.msg
          })
          loading.close()
        })
      } else {
        getAgent({
          name: this.listQuery.name
        }).then(response => {
          if (+response.code === 1) {
            this.list = response.data
            this.total = response.data.length
          }
          loading.close()
        })
      }
    }
  }
}
</script>

<style scoped>
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
