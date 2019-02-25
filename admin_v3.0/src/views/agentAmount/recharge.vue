<template>
  <div class="app-container">
    <div class="warn-content">
      <a>提示信息!</a>
      <div style="color:#F56C6C">每次充值金额最少100</div>
      <div>操作步骤:第一步：输入要充值的金额</div>
      <div>操作步骤:第二步：确定</div>
      <div>操作步骤:第三步：打开微信扫一扫</div>
      <div>操作步骤:第四步：支付</div>
      <div style="color:#F56C6C">暂时只支持微信支付，金额实时到账。</div>
    </div>
    <div class="filter-container" style="margin-top:15px">
      <el-input v-model.trim="money" class="filter-item" style="width: 220px;" clearable placeholder="请输入充值的金额" />
      <div class="el-select filter-item el-select--medium">
        <!-- <el-radio v-model="payType" label="1" style="margin-left:10px">支付宝支付</el-radio> -->
        <el-radio v-model="payType" label="2" style="margin-left:10px">微信支付</el-radio>
      </div>
      <el-button v-waves size="small" type="primary" class="filter-item" @click="order" >充值</el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="300px"
      title="">
      <wx-pay :price="price" :value="value" style="margin-top:20px"/>
    </el-dialog>
  </div>

</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import WxPay from '@/components/WxPay/index.vue'
import { recharge, getAmount } from '@/api/agentAmount'

export default {
  name: 'Recharge',
  directives: {
    waves
  },
  components: {
    WxPay
  },
  data() {
    return {
      money: '',
      price: '',
      value: '',
      dialogVisible: false,
      payType: '2'
    }
  },
  methods: {
    order() {
      if (!this.money) {
        this.$message({
          type: 'error',
          message: '请输入充值金额'
        })
        return
      }
      if (isNaN(this.money)) {
        this.$message({
          type: 'error',
          message: '请输入正确的金额'
        })
        return
      }
      const loading = this.$loading()
      const data = { money: this.money }
      recharge(data).then(res => {
        loading.close()
        this.value = res[0].code_url
        this.price = +this.money
        this.dialogVisible = true
        this.getOrderStatus({ orderID: res[1] })
      })
    },
    getOrderStatus(data) {
      setTimeout(() => {
        getAmount(data).then(res => {
          if (+res.code === 1 && +res.data.total !== 0) {
            this.$message({
              type: 'success',
              message: '余额充值成功'
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
