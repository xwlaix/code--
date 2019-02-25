<template>
  <div class="app-container">
    <div class="warn-content">
      <a>提示信息!</a>
      <div>操作步骤:第一步：下载模板，按模板格式上传</div>
      <div>操作步骤:第二步：点EXCEL导入</div>
      <div>操作步骤:第三步：确定导入</div>
      <div>操作步骤:第四步：返回</div>
      <div class="downLoad" style="color:#F56C6C" @click="downLoad">模板格式下载</div>
    </div>

    <el-upload
      ref="upload"
      :limit="1"
      :auto-upload="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
      :data="moreData"
      style="display:inline-block;margin-top:15px;vertical-align: bottom;"
      drag
      action="http://112.74.198.2:8091/excel/card/divide">
      <i class="el-icon-upload"/>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-select v-model="sid" class="filter-item" filterable clearable placeholder="请选择代理商" @change="change">
      <el-option
        v-for="item in agent"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-button class ="uploadFile" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </div>
</template>

<script>
import { agentArr } from '@/utils/mapArr'
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { excelCard } from '../guide/defineSteps'
export default {
  name: 'ExcelCard',
  data() {
    return {
      fileList: [],
      agent: [],
      driver: null,
      sid: '',
      moreData: {
        did: sessionStorage.getItem('aid'),
        aid: sessionStorage.getItem('aid'),
        uid: sessionStorage.getItem('uid'),
        type: sessionStorage.getItem('type')
      }
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
        this.$router.push(`/excelCard`)
      } // Called when overlay is about to be cleared
    })
    if (this.$route.query.guide) {
      this.driver.defineSteps(excelCard)
      this.driver.start()
    }
  },
  created() {
    agentArr(res => {
      this.agent = res
    })
  },
  methods: {
    change(sid) {
      if (sid) {
        this.moreData.sid = sid
      } else {
        delete this.moreData.sid
      }
    },
    submitUpload() {
      if (this.fileList.length > 0) {
        this.$refs.upload.submit()
      } else {
        this.$message({
          type: 'error',
          message: '请上传excel'
        })
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleSuccess(res, file, fileList) {
      this.$message({
        type: res.status === 0 ? 'success' : 'error',
        message: res.message
      })
      this.fileList = []
    },
    handleError(err) {
      this.$message({
        type: 'error',
        message: err
      })
    },
    downLoad() {
      window.open(' http://wx.szcoolfish.com/upload/excelmodel/divideCard.xlsx', '_self')
    }
  }
}
</script>
