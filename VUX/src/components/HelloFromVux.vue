<template>
   <div id="bindCardPage" v-bind:class='[moreClass,baseClass]'>
        <div class="logo">
          <img id="logo_img" class="otherImg" src="../img/logo_simple.png" v-if="type_logo === 'A'">
          <img id="logo_img" src="../img/Xlogo.png" v-if="type_logo === 'B'">
          <img id="logo_img" src="../img/baixun.png" v-if="type_logo === 'C'">
          <div class="icon-qiehuan llgt" v-if="type_logo === 'D'" ></div><div class="llgt_title" v-if="type_logo === 'D'">流量沟通100</div> 
        </div>
            <div class="bindCardMain">
                <!-- <div class="cardNoArea">
                    <label>
                        卡号
                    </label>
                    <span class="icon-saoyisao" id="scanQRCode" @click="scanQRCode">
                    </span>
                    <div>
                        <input id="card_no" placeholder="请输入流量卡号" type="text" v-model.lazy.trim="cardNo" @click="getList" @keyup="keyup" @keyup.enter="doSomething" />
                    </div>
                </div>
                <div class="FuzzySearch" v-if='FuzzySearch'>
                    <ul class="list">
                          <li  v-for ='cardNo in cards' @click = 'getCard(cardNo)'>
                            {{ cardNo }}
                          </li>
                    </ul>
                </div>
                <input id="bindCard"  v-bind:class="{ lyz: islyz }" type="button" value='查询'  @click="doSomething" />
                <div class="tips">
                    点击输入卡号右侧 "扫一扫" 图标，可直接扫码查询
                </div> -->
            </div>
    </div>
</template>

<script>
import { querystring } from 'vux'
export default {
  data() {
    return {
      type_logo: "",
      baseClass: "kuyu",
      moreClass: "",
      islyz: "",
      loading: "",
      flag: "",
      cardNo: "",
      aid: this.$route.query.aid,
      id: this.$route.query.id,
      FuzzySearch: "",
      cards: []
    };
  },
  // methods: {
  //   load: function(res) {
  //     const _this = this;
  //     sessionStorage.setItem("fid", res.data.fid);
  //     sessionStorage.setItem("sid", res.data.sid);
  //     sessionStorage.setItem("tid", res.data.tid);
  //     sessionStorage.setItem("zid", res.data.zid);
  //     sessionStorage.setItem("lid", res.data.lid);
  //     sessionStorage.setItem("cardid", res.data.id);
  //     sessionStorage.setItem("type", res.data.type);
  //     sessionStorage.setItem("tel", res.data.tel);
  //     sessionStorage.setItem("iccid", res.data.iccid);
  //     sessionStorage.setItem("packageid", res.data.packageid);
  //     sessionStorage.setItem("password", res.data.password);
  //     sessionStorage.setItem("amount", res.data.amount);
  //     sessionStorage.setItem("card_type", res.data.card_type);
  //     sessionStorage.setItem("operatorid", res.data.operatorid);
  //     sessionStorage.setItem("operator_type", res.data.operator_type);
  //     var time = 1513267200;
  //     //换卡供应商
  //     var changeType = [114, 121, 129];
  //     var operatorid = res.data.operatorid;
  //     var zid = res.data.zid;
  //     //换卡供应商账号
  //     var zidArr = [3];
  //     var timestamp = Date.parse(res.data.addtime) / 1000;
  //     if (c.contains(changeType, operatorid)) {
  //       sessionStorage.setItem("changeCard", true);
  //     } else if (c.contains(zidArr, zid)) {
  //       sessionStorage.setItem("changeCard", true);
  //     } else if (operatorid == 105 && timestamp < time) {
  //       sessionStorage.setItem("changeCard", true);
  //     } else if (operatorid == 113) {
  //       if (!c.contains(jdyArr, +res.data.tel)) {
  //         sessionStorage.setItem("changeCard", true);
  //       } else {
  //         sessionStorage.setItem("changeCard", false);
  //       }
  //     } else {
  //       sessionStorage.setItem("changeCard", false);
  //     }
  //     if (res.data.real_status == 1) {
  //       this.confirm_self();
  //       sessionStorage.setItem("real_status", "未认证");
  //     } else {
  //       sessionStorage.setItem("real_status", "已认证");
  //       if (res.data.amount) {
  //         if (!res.data.password) {
  //           $.confirm(
  //             "你查询的卡还没修改余额密码，请先去修改余额密码",
  //             function() {
  //               $.hideLoading();
  //               _this.$router.push({ path: "password" });
  //             },
  //             function() {
  //               $.hideLoading();
  //               _this.$router.push({ path: "home" });
  //             }
  //           );
  //         } else {
  //           $.hideLoading();
  //           _this.$router.push({ path: "home" });
  //         }
  //       } else {
  //         $.hideLoading();
  //         _this.$router.push({ path: "home" });
  //       }
  //     }
  //   },
  //   keyup: function(event) {
  //     this.FuzzySearch = false;
  //   },
  //   confirm_self: function() {
  //     const _this = this;
  //     $.confirm({
  //       title: "实名认证",
  //       text: "1",
  //       onOK: function() {
  //         $.hideLoading();

  //         _this.$router.push({ path: "register" });
  //       },
  //       onCancel: function() {
  //         $.hideLoading();
  //         _this.$router.push({ path: "home" });
  //       }
  //     });
  //     $(".weui-dialog__bd")
  //       .html(
  //         "" +
  //           '<div class="RightTip" style="font-size:14px;">' +
  //           '<span class="icon-zhuyi" style="color: #d89e5a;font-size:14px;"></span>' +
  //           "    尊敬的用户,为了贯彻工信部《电话用户真实身份信息登记规定》,请对您购买的流量卡进行实名认证。" +
  //           "</div>"
  //       )
  //       .css("padding", "0.8em");
  //     $(".weui-dialog__btn.primary").text("去认证");
  //     $(".weui-dialog__btn.default").text("下次再说");
  //   },
  //   scanQRCode: function() {
  //     wx.scanQRCode({
  //       needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
  //       scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
  //       success: function(res) {
  //         var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
  //         result = result.substring(result.indexOf(",") + 1);
  //         this.cardNo = result;
  //         doSomething();
  //       }
  //     });
  //   },
  //   getCard: function(cardNo) {
  //     this.FuzzySearch = false;
  //     this.cardNo = cardNo;
  //   },
  //   getList: function() {
  //     this.FuzzySearch = true;
  //   },
  //   doSomething: function() {
  //     const cardNo = this.cardNo;
  //     const id = this.id;
  //     const aid = this.aid;
  //     let flag = this.flag;
  //     const _this = this;
  //     if (!cardNo) {
  //       $.toptip("请输入流量卡号", 2000, "error");
  //       return false;
  //     } else {
  //       _this.loading = "查询中...";
  //       if (flag == 1) {
  //         $.toptip(_this.loading, 2000, "success");
  //         return;
  //       }
  //       $.showLoading();
  //       $(".weui-toast_content").text(_this.loading);
  //       flag = 1;
  //       var arr = [],
  //         cookArr = [];
  //       if ($.cookie("kahao")) {
  //         cookArr = $.cookie("kahao").split(",");
  //       }
  //       arr.push(cardNo);
  //       var b = arr.concat(cookArr);
  //       if (c.unique3(b).length > 5) {
  //         b.pop();
  //       }
  //       $.cookie("kahao", c.unique3(b));
  //       this.$http.$post(
  //         "?r=wms/personal/card-bind",
  //         {
  //           card: cardNo,
  //           uid: sessionStorage.getItem("id"),
  //           code: c.getUrlParam("code")
  //         },
  //         function(res) {
  //           if (res.code == 1) {
  //             sessionStorage.setItem("cardNo", _this.cardNo);
  //             if (sessionStorage.getItem("id") == res.data.uid) {
  //               _this.load(res);
  //             } else {
  //               this.$http.$get("?r=wms/personal/get-card", function(res) {
  //                 if (res.code == 0) {
  //                   $.hideLoading();
  //                   $.toptip(res.msg, 2000, "error");
  //                 } else {
  //                   _this.load(res);
  //                 }
  //               });
  //             }
  //             flag = 0;
  //           } else {
  //             $.hideLoading();
  //             flag = 0;
  //             $.toptip("没有该号码，请确认之后再查询", 2000, "error");
  //             return false;
  //           }
  //           _this.loading = "查询";
  //         }
  //       );
  //     }
  //   }
  // },
  // beforeCreate: function() {
  //   const _this = this;
  //   // if (window.location.search.indexOf("code") == -1) {
  //   //   // 转授权链接
  //   //   this.$http.$post(
  //   //     "?r=home/setting/change-url",
  //   //     {
  //   //       url: document.location.href,
  //   //       id: _this.$route.query.id || sessionStorage.getItem("id")
  //   //     },
  //   //     function(res) {
  //   //       if (res.code == 0) {
  //   //         return;
  //   //       }
  //   //       // window.location.href = res.data.url;
  //   //     }
  //   //   );
  //   // }
  // },
  created: function() {
    console.log(querystring.parse())
    var  host = window.location.host == "localhost:8081"
          ? "wx.szcoolfish.com"
          : window.location.host
    sessionStorage.setItem(
      "urlPreFix",
      `${document.location.protocol}//${
       host
      }`
    );
    if (this.id) {
      sessionStorage.setItem("id", this.id);
    }
    if (this.aid) {
      sessionStorage.setItem("aid", this.aid);
      if (this.aid == 125) {
        this.islyz = true;
        this.moreClass = "lyz";
        this.baseClass = "";
      }
      this.type_logo = "A";
    } else {
      if (this.uid == 51) {
        this.type_logo = "C";
      } else if (this.uid == 52) {
        this.type_logo = "D";
      } else {
        this.type_logo = "B";
      }
    }
    if (window.location.search.indexOf("code") == -1) {
      const _this = this;
      //配置jssdk
      this.$http.post(`${sessionStorage.getItem('urlPreFix')}?r=home/setting/get-jsapi-conf`).then(({ data }) => {
        console.log(data);
      });
    }
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
