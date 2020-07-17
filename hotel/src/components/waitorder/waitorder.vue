<template>
  <transition name="move">
    <div class="box">
      <ul class="list">
        <li
          class="item"
          v-show="orderDetail.length"
          v-for="(order, index) in orderDetail"
          :key="index"
          @click="selectOne(order,$event)"
        >
          <div class="orderid">
            <span>订单编号</span>
            <span>{{order.d_number}} --- {{index}}</span>
          </div>
          <div class="title">
            <div class="left">
              <i class="iconfont icon-shouye"></i>
              <span>{{order.h_name}}</span>
            </div>
            <div class="right">{{order.g_state}}</div>
          </div>
          <div class="info">
            <div class="img">
              <img :src="order.img" />
            </div>
            <div class="detail">
              <div class="line">
                <span>1间</span>
                <span>{{order.h_type}}</span>
              </div>
              <div class="line">{{order.g_ck_in}} - {{order.g_ck_out}}</div>
              <div class="price">总价：￥{{order.h_price}}</div>
            </div>
          </div>
          <div class="btn">
            <button>
              查看详情
              <i class="iconfont icon-jinru"></i>
            </button>
          </div>
        </li>
      </ul>
      <div class="ordernull" v-show="!orderDetail.length">
        <i class="iconfont icon-wukongbiaoqing"></i>
        <div>您当前暂时未有订单！</div>
      </div>
      <orderdetail ref="orderdetail" :order="selectorder"></orderdetail>
    </div>
  </transition>
</template>
   
<script>
import orderdetail from "@/components/orderdetail/orderdetail";
// 导出组件
export default {
  name: "waitorder",
  data() {
    return {
      orderDetail: {},
      selectorder: {}
    };
  },
  methods: {
    selectOne(order, $event) {
      this.selectorder = order;
      this.$refs.orderdetail.show();
    }
  },
  components: {
    orderdetail
  },
  mounted() {
    this.$http
      .post("/api/order/getWaitOrder", {
        userId: this.$store.state.username
      })
      .then(response => {
        response = response.body;
        this.orderDetail = response;
      });
  }
};
</script>

<style lang="scss" scoped>
* {
  list-style: none;
}
.ordernull {
  margin-top: 10%;
  font-size: 18px;
  i {
    font-size: 100px;
  }
  div {
    font-size: 23px;
    padding-left: 20px;
    margin-top: 20px;
  }
}
.move-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
  position: absolute;
  z-index: -20;
}
.move-enter {
  transform: translate3d(100%, 0, 0);
  position: absolute;
}
.move-leave-active,
.move-enter-active {
  transition: 0.5s all ease;
}

.list {
  text-align: left;
  padding: 0px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transform: translate3d(0, 0, 0);
  .item {
    box-sizing: border-box;
    height: 190px;
    margin: 10px;
    background-color: #fff;
    border-radius: 20px;
    .orderid {
      font-size: 14px;
      background-color: #2e4e9e;
      color: #fff;
      border-radius: 10px 10px 0px 0px;
      padding: 5px;
      padding-left: 15px;
    }
    .title {
      padding-left: 15px;

      display: flex;
      height: 40px;
      box-sizing: border-box;
      vertical-align: top;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
      .left {
        flex: 1;
        margin: 10px 0px;
        i {
          font-size: 15px;
          padding: 5px;
          color: #fff;
          background-color: #37aa85;
          border-radius: 50%;
        }
        span {
          padding: 5px;
          font-weight: 700;
        }
      }
      .right {
        width: 60px;
        height: 20px;
        line-height: 20px;
        margin: 10px 0px;
      }
    }
    .info {
      padding-left: 15px;
      display: flex;
      .img {
        width: 70px;
        height: 70px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .detail {
        flex: 1;
        font-size: 15px;
        .line {
          margin-bottom: 5px;
        }
      }
    }
    .btn {
      position: relative;
      button {
        position: absolute;
        right: 0;
        margin-right: 10px;
        width: 100px;
        height: 30px;
        border-radius: 20px;
        border-style: none;
        background-color: #37aa85;
        color: #fff;
        outline: none;
        i {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
