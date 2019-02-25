var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  data: {
    cardNo: '1064961569807	',
    searchStatus: false,
    searchEmpty: false,
    package: [],
    cardInfo: '',
    libArr: {
      tab1: [],
      tab2: [],
      tab3: [],
      tab4: [],
      tab5: []
    },
    tab1: {
      title: "",
      url: "tab1",
      active: false
    },
    tab2: {
      title: "",
      url: "tab2",
      active: false
    },
    tab3: {
      title: "",
      url: "tab3",
      active: false
    },
    tab4: {
      title: "",
      url: "tab4",
      active: false
    },
    showTab: '',
    title: [],
    id: "",
    price: "",
    packagename: "",
    flag: "",
    bindType: "",
    infoText: '',
    complete: false,
    type: '',
    selectType: '',
    lid_next: [22, 23, 24, 31, 33, 34],
    //固定，多月，叠加
    lid_free: [24, 33, 32],
    //月套餐随意叠
    lid_all: [32],
    //小王卡叠加
    lid_add: [35],
    //增加时长
  },
  //事件处理函数
  closeSearch: function () {
    wx.navigateBack()
  },
  clearCardNo: function () {
    this.setData({
      cardNo: '',
      searchStatus: false
    });
  },
  onLoad: function () {

  },
  onReady: function () {

    //获得easyModal
    this.easyModalSecond = this.selectComponent("#easyModal");

  },
  order: function () {
    if (!this.data.id) {
      wx.showToast({
        title: '请选择套餐',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!this.data.price) {
      wx.showToast({
        title: '获取套餐价格失败',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!this.data.cardNo) {
      wx.showToast({
        title: '获取卡号失败',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.bindType == 2) {
      this.easyModalSecond.show();
    } else {
      this.add(0);
    }
  },
  add: function (type) {
    wx.showLoading({
      title: '加载中',
    })
    util.requestForm(api.packageOrder,
      {
        cardNo:this.data.cardNo,
        id:this.data.id,
        name :this.data.packagename,
        price:this.data.price,
        count:1,
        type:type
      },
      "POST").then(function(){
        wx.hideLoading()
        if (res.status == 0) {
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success':function(res){
            },
            'fail':function(res){
            }
         })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      }).then(function(res){
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      })
  },
  _confirmEventFirst: function () {
    const lidArr = [24, 32, 33];
    if (!this.data.selectType) {
      wx.showToast({
        title: '请选择生效时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.selectType == 1) {
      if (util.contains(lidArr, this.data.cardInfo.lid)) {
        this.add(3);
      } else {
        this.add(1);
      }
    } else if (type == 2) {
      this.add(2);
    }
    this.thridModal.hideModal();
  },
  radioChange: function (e) {
    this.setData({
      selectType: e.detail.value
    })
  },
  activeTitle: function (e) {
    for (let i in this.data.title) {
      var active = `title[${i}].active`
      if (this.data.title[i].url == e.currentTarget.dataset.url) {
        this.setData({
          [active]: true,
          showTab: e.currentTarget.dataset.url
        })
      } else {
        this.setData({
          [active]: false
        })
      }
    }
  },
  active: function (e) {
    const amount = this.data.cardInfo.amount;
    for (let i in this.data.libArr) {
      for (let item in this.data.libArr[i]) {
        var active = `libArr.${i}[${item}].active`
        if (this.data.libArr[i][item].id == e.currentTarget.dataset.id) {
          var bindType = this.data.libArr[i][item].addType
          var id = this.data.libArr[i][item].id
          var price = this.data.libArr[i][item].price
          var packagename = this.data.libArr[i][item].name
          this.setData({
            [active]: true,
            bindType,
            id,
            price,
            packagename,
          })
        } else {
          this.setData({
            [active]: false
          })
        }
      }
    }
    if (amount != 0.0) {
      if (this.price - amount <= 0) {
        this.setData({
          flag: "true"
        })
      } else {
        this.setData({
          flag: (amount - this.data.price).toFixed(2)
        })
      }
    } else {
      this.setData({
        flag: "false"
      })
    }
  },
  inputChange: function (e) {
    this.setData({
      cardNo: e.detail.value,
      searchStatus: false
    });
  },
  loadFlow: function (data) {
    if (this.data.type) {
      if (data.isInfinite == 2) {
        if (data.usetime == 30) {
          data.tabNo = 1;
        } else {
          data.tabNo = 2;
        }
        data.flow = "∞";
      } else if (data.flow / 1024 >= 1) {
        if (data.usetime == 30 && data.base == 1) {
          data.tabNo = 3;
        } else if (data.usetime > 30 && data.base == 1) {
          data.tabNo = 2;
          data.isInfinite = 2;
        } else {
          data.tabNo = 1;
          data.isInfinite = 2;
        }
        data.flow = Math.floor(data.flow / 1024) + "G";
      } else {
        if (data.usetime == 30 && data.base == 1) {
          data.tabNo = 3;
        } else if (data.usetime == 30 && data.base == 2) {
          data.tabNo = 1;
          data.isInfinite = 2;
        }
        data.flow = parseInt(data.flow) + "M";
      }
    } else {
      if (data.isInfinite == 2) {
        data.flow = "∞";
      } else if (data.flow / 1024 >= 1) {
        data.flow = Math.floor(data.flow / 1024) + "G";
      } else {
        data.flow = parseInt(data.flow) + "M";
      }
    }
    if (data.usetime == 7) {
      data.usetime = "(" + "当月7天有效" + ")";
    } else if (data.usetime == 30) {
      if (
        this.data.type
      ) {
        data.usetime = "";
      } else {
        data.usetime = "(30天有效)"
      }
    } else {
      data.usetime = "(" + data.usetime + "天有效" + ")";
    }
  },

  loadCard: function (data, lib) {
    const that = this
    for (var i = 0; i < data.length; i++) {
      var data = data[i]
      loadFlow(data);
      data.active = false;
      data.addType = 1;
      if (data.isDis == 1) {
        if (that.data.type) {
          switch (data.tabNo) {
            case 1:
              lib["tab1"].push(data);
              var title = 'tab1.title'
              that.setData({
                [title]: "固定套餐"
              })
              if (
                that.data.cardInfo.type == 4 ||
                util.contains(that.data.lid_free, that.data.cardInfo.lid)
              ) {
                data.addType = 2;
              }
              break;
            case 2:
              lib["tab2"].push(data);
              var title = 'tab2.title'
              that.setData({
                [title]: "普通多月套餐"
              })
              break;
            case 3:
              lib["tab3"].push(data);
              var title = 'tab3.title'
              that.setData({
                [title]: "叠加套餐"
              })
              break;
            default:
              break;
          }
        }
      }
    }
    that.setData({
      complete: true,
      libArr: lib
    })
  },

  //对套餐进行分类
  loadType: function (items, lib) {
    const that = this
    for (var i = 0; i < items.length; i++) {
      var data = items[i]
      this.loadFlow(data);
      data.active = false;
      data.addType = 1;
      if (data.isDis == 1) {
        switch ((data.type).toString()) {
          case "1":
            lib["tab1"].push(data);
            if (util.contains(this.data.lid_all, this.data.cardInfo.lid)) {
              data.addType = 2;
              var title = 'tab1.title'
              that.setData({
                [title]: "移动小王卡"
              })
            } else if (util.contains(this.data.lid_add, this.data.cardInfo.lid)) {
              var title = 'tab1.title'
              that.setData({
                [title]: "限时不限量套餐"
              })
            } else {
              var title = 'tab1.title'
              that.setData({
                [title]: "月套餐"
              })
            }
            break;
          case "4":
            lib["tab1"].push(data);
            var title = 'tab1.title'
            that.setData({
              [title]: "月套餐"
            })
            break;
            //月包叠加包
          case "2":
            lib["tab2"].push(data);
            var title = 'tab2.title'
            that.setData({
              [title]: "季包"
            })
            break;
            //季包
          case "5":
            lib["tab3"].push(data);
            var title = 'tab3.title'
            that.setData({
              [title]: "半年包"
            })
            break;
            //半年
          case "3":
            lib["tab4"].push(data);
            var title = 'tab4.title'
            that.setData({
              [title]: "年包"
            })
            //年包
            break;
          default:
            break;
        }
      }
    }
    that.setData({
      complete: true,
      libArr: lib
    })
  },
  getPackType: function () {
    let title = [];
    const lid = this.data.cardInfo.lid;
    const type = util.contains(this.data.lid_next, +lid);
    this.setData({
      type
    })
    if (type) {
      this.loadCard(this.data.package, this.data.libArr);
    } else {
      this.loadType(this.data.package, this.data.libArr);
    }
    if (this.data.tab1.title) {
      title.push(this.data.tab1);
    }
    if (this.data.tab2.title) {
      title.push(this.data.tab2);
    }
    if (this.data.tab3.title) {
      title.push(this.data.tab3);
    }
    if (this.data.tab4.title) {
      title.push(this.data.tab4);
    }
    title[0].active = true;
    this.setData({
      title,
      showTab: title[0].url
    })
  },
  getPackageList: function () {
    let that = this;
    util.requestForm(api.GetCardNo, {
      cardNo: util.trim(that.data.cardNo)
    }, "POST").then(function (res) {
      if (res.status == 0) {
        that.setData({
          cardInfo: res.data
        })
        util.requestForm(api.GetPackage, {
          cardNo: util.trim(that.data.cardNo)
        }, "POST").then(function (res) {
          if (res.status == 0) {
            that.setData({
              searchStatus: true,
              package: res.data
            })
            that.getPackType();
          } else {
            that.setData({
              searchStatus: true,
              package: [],
              complete: true,
              infoText: '该卡名下没有套餐'
            })
          }
        })
      } else {
        that.setData({
          searchStatus: true,
          complete: true,
          package: [],
          infoText: '找不到该卡'
        })
      }
    })
  },
  onKeywordConfirm() {
    this.getPackageList();
  },
  goSearch(event) {
    this.getPackageList();
  }
})