<template>
  <div class="dashboard-editor-container">
    <panel-group :card-end="cardEnd" :amount-end="amountEnd" :recharge-end="rechargeEnd" :commission-end="commissionEnd" />
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <order-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <recharge/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/Panel'
import RaddarChart from './components/RaddarChart'
import BarChart from './components/BarChart'
import orderTable from './components/orderTable'
import recharge from './components/recharge'
import BoxCard from './components/BoxCard'
import { getOrderData, getAgentCommission } from '@/api/order'
import { getCardNum } from '@/api/data'
import { getInfo } from '@/api/agent'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    recharge,
    RaddarChart,
    BarChart,
    orderTable,
    BoxCard
  },
  data() {
    return {
      cardEnd: 0,
      amountEnd: 0,
      rechargeEnd: 0,
      commissionEnd: 0,
      data: [
        {
          value: [5000, 7000, 12000, 11000, 15000, 14000],
          name: '移动'
        },
        {
          value: [4000, 9000, 15000, 15000, 13000, 11000],
          name: '联通'
        },
        {
          value: [5500, 11000, 12000, 15000, 12000, 12000],
          name: '电信'
        }
      ]
    }
  },
  created() {
    this.getPanelNumber()
  },
  methods: {
    getPanelNumber() {
      // 本月收入
      getOrderData({ type: 'month-money' }).then(res => {
        if (+res.code === 1) {
          this.rechargeEnd = +res.data[0] ? +res.data[0] : 0
        }
      })
      // 卡片总数
      getCardNum({ type: 'card_status' }).then(res => {
        if (+res.code === 1) {
          var num = 0
          for (var i in res.data) {
            num += res.data[i]
          }
          this.cardEnd = num
        }
      })
      // 账户余额
      getInfo().then(res => {
        if (+res.code === 1) {
          sessionStorage.setItem('type', res.data.type)
          sessionStorage.setItem('uid', res.data.uid)
          sessionStorage.setItem('aid', res.data.id)
          sessionStorage.setItem('name', res.data.name)
          this.amountEnd = +res.data.money
        }
      })
      // 佣金
      getAgentCommission({ type: 'month' }).then(res => {
        if (+res.code === 1) {
          this.commissionEnd = +res.data[(new Date()).getMonth() + 1 + '月']
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
