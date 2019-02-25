<template>
  <div class="app-container">
    <p class="warn-content">
      <a>本页面解释平台出现的名词，可以导出。</a>
    </p>
    <div class="filter-container">
      <!-- <el-input v-model.trim="nouns" clearable class="filter-item" style="width: 220px;" placeholder="请输入名词" @change="clear" @clear="clear"/> -->
      <!-- <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter">{{ $t('table.search') }}</el-button> -->
      <!-- <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="clear">刷新</el-button> -->
      <el-button v-waves size="small" type="primary" class="filter-item" @click="down">导出</el-button>
    </div>
    <el-table
      :data="list"
      :fit ="true"
      :filter-method="filterHandler"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <el-table-column align="center" label="名词" min-width="160">
        <template slot-scope="scope">
          <el-tag type="danger">{{ scope.row.nouns }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="解释" min-width="150">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.message" trigger="hover" placement="top">
            <p>{{ scope.row.message }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.message |filterFun }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'Nouns',
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      nouns: ''
    }
  },
  created() {
    this.list = [
      { nouns: '没有分配套餐', message: '上级没有分配该批次的套餐。' },
      { nouns: '没有设置结算价', message: '上级分配套餐的结算价与下级设置的一致，没有差额。' }
    ]
  },
  methods: {
    clear() {
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
    down() {
      this.downloadLoading = true
      const loading = this.$loading()
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['名词', '解释']
        const filterVal = ['nouns', 'message']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `平台名词${new Date().toLocaleDateString()}`,
          autoWidth: this.autoWidth
        })
        loading.close()
        this.downloadLoading = false
      })
    },
    handleFilter() {
    //   this.nouns = 1
    }
  }
}
</script>
