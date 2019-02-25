<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-show="secMore"
        v-model="listQuery.starttime"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="开始日期"
        class="filter-item"
      />
      <el-date-picker
        v-show="secMore"
        v-model="listQuery.endtime"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="结束日期"
        class="filter-item"
      />
      <el-select v-show="secMore" v-model="listQuery.aid" class="filter-item" filterable clearable placeholder="请选择操作者">
        <el-option
          v-for="item in agentSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="listQuery.status" class="filter-item" filterable clearable placeholder="请选择状态">
        <el-option
          v-for="item in status"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter"/>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-waves v-if="device==='mobile'" size="small" type="warning " class="filter-item" @click="secMore=!secMore">{{ secMore?'隐藏':'查找' }}</el-button>
      <el-button v-waves v-permission="['kuyuplat:problem:list']" v-show="secMore" class="filter-item" size="small" type="warning " @click="jump">工单问题列表</el-button>
      <el-button v-waves v-permission="['kuyuplat:export:workOrder']" v-show="secMore" class="filter-item" size="small" type="warning " @click="handleDownload">Java导出</el-button>
    </div>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <el-table-column show-overflow-tooltip align="center" label="id">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="提交者" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="添加时间" min-width="135">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="类型" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.type==1?'单个':'批量' }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="iccid" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.iccid }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="原因" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.reason }}</span>
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
      <el-table-column align="center" label="处理说明" width="150">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.explain" trigger="hover" placement="top">
            <p>{{ scope.row.explain }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.explain |filterFun }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="状态" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.status==1?'待处理':'已处理' }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="处理者" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.uname }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="完成时间" min-width="135">
        <template slot-scope="scope">
          <span>{{ scope.row.finishTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" show-overflow-tooltip align="center" min-width="240">
        <template slot-scope="scope">
          <el-button v-permission="['kuyuplat:worklist:handle']" v-if="scope.row.type==2" type="primary" size="mini" @click="handleWorkDownload(scope.row)">下载</el-button>
          <el-upload
            v-permission="['kuyuplat:worklist:batchHandle']"
            v-if="scope.row.type==2&&scope.row.status==1"
            ref="upload"
            :limit="1"
            :file-list ="fileList"
            :http-request = "upload"
            :show-file-list = "false"
            action=""
            class="form"
            style="display:inline-block;vertical-align: bottom;">
            <el-button size="mini" type="warning" @click="getUploadId(scope.row.id)">上传</el-button>
          </el-upload>
          <el-button v-permission="['kuyuplat:worklist:handle']" v-if="scope.row.type==1&&scope.row.status==1" type="success" size="mini" @click="handleAlone(scope.row)">处理</el-button>
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
import waves from '@/directive/waves' // 水波纹指令
import { searchWorklist, exportWorkOrder, workHandle } from '@/api/orderWork'
import { uploadFileFinally } from '@/utils'
import { agentArr } from '@/utils/mapArr'
export default {
  name: 'WorkOrder',
  directives: {
    waves
  },
  filters: {
    filterFun: function(value) {
      if (value && value.length > 12) {
        value = value.substring(0, 12) + '...'
      }
      return value
    }
  },
  data() {
    return {
      secMore: true,
      pickerOptions: this.processDate(),
      listQuery: {
        starttime: '',
        endtime: '',
        status: '',
        aid: '',
        pageNo: 1,
        pageSize: 10
      },
      id: '',
      fileList: [],
      status: [
        {
          value: '1',
          label: '待处理'
        },
        {
          value: '2',
          label: '已处理'
        }
      ],
      agentSelect: [],
      list: [],
      tableKey: 0,
      total: 0
    }
  },
  computed: {
    device() {
      return this.$store.getters.device
    }
  },
  created() {
    if (this.device === 'mobile') {
      this.secMore = false
    }
    agentArr((agentSelect) => {
      this.agentSelect = agentSelect
    })
    this.getList()
  },
  methods: {
    jump() {
      this.$router.push('/business/orderWorkProblems')
    },
    getUploadId(id) {
      this.id = id
    },
    upload(param) {
      const loading = this.$loading({ target: '.form' })
      uploadFileFinally('/plat/business/v4/uploadWorklist', param, { id: this.id }).then(res => {
        const data = res.data
        this.$message({
          type: +data.status === 0 ? 'success' : 'error',
          message: data.message
        })
        if (res.status === 0) {
          for (const v of this.list) {
            if (v.id === this.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1)
              break
            }
          }
        }
        this.fileList = []
        loading.close()
      }).catch(() => {
        this.fileList = []
        loading.close()
        this.$message({
          type: 'error',
          message: '请求失败！'
        })
      })
    },
    handleAlone(row) {
      this.$prompt('', '请输入处理说明!', {
        inputValue: '',
        inputPlaceholder: '处理说明',
        inputErrorMessage: '请输入处理说明',
        inputValidator: function(value) {
          if (value) {
            return true
          } else {
            return false
          }
        }
      }).then(({ value }) => {
        workHandle({ explain: value, id: row.id }).then(res => {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
          if (res.status === 0) {
            for (const v of this.list) {
              if (v.id === row.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1)
                break
              }
            }
          }
        })
      }).catch({})
    },
    handleWorkDownload(val) {
      window.open(val.uploadFile, '_self')
    },
    handleDownload() {
      this.$confirm('此操作将导出工单记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        exportWorkOrder(this.listQuery, '.filter-container').then(res => {
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
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          return new Date(self.listQuery.starttime).getTime() > time.getTime()
        }
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList('sec')
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList('sec')
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList('sec')
    },
    handleRefresh() {
      this.listQuery = {
        starttime: '',
        endtime: '',
        status: '',
        aid: '',
        pageNo: 1,
        pageSize: 10
      }
      this.getList('sec')
    },
    getList(type) {
      searchWorklist(this.listQuery).then(res => {
        if (+res.status === 0) {
          this.list = res.data.rows
          this.total = +res.data.total
        }

        if (type === 'sec') {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
        }
      })
    }
  }
}
</script>
