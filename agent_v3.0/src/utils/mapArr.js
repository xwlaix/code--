import { getAllAgent } from '@/api/agent'
import { getOperatorName } from '@/api/operator'

// 获取代理商select
export function agentArr(callback) {
  return getAllAgent().then(res => {
    const Arr = []
    const bankCard = {}
    const alipay = {}
    const aname = {}
    const aid = {}
    const per = {}
    res.data.map((v, i) => {
      const value = v.id
      const label = v.name
      Arr.push({ value, label })
      bankCard[label] = v.bankCard
      alipay[label] = v.alipay
      aname[value] = v.name
      aid[value] = v.name
      per[value] = v.per
    })
    callback(Arr, bankCard, alipay, aname, per, aid)
  })
}

// 获取供应商套餐批次批次select
export function operatorArr(callback) {
  return getOperatorName().then(res => {
    const Arr = []
    res.data.map((v, i) => {
      const value = v
      var label = `${sessionStorage.getItem('project')}--${v}`
      Arr.push({ value, label })
    })
    callback(Arr)
  })
}
// 套餐类型
const typeMap = {
  1: '月包',
  2: '季包',
  3: '年包',
  4: '基本套餐',
  5: '半年包',
  6: '累计月包'
}
// 结束时间selcet
const etime = [
  {
    value: '1',
    label: '已过期'
  },
  {
    value: '2',
    label: '三天内'
  },
  {
    value: '3',
    label: '一周内'
  },
  {
    value: '4',
    label: '一月内'
  },
  {
    value: '5',
    label: '三月内'
  }
]
// 运营商类型selcet
const package_type = [
  {
    value: '1',
    label: '移动'
  },
  {
    value: '2',
    label: '电信'
  },
  {
    value: '3',
    label: '联通'
  }
]
// 套餐类型selcet
const type = [
  {
    value: '1',
    label: '月包'
  },
  {
    value: '2',
    label: '季包'
  },
  {
    value: '3',
    label: '年包'
  },
  {
    value: '4',
    label: '基本套餐'
  },
  {
    value: '5',
    label: '半年包'
  },
  {
    value: '6',
    label: '累计月包'
  }
]
// 提现审核状态selcet
const withdrawStatus = [
  {
    value: '1',
    label: '未审核'
  },
  {
    value: '2',
    label: '通过'
  },
  {
    value: '3',
    label: '拒绝'
  }
]
// 套餐订购状态selcet
const orderStatus = [
  {
    value: '1',
    label: '失败'
  },
  {
    value: '2',
    label: '成功'
  }
]
// 套餐支付selcet

const payTypeArr = [
  {
    value: 1,
    label: '余额'
  },
  {
    value: 2,
    label: '微信'
  }
]
// 套餐生效selcet
const typeArr = [
  {
    value: '1',
    label: '普通'
  },
  {
    value: '2',
    label: '次月（下月）'
  },
  {
    value: '3',
    label: '叠加（长周期请勿选择）'
  }
]
// 机卡解绑状态selcet
const unbindStatusSelect = [
  {
    value: '1',
    label: '接受成功'
  },
  {
    value: '2',
    label: '提交成功'
  },
  {
    value: '3',
    label: '处理成功'
  }
]
// 订单支付状态
const statusMap = {
  1: '未支付',
  2: '支付成功',
  3: '订单成功',
  4: '退款'
}
// 机卡解绑状态
const unbindStatus = {
  1: '接受成功',
  2: '提交成功',
  3: '处理成功'
}

// 订单支付类型
const tradeMap = {
  1: '微信支付',
  2: '接口调用',
  3: '余额支付',
  4: '微信+余额',
  5: '代理商微信收费',
  6: '代理商微信+余额',
  7: '代理商微信订购',
  8: '代理商账户收费',
  9: '支付宝支付',
  10: '支付宝+余额'
}
// 提现审核状态
const withdrawStatusMap = {
  1: '未审核',
  2: '通过',
  3: '拒绝'
}
const cardStatusMap = {
  1: '待激活',
  2: '正常',
  3: '单向停机',
  4: '停机',
  5: '预销号',
  6: '销号',
  7: '过户',
  8: '休眠',
  9: '未知状态',
  10: '可测试期',
  11: '库存期',
  13: '用户拆机'
}
const cardTypeMap = {
  1: '普通卡',
  2: '池卡',
  3: '空卡',
  4: '行业卡',
  6: '已注销卡',
  7: 'mifi随身带'
}

export { unbindStatus, unbindStatusSelect, cardTypeMap, orderStatus, payTypeArr, typeArr, typeMap, package_type, type, statusMap, tradeMap, withdrawStatusMap, withdrawStatus, cardStatusMap, etime }
