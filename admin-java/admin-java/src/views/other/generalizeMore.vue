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
      :http-request = "upload"
      :on-change="handleChange"
      action=""
      class="form"
      style="display:inline-block;margin-top:15px;vertical-align: bottom;"
      drag>
      <i class="el-icon-upload"/>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-button class ="uploadFile" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </div>
</template>

<script>
import { uploadFileFinally } from '@/utils'

export default {
  name: 'GeneralizeMore',
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    upload(param) {
      const loading = this.$loading({ target: '.form' })
      uploadFileFinally('/plat/card/v4/excel/obtain/batchUpdate', param, this.listQuery).then(res => {
        const data = res.data
        this.$message({
          type: +data.status === 0 ? 'success' : 'error',
          message: data.message
        })
        if (data.status === 0) {
          this.fileList = []
          this.$store.dispatch('delView', this.$route)
          this.$router.push('/other/generalize')
        }
        loading.close()
      }).catch(() => {
        loading.close()
        this.$message({
          type: 'error',
          message: '请求失败！'
        })
      })
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
    downLoad() {
      window.open('http://wx.szcoolfish.com/upload/excelmodel/deliveryCard.xlsx', '_self')
    }
  }
}
</script>
