<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-show="secMore" v-model="listQuery.seckillId" class="filter-item seckillId" filterable clearable placeholder="请选择秒杀活动">
        <el-option
          v-for="item in seckillArr"
          :key="item.id"
          :label="item.name"
          :value="item.id"/>
      </el-select>
      <el-input v-show="secMore" v-model.trim="listQuery.sname" class="filter-item" style="width:220px" clearable placeholder="请输入姓名" @keyup.enter.native="handleFilter"/>
      <el-input v-show="secMore" v-model.trim="listQuery.sphone" class="filter-item" style="width:220px" clearable placeholder="请输入手机号" @keyup.enter.native="handleFilter"/>
      <el-select v-show="secMore" v-model="listQuery.Cname" class="filter-item" filterable allow-create clearable placeholder="请选择快递公司">
        <el-option
          v-for="item in CnameArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input v-show="secMore" v-model.trim="listQuery.Cnumber" class="filter-item" style="width:220px" clearable placeholder="请输入快递单号" @keyup.enter.native="handleFilter"/>
      <el-select v-show="secMore" v-model="listQuery.status" class="filter-item" filterable clearable placeholder="请选择支付状态">
        <el-option
          v-for="item in obtainStatusSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-input v-show="secMore" v-model.trim="listQuery.orderid" class="filter-item" style="width:220px" clearable placeholder="请输入订单号" @keyup.enter.native="handleFilter"/>
      <el-button v-waves v-show="secMore" size="small" type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter"/>
      <el-button v-waves v-if="device==='mobile'" size="small" type="warning " class="filter-item" @click="secMore=!secMore">{{ secMore?'隐藏':'查找' }}</el-button>
      <el-button v-waves size="small" type="primary" class="filter-item" icon="el-icon-refresh" @click="handleRefresh"/>
      <el-button v-waves v-permission="['kuyuplat:excel:obtainOatchExport']" v-show="secMore" class="filter-item" size="small" type="warning " @click="javaDownload">JAVA导出</el-button>
      <el-button v-waves v-permission="['kuyuplat:excel:obtainBatchUpdate']" class="filter-item" size="small" type="success " @click="jump('/other/generalizeMore')">批量处理</el-button>

    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      :key="tableKey"
      :fit ="true"
      row-key="id"
      element-loading-text="给我一点时间"
      size="mini"
      class="table"
      tooltip-effect="dark"
      highlight-current-row>
      <el-table-column align="center" label="id" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.sname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.sphone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.operator }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品套餐" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.pname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="省份" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="城市" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="区县" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.area }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="详细地址" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag :type="scope.row.status=='未支付'?'danger':'success'">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单号" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="color:#66b1ff;cursor:pointer" type="text" >{{ scope.row.orderid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="支付金额" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="卡号" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.card }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="快递公司" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.Cname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="物流单号" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.Cnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货时间" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.sendtime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="left" show-overflow-tooltip min-width="120px">
        <template slot-scope="scope">
          <el-button v-permission="['kuyuplat:obtain:update']" v-if="scope.row.status == 2||scope.row.status =='已支付'" type="primary" size="mini" @click="operationPass(scope.row.id)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.pageNo"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.pageSize"
        :pager-count="5"
        :total="total"
        background
        layout="total, sizes,jumper, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="发货">
      <el-form ref="dataForm" :rules="rules" :model="temp" :inline="true" class="dialog" label-position="right" label-width="9rem">
        <el-form-item label="快递公司" prop="Cname">
          <el-select v-model="temp.Cname" class="filter-item" filterable clearable placeholder="请选择快递公司">
            <el-option
              v-for="item in CnameArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" prop="Cnumber">
          <el-input v-model.trim="temp.Cnumber" clearable placeholder="请输入快递单号"/>
        </el-form-item>
        <el-form-item label="卡号">
          <el-input v-model.trim="temp.remarks" clearable placeholder="请输入卡号"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { obtainUpdate, exportDeliveryCard, getObtain } from '@/api/generalize'
import { getSeckillNames } from '@/api/seckill'
import { obtainStatusSelect } from '@/utils/mapArr'
import { downloadFile } from '@/utils'

export default {
  name: 'Generalize',
  directives: {
    waves
  },
  data() {
    return {
      secMore: true,
      obtainStatusSelect,
      dialogFormVisible: false,
      list: [],
      seckillArr: [],
      total: null,
      tableKey: 0,
      listQuery: {
        seckillId: '',
        sname: '',
        sphone: '',
        Cname: '',
        Cnumber: '',
        status: '',
        orderid: '',
        pageNo: 1,
        pageSize: 10
      },
      rules: {
        Cname: [
          { required: true, message: '请选择快递公司', trigger: 'blur' }
        ],
        Cnumber: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ]
      },
      temp: {},
      CnameArr: [
        {
          value: 'shunfeng',
          label: '顺丰'
        },
        {
          value: '圆通快递',
          label: '圆通快递'
        }
      ],
      loading: true,
      selectArr: [],
      reason: '您好！请联系卖家换卡，谢谢！'
    }
  },
  computed: {
    device() {
      return this.$store.getters.device
    }
  },
  created() {
    if (this.device === 'mobile') {
      this.secMore = false
    }
    this.getList()
    getSeckillNames({}, '.seckillId').then(res => {
      if (+res.status === 0) {
        this.seckillArr = res.data
      }
    })
  },
  methods: {
    operationPass(id) {
      this.temp = Object.assign({}, { id }) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          obtainUpdate({ id: tempData.id, Cname: this.temp.Cname, Cnumber: this.temp.Cnumber, card: this.temp.card }, '.el-dialog__footer').then(res => {
            this.$message({
              type: +res.status === 0 ? 'success' : 'error',
              message: res.message
            })
            if (+res.status === 0) {
              this.getList('sec')
              this.dialogFormVisible = false
            }
          })
        }
      })
    },
    jump(type) {
      this.$router.push(type)
    },
    getList(type) {
      getObtain(this.listQuery, '.table').then(res => {
        if (!type) {
          this.$message({
            type: +res.status === 0 ? 'success' : 'error',
            message: res.message
          })
        }
        if (+res.status !== 0) {
          return false
        }
        this.list = res.data.rows
        this.total = +res.data.total
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    handleRefresh() {
      this.listQuery = {
        seckillId: '',
        sname: '',
        sphone: '',
        Cname: '',
        Cnumber: '',
        status: '',
        orderid: '',
        pageNo: 1,
        pageSize: 10
      }
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    javaDownload() {
      const tempData = Object.assign({}, this.listQuery)
      delete tempData.pageNo
      delete tempData.pageSize
      exportDeliveryCard(tempData, '.table').then(res => {
        if (res.status === 0) {
          downloadFile(res.data, 'COOLFISH_API_V3.0.pdf')
        }
        this.$message({
          type: +res.status === 0 ? 'success' : 'error',
          message: res.message
        })
      })
    }
  }
}
</script>
<style >
.cardStatus {
  display: flex;
  margin-top: 0;
}
.cardStatus span {
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
