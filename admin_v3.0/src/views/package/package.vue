<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input v-model.trim="listQuery.name" class="filter-item" clearable style="width: 200px;" placeholder="请输入自定义套餐名称" @clear="handleFilter" @keyup.enter.native="handleFilter"/>
      <el-select v-if="LoginType==='agent'" v-model="listQuery.aid" class="filter-item" filterable clearable placeholder="请选择代理商">
        <el-option
          v-for="item in agent"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.operatorid" class="filter-item" filterable clearable placeholder="请选择供应商批次类型" @clear="handleFilter">
        <el-option
          v-for="item in operatorid"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.package_type" class="filter-item" clearable placeholder="请选择运营商类型" @clear="handleFilter">
        <el-option
          v-for="item in package_type"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>

      <el-select v-if="LoginType!=='agent'" v-model="listQuery.type" class="filter-item" clearable placeholder="套餐类型" @clear="handleFilter">
        <el-option
          v-for="item in type"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button v-waves class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves class="filter-item" size="small" type="success" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <el-button v-waves class="filter-item" size="small" type="warning " icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      :data="list.slice((listQuery.page-1)*listQuery.limit,listQuery.page*listQuery.limit)"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <!-- header-cell-class-name ='header-cell-class-name'
     row-class-name='row-class-name' cell-class-name='cell-class-name' -->
      <el-table-column align="center" label="套餐ID">
        <template slot-scope="scope">
          <span>{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="LoginType=='agent'" align="center" label="代理商">
        <template slot-scope="scope">
          <span>{{ scope.row.aname }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="自定义套餐名称" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商套餐批次" >
        <template slot-scope="scope">
          <span>{{ project }}--{{ scope.row.operatorid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="原价:（元）" min-width="90" >
        <template slot-scope="scope">
          <span>{{ scope.row.old_price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结算价:（元）" min-width="100" >
        <template slot-scope="scope">
          <span>{{ scope.row.parentprice }}</span>
          <!-- <template v-if="scope.row.editParentPrice" @click.self="scope.row.editParentPrice=false">
            <el-input v-model="scope.row.parentprice" class="edit-input" size="small"/>
            <i class="el-icon-circle-close-outline" @click.stop="cloesInline(scope.row)"/>
            <i class="el-icon-circle-check-outline" @click.stop="updateInline(scope.row)"/>
          </template> -->
          <!-- <span v-if="!scope.row.editParentPrice" @click="scope.row.editParentPrice=true">{{ scope.row.parentprice }} <i v-if="LoginType!=='agent'" class="el-icon-edit" @click="scope.row.editParentPrice=true"/></span> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="自主定价:（元）" min-width="110" >
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="套餐类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type| typeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="LoginType!=='agent'" align="center" label="特殊套餐">
        <template slot-scope="scope">
          <el-tag :type="scope.row.spl_status==1?'':'danger'">{{ scope.row.spl_status==1?'普通':'特殊' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="运营商类型">
        <template slot-scope="scope">
          <span>{{ scope.row.package_type==1?'移动':scope.row.package_type==2?'电信':'联通' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==1?'success':'danger'">{{ scope.row.status==1?'已上架':'已下架' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="添加时间" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime ?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="LoginType!=='agent'" align="center" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column> -->

      <el-table-column :label="$t('table.actions')" align="center" min-width="140">
        <template slot-scope="scope">
          <el-button v-loading="loading" :class="{ handleUpdate: scope.$index==0 }" type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-loading="loading" v-if="+scope.row.status=== 2&&LoginType!=='agent'" type="success" size="mini" @click="handleStatus(scope.row)">上架</el-button>
          <el-button v-loading="loading" v-if="+scope.row.status=== 1&&LoginType!=='agent'" type="danger" size="mini" @click="handleStatus(scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :pager-count="5"
        :total="total"
        background
        layout="total, sizes,jumper, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :inline="true" :model="temp" label-position="left" label-width="9rem">
        <el-form-item v-if="LoginType==='agent'" label="结算价:（元）" prop="parentprice">
          <el-input v-model.trim="temp.parentprice" clearable/>
        </el-form-item>
        <el-form-item label="自主定价:（元）" prop="price">
          <el-input v-model.trim="temp.price" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-loading="loading" type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getPackage, getAgentPackage, updatePackage } from '@/api/package'
import { parseTime } from '@/utils'
import { typeMap, package_type, type, agentArr, operatorArr } from '@/utils/mapArr'
import waves from '@/directive/waves' // 水波纹指令
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { packageList } from '../guide/defineSteps'
export default {
  name: 'Package',
  directives: {
    waves
  },
  filters: {
    typeFilter(accountType) {
      return typeMap[accountType]
    }
  },
  data() {
    return {
      driver: null,
      LoginType: this.$route.query.type,
      tableKey: 0,
      list: [],
      project: sessionStorage.getItem('project'),
      total: null,
      listLoading: true,
      agent: [],
      operatorid: [],
      package_type,
      type,
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        aid: this.$route.query.aid,
        pname: '',
        package_type: '',
        type: '',
        operatorid: ''
      },
      oname: '',
      loading: false,
      temp: {
        id: undefined,
        parentprice: '',
        price: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        parentprice: [
          {
            required: true,
            message: '结算价不能为空',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '自主定价不能为空',
            trigger: 'blur'
          }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getSelect()
    this.getList(this.LoginType)
  },
  updated() {
    this.driver = new Driver({
      opacity: 0.50,
      doneBtnText: '完成', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      stageBackground: '#ffffff', // Background color for the staged behind highlighted element
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步',
      onReset: (Element) => {
        this.$router.push(`/package`)
      } // Called when overlay is about to be cleared
    })
    if (this.$route.query.guide) {
      this.driver.defineSteps(packageList)
      this.driver.start()
    }
  },
  methods: {
    getSelect() {
      agentArr(res => {
        this.agent = res
      })
      operatorArr(res => {
        this.operatorid = res
      })
    },
    handleRefresh() {
      this.listQuery.page = 1
      this.listQuery.name = ''
      this.listQuery.package_type = ''
      this.listQuery.type = ''
      this.listQuery.operatorid = ''
      this.listQuery.aid = ''
      this.getList(this.LoginType)
    },
    // cloesInline(row) {
    //   this.$nextTick(() => {
    //     row.editParentPrice = false
    //   })
    //   console.log(1)
    // },
    // updateInline(row) {
    //   this.$nextTick(() => {
    //     row.editParentPrice = false
    //   })
    // },
    handleFilter() {
      this.listQuery.page = 1
      this.getList(this.LoginType)
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
        price: '',
        parentprice: '',
        status: ''
      }
    },
    handleUpdate(row) {
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
          updatePackage({
            id: tempData.id,
            parentprice: tempData.parentprice,
            price: tempData.price
          }).then(() => {
            loading.close()
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleStatus(row) {
      this.$confirm(
        `此操作将${+row.status === 2 ? '上架' : '下架'}套餐, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const loading = this.$loading({
            lock: true,
            fullscreen: false
          })
          row.status = +row.status === 2 ? 1 : 2
          updatePackage({
            id: row.id,
            status: row.status
          }).then(() => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            loading.close()
            for (const v of this.list) {
              if (v.id === row.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, row)
                break
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    handleDownload() {
      const loading = this.$loading({
        lock: true,
        fullscreen: false
      })
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '套餐ID',
          '自定义套餐名称',
          '供应商套餐批次',
          '原价:（元）',
          '结算价:（元）',
          '自主定价:（元）',
          '套餐类型（ 1.月包 2.季包 3.年包 4.基本套餐 5.半年包 6.累计月包 ）',
          '特殊套餐（1.普通 2.特殊',
          '运营商类型（1.移动 2.电信 3.联通 ）',
          '状态（1.已上架 2.已下架 ）',
          '添加时间',
          '排序'
        ]
        const filterVal = [
          'pid',
          'name',
          'operatorid',
          'old_price',
          'parentprice',
          'price',
          'type',
          'spl_status',
          'package_type',
          'status',
          'addtime',
          'sort'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `套餐信息${new Date().toLocaleDateString()}`
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
      this.listLoading = true
      const loading = this.$loading({
        lock: true
      })
      if (type !== 'agent') {
        getPackage({
          name: this.listQuery.name,
          package_type: this.listQuery.package_type,
          type: this.listQuery.type,
          operatorid: this.listQuery.operatorid
        }).then(response => {
          this.listLoading = false
          loading.close()
          this.$message({
            type: response.code === 1 ? 'success' : 'error',
            message: response.msg
          })
          if (+response.code === 1) {
            this.list = response.data
            this.total = response.data.length
          }
        })
      } else {
        getAgentPackage({
          aid: this.listQuery.aid,
          pname: this.listQuery.name,
          package_type: this.listQuery.package_type,
          operatorid: this.listQuery.operatorid
        }).then(response => {
          this.listLoading = false
          loading.close()
          this.$message({
            type: response.code === 1 ? 'success' : 'error',
            message: response.msg
          })
          if (+response.code === 1) {
            this.list = response.data
            this.total = response.data.length
          }
        })
      }
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
