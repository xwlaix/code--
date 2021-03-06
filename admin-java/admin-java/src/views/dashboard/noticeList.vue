<template>
  <div class="app-container">
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
      <el-input v-model.trim="listQuery.tetle" class="filter-item" style="width: 220px;" clearable placeholder="请输入标题" @keyup.enter.native="handleFilter"/>
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter"/>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-waves v-permission="['kuyuplat:notice:save']" class="filter-item" size="small" type="warning " icon="el-icon-plus" @click="add" />

    </div>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      class="table"
      highlight-current-row
      @cellClick="jump">
      <el-table-column show-overflow-tooltip align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.tetle }}</span>
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip align="center" label="发布时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容" min-width="155">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.content" trigger="hover" placement="top">
            <p style="width:300px" class="content" v-html="scope.row.content"/>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.content |filterFun }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" show-overflow-tooltip align="center" min-width="140">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="jump(scope.row)">查看</el-button>
          <el-button v-permission="['kuyuplat:notice:update']" type="primary" size="mini" icon="el-icon-edit-outline" @click="update(scope.row)"/>
          <el-button v-permission="['kuyuplat:notice:delete']" type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)" />

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
import { searchNotice, deleteNotice } from '@/api/data'

export default {
  name: 'NoticeList',
  directives: {
    waves
  },
  filters: {
    filterFun: function(value) {
      if (value && value.length > 12) {
        value = value
          .replace(/<\/?.+?>/g, '')
          .replace(/ /g, '')
        // .substring(0, 12) + '...'
      }
      return value
    }
  },
  data() {
    return {
      pickerOptions: this.processDate(),
      listQuery: {
        starttime: '',
        endtime: '',
        tetle: '',
        pageNo: 1,
        pageSize: 10
      },
      amount: '',
      list: [],
      tableKey: 0,
      total: 0

    }
  },
  created() {
    this.getList()
  },
  methods: {
    add() {
      this.$router.push(`/noticeDetails`)
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteNotice({
            id: row.id
          }, '.el-message-box').then(res => {
            if (+res.status === 0) {
              this.$notify({
                title: '结果',
                message: res.message,
                type: 'success',
                duration: 2000
              })
              this.getList('sec')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    update(row) {
      this.$router.push(`/noticeDetails?id=${row.id}`)
    },
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          return new Date(self.listQuery.starttime).getTime() > time.getTime()
        }
      }
    },
    jump(row) {
      this.$router.push(`/notice?id=${row.id}`)
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
        tetle: '',
        pageNo: 1,
        pageSize: 10
      }
      this.getList('sec')
    },
    getList(type) {
      searchNotice(this.listQuery, '.table').then(res => {
        this.list = res.data.rows
        this.total = +res.data.total
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
<style scoped>
  .content >>> img{
    margin: 0.2rem;
    box-sizing: border-box;
    max-width: calc(100% - 0.4rem) !important;
  }
</style>
