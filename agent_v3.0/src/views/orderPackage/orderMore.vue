<template>
  <div class="app-container">
    <div class="warn-content">
      <a>提示信息!</a>
      <div style="color:#F56C6C">每次批量不要过10张卡</div>
      <div>操作步骤:第一步：输入卡号，格式一行一个</div>
      <div>操作步骤:第二步：选择不同供应商套餐批次</div>
      <div>操作步骤:第三步：选择不同套餐</div>
      <div>操作步骤:第四步：确定订购</div>
      <div style="color:#F56C6C">批量订购为队列任务需要等待一定时间</div>
    </div>
    <div class="filter-container">
      <el-input v-model.trim="card" :autosize="{ minRows: 4, maxRows: 8}" style="margin-top:10px;width:280px;display:block" class="filter-item" clearable placeholder="请填写要订购的卡号，一行一个！" type="textarea"/>
      <el-select v-model="operatorid" class="filter-item" filterable clearable placeholder="请选择供应商套餐批次" @change="getPcakage">
        <el-option
          v-for="item in operatoridArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>

      <el-select v-model="packageid" class="filter-item" filterable clearable placeholder="请选择要订购的套餐">
        <el-option
          v-for="item in packageArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input-number v-if="accountType==1" v-model="number" :min="1" :max="12" class="number filter-item" controls-position="right"/>

      <!-- <el-select v-model="type" class="filter-item" clearable placeholder="请选择套餐生效时间" >
        <el-option
          v-for="item in typeArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select> -->

      <div class="el-select filter-item el-select--medium">
        <el-radio v-model="type" label="1" style="margin-left:10px">普通</el-radio>
        <el-radio v-if="accountType!=1" v-model="type" label="2" style="margin-left:10px">次月</el-radio>
        <el-radio v-model="type" label="3" style="margin-left:10px">叠加</el-radio>
      </div>
      <div class="el-select filter-item el-select--medium">
        <el-radio v-model="payType" label="1" style="margin-left:10px">余额支付</el-radio>
        <el-radio v-model="payType" label="2" style="margin-left:10px">微信支付</el-radio>
      </div>
      <el-button v-waves v-if="accountType==1" size="small" type="primary" class="filter-item orderAction" @click="order('industry')" >行业订购</el-button>
      <el-button v-waves v-else size="small" type="primary" class="filter-item orderAction" @click="order" >订购</el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="300px"
      title="">
      <wx-pay :price="price" :java-code="javaCode" style="margin-top:20px"/>
    </el-dialog>
  </div>

</template>

<script>
import { operatorArr, typeArr } from '@/utils/mapArr'
import waves from '@/directive/waves' // 水波纹指令
import { getPackage } from '@/api/package'
import { typeMap, cardTypeMap } from '@/utils/mapArr'
import WxPay from '@/components/WxPay/index.vue'
import { orderPackageJava, orderByWechatJava, industryWechatJava } from '@/api/addPackage'
import { getAllOrder } from '@/api/order'

export default {
  name: 'OrderMore',
  directives: {
    waves
  },
  components: {
    WxPay
  },
  data() {
    return {
      card: '',
      operatorid: '',
      operatoridArr: '',
      packageid: '',
      number: 1,
      accountType: sessionStorage.getItem('accountType'),
      packageArr: '',
      type: '',
      typeArr,
      price: '',
      javaCode: '',
      project: sessionStorage.getItem('project'),
      dialogVisible: false,
      payType: ''
    }
  },
  created() {
    this.getSelect()
  },
  methods: {
    getSelect() {
      operatorArr(res => {
        this.operatoridArr = res
      })
    },
    getPcakage(val) {
      this.packageid = ''
      const loading = this.$loading()
      getPackage({ operatorid: val }).then(res => {
        loading.close()
        const Arr = []
        if (+res.code === 1) {
          const Data = Object.values(res.data)
          for (let index = 0; index < Data.length; index++) {
            const value = `${Data[index].pid}`
            var label = `【${this.project}${val}】${Data[index].name}  【${cardTypeMap[Data[index].card_type ]} · ${typeMap[Data[index].type ]}】`
            Arr.push({ value, label })
          }
        }
        this.packageArr = Arr
      })
    },
    order(type) {
      if (!this.card) {
        this.$message({
          type: 'error',
          message: '请输入卡号后操作'
        })
        return
      }
      if (!this.packageid) {
        this.$message({
          type: 'error',
          message: '请选择套餐后操作'
        })
        return
      }
      const data = {
        cards: this.card.split('\n').join(','), packageId: this.packageid, type: this.type ? this.type : 1, operatorid: this.operatorid, did: 0, aid: sessionStorage.getItem('aid'), uid: sessionStorage.getItem('uid'), count: this.number
      }
      if (this.payType === '2') {
        this.wxPay(data, type)
      } else {
        const loading = this.$loading()
        orderPackageJava(data).then(res => {
          loading.close()
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
          if (res.message === '余额不足，请使用微信订购。') {
            this.$confirm('此操作将通过微信扫码支付, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.wxPay(data, type)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        })
      }
    },
    wxPay(data, type) {
      const loading = this.$loading()
      if (type === 'industry') {
        industryWechatJava(data).then(res => {
          loading.close()
          if (+res.status === 0) {
            this.javaCode = res.data.imgBase64
            this.price = +res.data.money
            this.dialogVisible = true
            this.getOrderStatus({ orderID: res.data.orderNo })
          } else {
            this.$message({
              type: +res.status === 0 ? 'success' : 'error',
              message: res.message
            })
          }
        })
      } else {
        orderByWechatJava(data).then(res => {
          loading.close()
          if (+res.status === 0) {
            this.javaCode = res.data.imgBase64
            this.price = +res.data.money
            this.dialogVisible = true
            this.getOrderStatus({ orderID: res.data.orderNo })
          } else {
            this.$message({
              type: +res.status === 0 ? 'success' : 'error',
              message: res.message
            })
          }
        })
      }
    },
    getOrderStatus(data) {
      setTimeout(() => {
        getAllOrder(data).then(res => {
          if (+res.code === 1 && +res.data.total !== 0) {
            this.$message({
              type: 'success',
              message: '套餐订购成功'
            })
            this.dialogVisible = false
          } else {
            if (this.dialogVisible === true) {
              this.getOrderStatus(data)
            }
          }
        })
      }, 10000)
    }
  }
}
</script>
<style>
.el-dialog__header{
    padding: 0!important;
}
</style>
