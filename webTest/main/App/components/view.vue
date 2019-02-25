<template>
    <div class="main">
        <h3 class="title">{{title}}
        </h3>
        <div class="info">{{info}}
        </div>
        <img class="img" v-bind:src="img" />
        <div class="body" v-html='body'>
        </div>
        <a v-if=" id== 80" href="javascript:" class="weui-btn pay" @click="pay">提交申请，开始支付</a>
    </div>
</template>
<style scoped>
.pay {
  background: #2398ff;
}
.main {
  width: 100%;
}

.title {
  text-align: center;
}

img {
  margin: 0.2rem;
  box-sizing: border-box;
  max-width: calc(100% - 0.4rem);
}

.body {
  padding: 0 2%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>

<script>
import c from "../index";

export default {
  data() {
    return {
      title: "",
      info: "",
      img: "",
      body: "",
      id: this.$route.query.id
    };
  },
  methods: {
    pay: function() {
      window.location.href = `http://wx.szcoolfish.com/coolfish/tpl/main/extend/shop4GWIFI.html?id=50`;
    }
  },
  beforeCreate: function() {
    const _this = this;
    c.$post(
      "/?r=home/view/index",
      {
        id: this.$route.query.id
      },
      function(data) {
        _this.title = data.data.title;
        _this.info = data.data.info;
        _this.img = data.data.img;
        _this.body = data.data.content;
      }
    );
  }
};
</script>