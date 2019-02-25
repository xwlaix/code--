<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input v-model.trim="listQuery.card" clearable class="filter-item" style="width: 220px;" placeholder="请输入卡号" @change="clear" @clear="clear"/>
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <!-- <el-button v-waves size="small" type="warning " class="filter-item" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button> -->
    </div>
    <p class="warn-content">
      <span>
        总流量:<a>{{ sumflow }}</a>
      </span>
      <span>
        剩余总流量:<a>{{ restflow }}</a>
      </span>
      <span>
        已用流量:<a>{{ useflow }}</a>
      </span>
      <span>
        卡状态:<a>{{ cardstatus }}</a>
      </span>
    </p>
    <p class="warn-content">
      <span v-if="isOffnet">
        达量断网:<a>{{ isOffnet }}</a>
      </span>
      <span v-if="threshold">
        断网阈值:<a>{{ threshold }}</a>
      </span>
      <span>
        单独断网:<a>{{ single }}</a>
      </span>
      <span>
        机卡绑定:<a>{{ record }}</a>
      </span>
    </p>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      :data="list.slice((listQuery.pageNumber-1)*listQuery.pageSize,listQuery.pageNumber*listQuery.pageSize)"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>

      <el-table-column align="center" label="套餐ID">
        <template slot-scope="scope">
          <span>{{ scope.row.packageid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="套餐列表" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.packagename }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总流量" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.sumflow }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="已用流量" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.useflow }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="剩余流量" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.restflow }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开始时间" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.starttime ?scope.row.starttime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期时间" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.endtime ?scope.row.endtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
import {
  getInfo
} from '@/api/cardInfo'
import { cardStatusMap } from '@/utils/mapArr'
import waves from '@/directive/waves' // 水波纹指令
import { toSize } from '@/utils'
export default {
  name: 'GetInfo',
  directives: {
    waves
  },

  data() {
    return {
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        card: this.$route.query.card,
        pageNumber: 1,
        pageSize: 10
      },
      isOffnet: '',
      threshold: '',
      single: '',
      record: '',
      sumflow: '',
      restflow: '',
      useflow: '',
      cardstatus: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleRefresh() {
      this.listQuery.pageNumber = 1
      this.getList()
    },
    clear() {
      this.sumflow = ''
      this.restflow = ''
      this.useflow = ''
      this.cardstatus = ''
      this.list = []
      this.total = 0
    },
    handleFilter() {
      if (!this.listQuery.card) {
        this.list = []
        this.total = 0
        this.$message({
          type: 'error',
          message: '请输入卡号'
        })
        return false
      }
      this.listQuery.pageNumber = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      if (!this.listQuery.card) {
        this.list = []
        this.total = 0
        return false
      }
      const loading = this.$loading({
        lock: true
      })
      getInfo({
        card: this.listQuery.card
      }).then(response => {
        this.listLoading = false
        loading.close()
        this.$message({
          type: response.code === 1 ? 'success' : 'error',
          message: response.msg
        })
        if (+response.code === 0) {
          return false
        }
        this.list = response.data.flowlist
        this.total = +response.data.flowlist.length
        this.cardstatus = cardStatusMap[response.data.cardstatus]
        this.sumflow = response.data.sumflow
        this.restflow = response.data.restflow
        this.useflow = response.data.useflow
        this.threshold = +response.data.threshold === -1 ? '无' : toSize(+response.data.threshold * 1024 * 1024)
        this.single = +response.data.single === 2 ? '是' : '否'
        this.record = +response.data.record === 2 ? '是' : '否'
        this.isOffnet = +response.data.isOffnet === 2 ? '是' : '否'
      })
    }
  }
}
</script>
<style scoped>
.el-range-separator {
  padding: 0;
  width: 24px !important;
}
.warn-content {
  display: flex;
  margin-top: 0;
}
.warn-content span {
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
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
