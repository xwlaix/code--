<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> 我的资料</span>
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="代理商名称:">
            <el-input v-model.trim="form.name"/>
          </el-form-item>
          <el-form-item label="代理商电话:">
            <el-input v-model.trim="form.phone"/>
          </el-form-item>
          <el-form-item label="代理商类型" prop="accountType">
            <el-radio v-model.trim="form.accountType" label="1" style="margin-left:0;width:5rem;white-space: nowrap;">行业用户</el-radio>
            <el-radio v-model.trim="form.accountType" label="2" style="margin-left:0;width:4rem">渠道用户</el-radio>
          </el-form-item>
          <el-form-item label="提现银行卡:">
            <el-input v-model.trim="form.bankCard"/>
          </el-form-item>
          <el-form-item label="提现支付宝:">
            <el-input v-model.trim="form.alipay"/>
          </el-form-item>
          <el-form-item label="代理商支付类型:">
            <el-select v-model="form.payType" class="filter-item" clearable placeholder="代理商支付类型" disabled>
              <el-option
                v-for="item in payType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.payType==3" label="其他平台名称:">
            <el-input v-model.trim="form.website_name"/>
          </el-form-item>
          <el-form-item v-if="form.payType==2" label="微信公众号名称:">
            <el-input v-model.trim="form.wechat_name"/>
          </el-form-item>
          <el-form-item v-if="form.payType==3" label="收费链接:">
            <el-input v-model.trim="form.pay_link"/>
          </el-form-item>
          <el-form-item v-if="form.payType==3" label="请求方式：">
            <span>post</span>
            <span>传值：</span>
            <span>orderID；</span>
            <span>接受回调：</span>
            <span>API密钥key值。</span>
          </el-form-item>
          <el-form-item v-if="form.payType==3" label="回调链接：">
            <label>http://wx.szcoolfish.com/?r=home/pay-back/website-order</label>
          </el-form-item>
          <el-form-item v-if="form.payType==3" label="请求方式：">
            <span>post</span>
            <span>post</span>
            <span>传值：</span>
            <span>orderID（与上面的对应，方便找到对应订单）；</span>
            <span>API密钥key值和status（1表示支付成功，2表示支付失败）。</span>
          </el-form-item>

          <el-form-item v-if="form.payType==2" label="微信公众号AppId:">
            <el-input v-model.trim="form.appid"/>
          </el-form-item>
          <el-form-item v-if="form.payType==2" label="公众号AppSecret:">
            <el-input v-model.trim="form.secret"/>
          </el-form-item>
          <el-form-item v-if="form.payType==2" label="支付商户MCHID:">
            <el-input v-model.trim="form.mchid"/>
          </el-form-item>
          <el-form-item v-if="form.payType==2" label="商户PartnerKey:">
            <el-input v-model.trim="form.key"/>
          </el-form-item>
          <el-form-item label="代理商地区">
            <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeInfo">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form ref="changeform" :rules="rules" :model="password" label-width="90px">
          <el-form-item label="旧密码:" prop="oldpsw">
            <el-input v-model.trim="password.oldpsw"/>
          </el-form-item>
          <el-form-item label="新密码:" prop="newpsw1">
            <el-input v-model.trim="password.newpsw1"/>
          </el-form-item>
          <el-form-item label="确认密码:" prop="newpsw2">
            <el-input v-model.trim="password.newpsw2"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePassword">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="API文档">
        <div style="margin-bottom:15px"><span>API密钥key值:</span>
        <span style="color:#67C23A">{{ key }}</span></div>
        <el-button type="primary" ><a class="a_button" href="http://wx.szcoolfish.com/upload/pdf/API_V2.0.1.pdf" target="_blank">API文档</a></el-button>
      </el-tab-pane>
      <el-tab-pane v-if="!(form.per==0||form.per==null)" label="比例返点设置">
        <div class="filter-container">
          <el-button v-waves size="small" type="primary" class="filter-item" style="float:right" @click="down">导出</el-button>
        </div>
        <el-table
          :data="items"
          element-loading-text="给我一点时间"
          style="width: 100%;padding-top: 15px;">
          <el-table-column
            label="排序"
            type="index"
            width="50"/>
          <el-table-column label="供应商套餐批次" align="center" min-width="160">
            <template slot-scope="scope">
              {{ project }}--{{ scope.row.key }}
            </template>
          </el-table-column>
          <el-table-column label="返点比例" align="center">
            <template slot-scope="scope">
              {{ scope.row.value }}
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import { getInfo, getKey, changePassword, updateAgent, getPer } from '@/api/agent'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
export default {
  name: 'Setting',
  directives: {
    waves
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.password.newpsw1) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      project: sessionStorage.getItem('project'),
      key: '',
      payType: [
        {
          value: 1,
          label: '当前平台支付'
        },
        {
          value: 2,
          label: '公众号支付'
        },
        {
          value: 3,
          label: '其它平台支付'
        }
      ],

      rules: {
        oldpsw: [
          {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
          }
        ],
        newpsw1: [
          {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
          }
        ],
        newpsw2: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePass2
          }
        ]
      },
      items: [],
      options: provinceAndCityData,
      selectedOptions: [],
      form: {},
      temp: { province: '', city: '' },
      password: {
        oldpsw: '',
        newpsw1: '',
        newpsw2: ''
      }
    }
  },
  created() {
    this.getSelect()
  },
  methods: {
    down() {
      this.downloadLoading = true
      const loading = this.$loading()
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['供应商套餐批次', '返点比例']
        const filterVal = ['key', 'value']
        const list = this.items
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `返点比例表格${new Date().toLocaleDateString()}`,
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
    getSelect() {
      const loading = this.$loading({
        lock: true
      })
      getInfo().then(res => {
        loading.close()
        this.form = Object.assign(res.data, this.form)
        if (TextToCode[res.data.province]) {
          this.selectedOptions = [
            TextToCode[res.data.province].code,
            TextToCode[res.data.province][res.data.city]
              ? TextToCode[res.data.province][res.data.city].code
              : ''
          ]
        } else {
          this.selectedOptions = []
        }
        if (+res.data.pay_link === 0 || !res.data.pay_link) {
          this.form.payType = 1
        } else if (res.data.pay_link === '/coolfish/agent_pay/') {
          this.form.payType = 2
        } else {
          this.form.payType = 3
        }
      })
      getPer().then(res => {
        for (const [k, v] of Object.entries(JSON.parse(res.data))) {
          if (v) {
            this.items.push({ key: k, value: v })
          }
        }
      })
      getKey().then(res => {
        this.key = res.msg
      }).catch((res) => {
        this.key = res.msg
      })
    },
    handleChange(value) {
      this.temp.province = CodeToText[value[0]]
      this.temp.city = CodeToText[value[1]]
    },
    changeInfo() {
      const loading = this.$loading({
        lock: true
      })
      this.form = Object.assign(this.form, {
        city: this.temp.city,
        province: this.temp.province
      })
      updateAgent(this.form).then(res => {
        loading.close()
        this.$message({
          type: +res.code === 1 ? 'success' : 'error',
          message: res.msg
        })
      })
    },
    changePassword() {
      this.$refs.changeform.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true
          })
          changePassword({
            password: this.password.newpsw1,
            opassword: this.password.oldpsw
          }).then(res => {
            loading.close()
            this.$message({
              type: +res.code === 1 ? 'success' : 'error',
              message: res.msg
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '验证失败'
          })
        }
      })
    }
  }
}
</script>
<style scoped>

  .form-group {
    margin-top: 5px;
    margin-right: 15px!important;
    margin-bottom: 15px;
}
.per-inline {
    display: inline-block;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

