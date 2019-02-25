<template>
  <div class="app-container">
    <div class="warn-content">
      <a>提示信息!</a>
      <div style="color:#F56C6C">每次批量不要过50张卡</div>
      <div>操作步骤:第一步：输入老卡号，格式一行一个</div>
      <div>操作步骤:第二步：输入新卡号，格式一行一个</div>
      <div>操作步骤:第三步：确定操作</div>
      <div style="color:#F56C6C">输入换卡，请注意顺序</div>
      <div style="color:#F56C6C">批量异卡换套餐为队列任务需要等待一定时间</div>
    </div>
    <div class="filter-container">
      <el-form label-width="45px">
        <el-form-item class="oldCard" label="老卡 " style="display:inline-block">
          <el-input v-model.trim="oldCard" :autosize="{ minRows: 5, maxRows: 8}" style="margin-top:10px;width:240px;vertical-align: bottom;" class="filter-item" clearable placeholder="请填写要处理的老卡，一行一个！" type="textarea"/>
        </el-form-item>
        <el-form-item class="newCard" label="新卡" style="display:inline-block">
          <el-input v-model.trim="newCard" :autosize="{ minRows: 5, maxRows: 8}" style="margin-top:10px;width:240px;vertical-align: bottom;" class="filter-item" clearable placeholder="请填写要处理的新卡，一行一个！" type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-button v-waves size="small" type="primary" class="filter-item action" @click="order" >处理</el-button>
          <el-button v-waves size="small" type="danger" class="filter-item down" @click="down" >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="list"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>
      <el-table-column align="center" label="原卡号" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.oldItem }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="新卡号" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.newItem }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="原因" min-width="150">
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
import { cardChange } from '@/api/changePackage'
import { parseTime } from '@/utils'
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { changeAction } from '../guide/defineSteps'
export default {
  name: 'ChangePackageAction',
  directives: {
    waves
  },
  filters: {
    filterFun(value) {
      if (value && value.length > 12) {
        value = value.substring(0, 12) + '...'
      }
      return value
    }
  },
  data() {
    return {
      newCard: '',
      oldCard: '',
      list: []
    }
  },
  mounted() {
    this.driver = new Driver({
      opacity: 0.50,
      doneBtnText: '完成', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      stageBackground: '#ffffff', // Background color for the staged behind highlighted element
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步',
      onReset: (Element) => {
        this.$router.push(`/changeAction`)
      } // Called when overlay is about to be cleared
    })
    if (this.$route.query.guide) {
      this.driver.defineSteps(changeAction)
      this.driver.start()
    }
  },
  methods: {
    down() {
      this.downloadLoading = true
      const loading = this.$loading()
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['原卡号', '新卡号', '原因']
        const filterVal = ['oldItem', 'newItem', 'message']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `异卡换套餐失败表格${new Date().toLocaleDateString()}`,
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
    order() {
      if (!this.oldCard) {
        this.$message({
          type: 'error',
          message: '请输入老卡号后操作'
        })
        return
      }
      if (!this.newCard) {
        this.$message({
          type: 'error',
          message: '请输入新卡号后操作'
        })
        return
      }
      var oldArr = this.oldCard.split('\n')
      var newArr = this.newCard.split('\n')
      if (oldArr.length !== newArr.length) {
        this.$message({
          type: 'error',
          message: '换卡的数量不一致,请注意换行'
        })
        return false
      }
      const loading = this.$loading()
      this.list = []
      for (const [index, elem] of oldArr.entries()) {
        var oldItem = elem
          .replace('"', '')
          .replace('"', '')
          .replace("'", '')
          .replace(' ', '')
        var newItem = newArr[index]
          .replace('"', '')
          .replace('"', '')
          .replace("'", '')
          .replace(' ', '')
        var time = Math.round(index / 10)
        setTimeout(() => {
          cardChange({
            iccidnew: newItem,
            iccidold: oldItem,
            opratorId: sessionStorage.getItem('aid'),
            isagent: true
          }).then(res => {
            if (index === oldArr.length - 1) {
              loading.close()
            }
            if (res.status === 1) {
              this.list.push({ oldItem: elem, newItem: newArr[index], message: res.message })
            }
            this.$message({
              type: +res.status === 0 ? 'success' : 'error',
              message: res.message
            })
          })
        }, 500 * time * 10)
      }
    }
  }
}
</script>
