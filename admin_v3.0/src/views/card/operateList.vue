<template>
  <div class="app-container calendar-list-container">
    <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>

    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>

      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="添加时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="完成时间" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.endtime?scope.row.endtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="任务状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==4?'danger':''">{{ scope.row.status|statusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="成功">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.success"> {{ scope.row.success }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="失败">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.fail" type="danger"> {{ scope.row.fail }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type|typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" min-width="200">
        <template slot-scope="scope">
          <el-button v-loading="loading" type="primary" size="mini" @click="upload(scope.row)">源文件</el-button>
          <el-button v-loading="loading" type="danger" size="mini" @click="down(scope.row)">处理结果</el-button>
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

  </div>
</template>

<script>
import {
  getWork
} from '@/api/card'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'OperateList',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '队列中',
        1: '队列中',
        2: '运行中',
        3: '已完成',
        4: '失败'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      const typeMap = {
        4: '分卡'
      }
      return typeMap[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      listQuery: {
        pageNumber: 1,
        pageSize: 10
      },
      total: null,
      listLoading: true,
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    upload(row) {
      if (row.upload_file) {
        window.open(row.upload_file, '_self')
      } else {
        this.$message({
          type: 'error',
          message: '找的不到源文件'
        })
      }
    },
    down(row) {
      if (row.down_file) {
        window.open(row.down_file, '_self')
      } else {
        this.$message({
          type: 'error',
          message: '正在处理中'
        })
      }
    },
    handleRefresh() {
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
      const loading = this.$loading({
        lock: true
      })
      getWork({
        pageNumber: this.listQuery.pageNumber,
        pageSize: this.listQuery.pageSize
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

<style scoped>
.el-range-separator {
  padding: 0;
  width: 24px !important;
}

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
