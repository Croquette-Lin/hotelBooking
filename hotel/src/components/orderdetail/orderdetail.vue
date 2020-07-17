<template>
  <transition name="move">
    <div v-show="showFlag" class="box">
      <div class="header">
        <div class="back" @click="hide">
          <i class="iconfont icon-houtuishangyige"></i>
        </div>
        <div class="toast">
          <div class="message">{{order.g_state}}</div>
        </div>
      </div>

      <div class="hotel">
        <div class="title">{{order.h_name}}</div>
        <div class="type">{{order.h_type}}</div>
        <div class="line">{{order.g_ck_in}}</div>
        <div class="line">{{order.g_ck_out}}</div>
        <div class="line">共{{order.g_day}}晚</div>
        <div class="person">
          <div>
            <span class="listtitle">入住人</span>
            <span class="listinfo">{{order.g_name}}</span>
          </div>
          <div>
            <span class="listtitle">联系手机</span>
            <span class="listinfo">{{order.g_phone}}</span>
          </div>
          <div>
            <span class="listtitle">预计到店</span>
            <span class="listinfo">{{order.g_intime}}</span>
          </div>
          <div>
            <span class="listtitle">预留房号</span>
            <span class="listinfo">{{order.h_number}}</span>
          </div>
        </div>
      </div>

      <div class="orderinfo">
        <div class="title">订单信息</div>
        <div class="orderbox">
          <div>
            <span class="listtitle">订单号</span>
            <span class="listinfo">{{order.d_number}}</span>
          </div>
          <div>
            <span class="listtitle">下单时间</span>
            <span class="listinfo">{{order.d_ctime}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
   
<script>
// 导出组件
export default {
  props: {
    order: {}
  },
  data() {
    return {
      showFlag: false,
      address: "",
      orderList: this.order,
      hotelname: ""
    };
  },
  methods: {
    goTodetail() {},
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    back() {
      this.$router.push({ name: "order" });
    }
  },
  watch: {
    order(newVal, oldVal) {
      this.orderList = newVal;
    },
    $route: function(to, from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
* {
  list-style: none;
  margin: 0;
  padding: 0;
}
.box {
  height: 200%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 60px;
  z-index: 90;
  width: 100%;
  background: #eee;

  transform: translate3d(0, 0, 0);
}
.move-enter-active,
.move-leave-active {
  transition: all 0.2s linear;
}
.move-enter,
.move-leave-active {
  transform: translate3d(100%, 0, 0);
}
.header {
  width: 100%;
  height: 140px;
  background-color: #2e4e9e;
  position: relative;
  .back {
    position: absolute;
    left: 20px;
    top: 20px;
    color: #fff;
  }
  .toast {
    position: absolute;
    bottom: 20px;
    left: 20px;
    .message {
      color: #fff;
      font-weight: 700;
      font-size: 23px;
    }
  }
}

.hotel {
  background-color: #fff;
  text-align: left;
  margin-top: 10px;
  padding: 20px 0px 20px 20px;
  .title {
    font-size: 29px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .info {
    font-size: 17px;
    margin: 10px 0px;
  }
  .type {
    font-size: 17px;
    margin-bottom: 5px;
  }
  .line {
    display: inline-block;
    font-size: 16px;
    margin-bottom: 20px;
  }
}
.listtitle {
  width: 100px;
  display: inline-block;
  line-height: 30px;
  color: #555;
  font-size: 15px;
}
.listinfo {
  font-size: 15px;
}
.orderinfo {
  text-align: left;
  padding: 20px 0px 0px 20px;
  background-color: #fff;
  margin-top: 10px;
  height: 109px;
  .title {
    font-size: 17px;
    margin-bottom: 10px;
  }
}
</style>
