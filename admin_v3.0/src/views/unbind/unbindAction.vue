<template>
  <div class="app-container">
    <div class="warn-content">
      <a>提示信息!</a>
      <div style="color:#F56C6C">每次批量不要过50张卡</div>
      <div>操作步骤:第一步：输入卡号，格式一行一个</div>
      <div>操作步骤:第二步：确定解绑</div>
      <div style="color:#F56C6C">批量解绑为队列任务需要等待一定时间</div>
    </div>
    <div class="filter-container">
      <el-input v-model.trim="cards" :autosize="{ minRows: 4, maxRows: 8}" style="margin-top:10px;width:280px;vertical-align: bottom;" class="filter-item unbind" clearable placeholder="请填写要解绑的卡号，一行一个！" type="textarea"/>
      <el-button v-waves size="small" type="primary" class="filter-item action" @click="order" >解绑</el-button>
    </div>
  </div>

</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { changeUnbind } from '@/api/unbind'
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { unbindAction } from '../guide/defineSteps'
export default {
  name: 'UnbindAction',
  directives: {
    waves
  },
  data() {
    return {
      cards: ''
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
        this.$router.push(`/unbindAction`)
      } // Called when overlay is about to be cleared
    })
    if (this.$route.query.guide) {
      this.driver.defineSteps(unbindAction)
      this.driver.start()
    }
  },
  methods: {
    order() {
      if (!this.cards) {
        this.$message({
          type: 'error',
          message: '请输入卡号后操作'
        })
        return
      }
      const loading = this.$loading()
      changeUnbind({
        cards: this.cards
      }).then(res => {
        loading.close()
        this.$message({
          type: +res.code === 1 ? 'success' : 'error',
          message: res.msg
        })
      })
    }
  }
}
</script>
