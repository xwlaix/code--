<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model.trim="listQuery.card" class="filter-item" style="width: 220px;" clearable placeholder="请输入卡号" />
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
      <el-button v-waves size="small" type="danger" class="filter-item" @click="stop" >停机</el-button>
      <el-button v-waves size="small" type="success" class="filter-item" @click="reset">复机</el-button>
    </div>
    <p v-if="cardStatus" class="warn-content cardStatus" style="margin : 0">
      <span>
        卡状态：<a>{{ cardStatus }}</a>
      </span>
      <span>
        总流量：<a>{{ sumflow }}</a>
      </span>
      <span>
        剩余总流量：<a>{{ restflow }}</a>
      </span>
      <span>
        已用流量：<a>{{ useflow }}</a>
      </span>
    </p>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>

      <el-table-column align="center" label="卡号" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.card }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作类型">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type==1?'danger':'success'">{{ scope.row.type==1?'关机':'开机' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==1?'danger':'success'">{{ scope.row.status==1?'失败':'成功' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="来源" width="150">
        <template slot-scope="scope">
          <el-popover v-id="scope.row.source" trigger="hover" placement="top">
            <p>{{ scope.row.source }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.source |filterFun }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="150">
        <template slot-scope="scope">
          <el-popover v-id="scope.row.source" trigger="hover" placement="top">
            <p>{{ scope.row.remarks }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.remarks |filterFun }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="返回内容" width="150">
        <template slot-scope="scope">
          <el-popover v-id="scope.row.source" trigger="hover" placement="top">
            <p>{{ scope.row.result }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.result |filterFun }}</el-tag>
            </div>
          </el-popover>
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
import waves from '@/directive/waves' // 水波纹指令
import { getAllStatus, changeStatus } from '@/api/stopReset'
import { getInfo } from '@/api/cardInfo'
import { cardStatusMap } from '@/utils/mapArr'
export default {
  name: 'StopReset',
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
      list: [],
      total: null,
      tableKey: 0,
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        card: this.$route.query.card
      },
      cardStatus: '',
      sumflow: '',
      useflow: '',
      restflow: '',
      listLoding: true
    }
  },
  created() {
    if (this.listQuery.card) {
      this.getList()
      this.getInfo()
    }
  },
  methods: {
    getList(type) {
      if (!this.listQuery.card) {
        if (type === 'sec') {
          this.$message({
            type: 'error',
            message: '请输入卡号后查询'
          })
        }
        return
      }
      const loading = this.$loading({
        lock: true
      })
      getAllStatus(this.listQuery).then(res => {
        this.listLoding = false
        loading.close()
        if (type === 'sec') {
          this.$message({
            type: +res.code === 1 ? 'success' : 'error',
            message: res.msg
          })
        }
        if (+res.code !== 1) {
          return false
        }
        this.list = res.data.rows
        this.total = +res.data.total
      })
    },
    handleFilter() {
      this.getList('sec')
      this.getInfo()
    },
    handleRefresh() {
      this.getList('sec')
      this.getInfo()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList('sec')
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getList('sec')
    },
    getInfo() {
      if (!this.listQuery.card) {
        return
      }
      getInfo({ card: this.listQuery.card }).then(res => {
        if (+res.code === 1) {
          this.cardStatus = cardStatusMap[res.data.cardstatus]
          this.sumflow = res.data.sumflow
          this.useflow = res.data.useflow
          this.restflow = res.data.restflow
        } else {
          this.cardStatus = ''
        }
      })
    },
    changeStuts(type) {
      if (!this.listQuery.card) {
        this.$message({
          type: 'error',
          message: '请输入卡号后操作'
        })
        return
      }
      const loading = this.$loading({
        lock: true
      })
      changeStatus({ card: this.listQuery.card, status: type }).then(res => {
        loading.close()
        this.$message({
          type: +res.code === 1 ? 'success' : 'error',
          message: res.msg
        })
        this.getList()
        this.getInfo()
      })
    },
    stop() {
      this.changeStuts(1)
    },
    reset() {
      this.changeStuts(2)
    }
  }
}
</script>
<style >
.cardStatus {
  display: flex;
  margin-top: 0;
}
.cardStatus span {
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
