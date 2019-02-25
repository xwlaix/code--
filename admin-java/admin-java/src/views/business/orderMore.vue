<template>
  <div class="app-container">
    <div class="warn-content">
      <a>提示信息!</a>
      <div style="color:#F56C6C">每次批量不要过100张卡</div>
      <div>操作步骤:第一步：输入卡号，格式一行一个</div>
      <div>操作步骤:第二步：选择不同套餐批次</div>
      <div>操作步骤:第三步：选择不同套餐</div>
      <div>操作步骤:第四步：确定订购</div>
      <div style="color:#F56C6C">批量订购为队列任务需要等待一定时间</div>
    </div>
    <div class="filter-container">
      <el-input v-model.trim="card" :autosize="{ minRows: 4, maxRows: 8}" style="margin-top:10px;width:280px;display:block" class="filter-item" clearable placeholder="请填写要订购的卡号，一行一个！" type="textarea"/>
      <el-select v-if="checkPermission(['kuyuplat:packageName:search'])" v-model="operatorid" class="filter-item" filterable clearable placeholder="请选择套餐批次" @change="getPcakage">
        <el-option
          v-for="item in oidSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="packageid" class="filter-item selectPackage" filterable clearable placeholder="请选择要订购的套餐">
        <el-option
          v-for="item in packageArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-select v-model="type" class="filter-item " filterable clearable placeholder="请选择生效类型">
        <el-option
          v-for="item in typeArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <!-- <el-input-number v-permission="['industry.addpackage.order']" v-model="number" :min="1" :max="12" class="number filter-item" controls-position="right"/> -->
      <!-- <div class="el-select filter-item el-select--medium">
        <el-radio v-model="type" label="1" style="margin-left:10px">普通</el-radio>
        <el-radio v-model="type" label="2" style="margin-left:10px">次月</el-radio>
        <el-radio v-model="type" label="3" style="margin-left:10px">叠加</el-radio>
      </div> -->
      <el-input v-model.trim="remarks" class="filter-item" style="width: 220px;" clearable placeholder="请填写备注！" />
      <el-button v-waves v-permission="['kuyuplat:platform:order']" size="small" type="primary" class="filter-item orderAction" @click="order" >订购</el-button>
    </div>
  </div>

</template>

<script>
import { operatorArr, typeArr } from '@/utils/mapArr'
import waves from '@/directive/waves' // 水波纹指令
import { getFlowPackages, platformOrder } from '@/api/package'
import { typeMap, cardTypeMap } from '@/utils/mapArr'
// import { agentOrder } from '@/api/addPackage'
import checkPermission from '@/utils/permission' // 权限判断函数
export default {
  name: 'OrderPackageMore',
  directives: {
    waves
  },
  data() {
    return {
      card: '',
      operatorid: '',
      oidSelect: [],
      packageid: '',
      number: 1,
      packageArr: '',
      type: '',
      typeArr,
      remarks: ''
    }
  },
  created() {
    this.getSelect()
  },
  methods: {
    checkPermission,
    getSelect() {
      operatorArr((oidSelect) => {
        this.oidSelect = oidSelect
      })
    },
    getPcakage(val) {
      this.packageid = ''
      getFlowPackages({ operatorid: val }, '.selectPackage').then(res => {
        const Arr = []
        if (+res.status === 0) {
          const Data = Object.values(res.data)
          for (let index = 0; index < Data.length; index++) {
            const value = `${Data[index].id}`
            var label = `${Data[index].name}  【${cardTypeMap[Data[index].cardType ]} · ${typeMap[Data[index].type ]}】`
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
        cards: Array.from(new Set(this.card.split('\n'))).join(','), remarks: this.remarks, packageId: this.packageid, type: this.type ? this.type : 1, operatorid: this.operatorid
      }
      platformOrder(data, '.filter-container').then(res => {
        this.orderPackageAction(res, data, type)
      })
    },
    orderPackageAction(res, data, type) {
      this.$message({
        type: +res.status === 0 ? 'success' : 'error',
        message: res.message
      })
      if (+res.status === 0) {
        this.getList('sec')
      }
    }
  }
}
</script>
<style scoped>
.el-dialog__header{
    padding: 0!important;
}
</style>
