<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model.trim="listQuery.card" class="filter-item cardNo" style="width: 220px;" clearable placeholder="请输入卡号" />
      <el-input v-model.trim="listQuery.Serial_number" class="filter-item" style="width: 220px;" clearable placeholder="请输入流水号" />
      <el-select v-model="listQuery.status" class="filter-item" clearable placeholder="请选择结果">
        <el-option
          v-for="item in status"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-date-picker
        v-model="listQuery.starttime"
        type="date"
        placeholder="开始日期"
        class="filter-item"
      />
      <el-date-picker
        v-model="listQuery.endtime"
        :picker-options="pickerOptions"
        type="date"
        placeholder="结束日期"
        class="filter-item"
      />
      <el-input v-model.trim="listQuery.source" class="filter-item" style="width: 220px;" clearable placeholder="请输入来源" />
      <el-button v-waves size="small" type="primary" class="filter-item secCard" icon="el-icon-search" @click="handleFilter" @keyup.enter.native="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-waves size="small" type="success" class="filter-item" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
    </div>
    <div v-if="+agentType===1" class="filter-container">
      <el-select v-model="packageValue" class="filter-item orderPackage" filterable clearable placeholder="请选择要订购的套餐">
        <el-option
          v-for="item in packageArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input-number v-if="accountType==1" v-model="number" :min="1" :max="12" class="number filter-item" controls-position="right"/>
      <div class="el-select filter-item el-select--medium timeType">
        <el-radio v-model="type" label="1" style="margin-left:10px">普通</el-radio>
        <el-radio v-if="accountType!=1" v-model="type" label="2" style="margin-left:10px">次月</el-radio>
        <el-radio v-model="type" label="3" style="margin-left:10px">叠加</el-radio>
      </div>
      <div class="el-select filter-item el-select--medium payType">
        <el-radio v-model="payType" label="1" style="margin-left:10px">余额支付</el-radio>
        <el-radio v-model="payType" label="2" style="margin-left:10px">微信支付</el-radio>
      </div>

      <el-button v-waves v-if="accountType==1" size="small" type="primary" class="filter-item orderAction" @click="order('industry')" >行业订购</el-button>
      <el-button v-waves v-else size="small" type="primary" class="filter-item orderAction" @click="order" >订购</el-button>
      <el-button v-waves size="small" type="success" class="filter-item" @click="orderMore">批量订购</el-button>
    </div>
    <el-table
      :data="list"
      :key="tableKey"
      :fit ="true"
      element-loading-text="给我一点时间"
      size="mini"
      highlight-current-row>

      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="卡号" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.card }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="套餐名称" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.package }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="流水号" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.Serial_number }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="来源" width="160">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.source" trigger="hover" placement="top">
            <p>{{ scope.row.source }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.source |filterFun }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结果">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status==1?'danger':'success'">{{ scope.row.status==1?'失败':'成功' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="返回内容" width="150">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.result" trigger="hover" placement="top">
            <p>{{ scope.row.result }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.result }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime?scope.row.addtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开始时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.starttime?scope.row.starttime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结束时间" min-width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.endtime?scope.row.endtime:''| parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
    <el-dialog
      :visible.sync="dialogVisible"
      width="300px"
      title="">
      <wx-pay :price="price" :java-code="javaCode" style="margin-top:20px"/>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { getCardPackage } from '@/api/package'
import { getAllOrder } from '@/api/order'
import { getAddPackage, orderPackageJava, orderByWechatJava, industryWechatJava } from '@/api/addPackage'
import { orderStatus, typeArr, typeMap, cardTypeMap } from '@/utils/mapArr'
import WxPay from '@/components/WxPay/index.vue'
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { orderPackage } from '../guide/defineSteps'
export default {
  name: 'OrderPackage',
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
  components: {
    WxPay
  },
  data() {
    return {
      pickerOptions: this.processDate(),
      packageArr: [],
      packageValue: [],
      tableKey: 0,
      list: [],
      total: null,
      number: 1,
      payType: '',
      type: '',
      javaCode: '',
      size: 260,
      status: orderStatus,
      typeArr,
      price: '',
      agentType: sessionStorage.getItem('type'),
      accountType: sessionStorage.getItem('accountType'),
      dialogVisible: false,
      listQuery: {
        card: '',
        Serial_number: '',
        status: '',
        starttime: '',
        endtime: '',
        source: '',
        pageSize: 10,
        pageNumber: 1
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
        this.$router.replace({
          path: '/redirect/orderPackage'
        })
      } // Called when overlay is about to be cleared
    })
    if (this.$route.query.guide) {
      this.driver.defineSteps(orderPackage)
      this.driver.start()
    }
  },
  methods: {
    getList(type) {
      if (!this.listQuery.card) {
        this.$message({
          type: 'error',
          message: '请输入卡号后查询'
        })
        return
      }
      const loading = this.$loading({
        lock: true
      })
      getAddPackage(this.listQuery).then(res => {
        this.listLoding = false
        loading.close()
        this.$message({
          type: +res.code === 1 ? 'success' : 'error',
          message: res.msg
        })
        if (+res.code === 1) {
          this.list = res.data.rows
          this.total = +res.data.total
        }
      })
    },
    getPackage() {
      if (!this.listQuery.card) {
        this.$message({
          type: 'error',
          message: '请输入卡号后查询'
        })
        return
      }
      const loading = this.$loading({
        lock: true
      })
      getCardPackage({ card: this.listQuery.card }).then(res => {
        loading.close()
        const Arr = []
        if (+res.code === 1) {
          const Data = Object.values(res.data)
          for (let index = 0; index < Data.length; index++) {
            const value = `${Data[index].id},${Data[index].operatorid}`
            var label = `${Data[index].name}  【${cardTypeMap[Data[index].card_type ]} · ${typeMap[Data[index].type ]}】`
            Arr.push({ value, label })
          }
        }
        this.packageArr = Arr
      })
    },
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          return new Date(self.listQuery.starttime).getTime() > time.getTime()
        }
      }
    },
    handleFilter() {
      this.packageid = ''
      this.getList()
      if (this.listQuery.card) {
        this.getPackage()
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList('sec')
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.getList('sec')
    },
    handleRefresh() {
      this.listQuery.card = ''
      this.listQuery.Serial_number = ''
      this.listQuery.status = ''
      this.listQuery.starttime = ''
      this.listQuery.source = ''
      this.listQuery.endtime = ''
      this.listQuery.casourcerd = ''
      this.packageid = ''
      this.type = ''
      this.list = []
      this.total = 0
    },
    order(type) {
      if (!this.listQuery.card) {
        this.$message({
          type: 'error',
          message: '请输入卡号后操作'
        })
        return
      }
      if (!this.packageValue) {
        this.$message({
          type: 'error',
          message: '请选择套餐后操作'
        })
        return
      }
      // if (!this.type) {
      //   this.$message({
      //     type: 'error',
      //     message: '请选择套餐生效时间后操作'
      //   })
      //   return
      // }
      const packageId = this.packageValue.split(',')[0]
      const operatorid = this.packageValue.split(',')[1]
      const data = {
        cards: this.listQuery.card, packageId, operatorid, type: this.type ? this.type : 1, did: 0, aid: sessionStorage.getItem('aid'), uid: sessionStorage.getItem('uid'), count: this.number
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
          if (+res.status === 0) {
            this.getList('sec')
          }
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
            this.getList('sec')
          } else {
            if (this.dialogVisible === true) {
              this.getOrderStatus(data)
            }
          }
        })
      }, 3000)
    },
    orderMore() {
      this.$router.push('/orderMore')
    }
  }
}
</script>
<style>
.el-dialog__header{
    padding: 0!important;
}
</style>

