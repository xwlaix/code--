<template>
    <div class="TotalContentBox">
        <!--搜索开始-->
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell header_psw">
                <div class="weui-cell__hd">
                    需要实名认证, 验证身份证和卡号。
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label passLabel">卡号：</label>
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                    <input class="weui-input" id="card" placeholder="请输入卡号" v-model.trim="card">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label passLabel">身份证：</label>
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                    <input class="weui-input" id="oldpsw" placeholder="请输入身份证" v-model.trim="cardID" @blur="caption" style="width: 90%;">
                    <i class=" weui-icon_msg" v-bind:class="[detailClass]" style="font-size: 16px" @click="clear"></i>
                </div>
            </div>

            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label passLabel">新密码：</label>
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                    <input class="weui-input" id="newpsw1" placeholder="请输入新密码" type="password" v-model.trim="newpsw1">
                </div>
                <div class="weui-cell__ft">
                    <i class="weui_icon_warn"></i>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label passLabel">确认新密码：</label>
                </div>
                <div class="weui-cell__bd weui-cell_primary">
                    <input class="weui-input" id="newpsw2" placeholder="请重复输入新密码" type="password" v-model.trim="newpsw2">
                </div>
                <div class="weui-cell__ft">
                    <i class="weui_icon_warn"></i>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <div class="weui-btn change" type="submit" @click="change">找回密码</div>
        </div>
        <!--搜索结束-->
    </div>
</template>
<style scoped>
.header_psw {
  color: #757575 !important;
}
.weui-input {
  text-indent: 5px;
}
.passLabel {
  color: #2c2c2c;
}
.button.weui-btn,
input.weui-btn,
.weui-btn-area {
  z-index: 100;
}
.change {
  height: 40px;
  font-size: 15px;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 40px;
  background-color: rgb(51, 166, 240);
}
::-webkit-input-placeholder {
  color: #a9a9a9 !important;
}
:-moz-placeholder {
  color: #a9a9a9 !important;
}
::-moz-placeholder {
  color: #a9a9a9 !important;
}
:-ms-input-placeholder {
  color: #a9a9a9 !important;
}
</style>

<script>
import c from "../index";
export default {
  data() {
    return {
      card: localStorage.getItem("cardNo"),
      cardID: "",
      newpsw1: "",
      newpsw2: "",
      detailClass: ""
    };
  },
  methods: {
    caption: function() {
      const _this = this;
      if (_this.detailClass != "weui-icon-success") {
        c.$post(
          "?r=wms/personal/verification-password",
          { cardID: _this.cardID, card: _this.card, uid: 50 },
          function(res) {
            if (res.code == 0) {
              $.toptip(res.msg, 2000, "error");
              _this.detailClass = "weui-icon-cancel";
            } else {
              _this.detailClass = "weui-icon-success";
            }
          }
        );
      }
    },
    clear: function() {
      if (this.detailClass != "weui-icon-success") {
        this.cardID = "";
        this.detailClass = "";
      }
    },
    change: function() {
      const _this = this;
      if (!_this.card) {
        $.toptip("请输入卡号", 2000, "error");
        return;
      }
      if (!_this.cardID) {
        $.toptip("请输入身份证", 2000, "error");
        return;
      }
      if (!_this.newpsw1 || !_this.newpsw2) {
        $.toptip("请输入新密码", 2000, "error");
        return;
      }
      if (_this.detailClass != "weui-icon-success") {
        $.toptip("请验证身份证", 2000, "error");
        return;
      }
      if (_this.newpsw1 == _this.newpsw2) {
        $.showLoading();
        c.$post(
          "?r=wms/personal/verification-password",
          {
            card: _this.card,
            cardID: _this.cardID,
            type: 1,
            newPassword: _this.newpsw1
          },
          function(res) {
            if (res.code == 1) {
              $.alert("操作成功", function() {
                _this.$router.push({ path: "home" });
              });
            } else {
              $.toptip(res.msg, "error");
            }
          },
          function() {
            $.hideLoading();
            $.toptip("操作失败", "error");
          }
        );
      } else {
        $.toptip("两次输入的密码不一致", 2000, "error");
      }
    }
  }
};
</script>
