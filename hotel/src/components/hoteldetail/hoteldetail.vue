<template>
  <div class="box">
    <div class="header">
      酒店详情
      <div class="back" @click="back">
        <i class="iconfont icon-houtuishangyige"></i>
      </div>
    </div>

    <div class="hotelbox">
      <div class="image">
        <img :src="hotelDetail.src" alt="酒店图片" />
      </div>
      <split></split>
      <div class="hotelinfo">
        <div class="name">{{hotelDetail.name}}</div>
        <div class="star">
          <div class="title">酒店星级</div>
          <div class="inner">{{hotelDetail.star}}星</div>
        </div>
        <div class="info">
          <div class="title">酒店简介</div>
          <div class="inner">{{hotelDetail.info}}</div>
        </div>
        <div class="city">
          <div class="title">所在城市</div>
          <div class="inner">{{hotelDetail.city}}</div>
        </div>
        <div class="address">
          <div class="title">详细地址</div>
          <div class="inner">{{hotelDetail.address}}</div>
        </div>

        <div class="type">
          <div class="title type">房间类型</div>
          <div class="inner">{{hotelDetail.type}}</div>
        </div>
        <div class="price">
          <div class="old">
            <span class="title">原价￥</span>
            <span>{{hotelDetail.oldprice}}/晚</span>
          </div>
          <div class="new">
            <span class="titleprice">现价</span>
            <span class="newprice">￥{{hotelDetail.price}}/晚</span>
          </div>
        </div>
      </div>

      <div class="book" @click="goToBooking">
        <Button class="booking">
          立刻预订
          <i class="iconfont icon-jinru"></i>
        </Button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import split from "../split/split";
export default {
  data() {
    return {
      hotelDetail: {
        number: "",
        src: "",
        name: "",
        star: "",
        info: "",
        city: "",
        address: "",
        type: "",
        oldprice: "",
        price: ""
      },
      bookingDetail: {
        num: "",
        region: "",
        date1: "",
        date2: "",
        findstar: ""
      }
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "search",
        params: {
          num: this.bookingDetail.num,
          region: this.bookingDetail.region,
          date1: this.bookingDetail.date1,
          date2: this.bookingDetail.date2,
          findstar: this.bookingDetail.findstar
        }
      });
    },
    goToBooking() {
      let gettoken = window.localStorage.getItem("token");
      if (
        gettoken != "" &&
        this.bookingDetail.date1 != "" &&
        this.bookingDetail.date2 != ""
      ) {
        this.$router.push({
          path: "/booking",
          name: "booking",
          params: {
            hotelDetail: this.hotelDetail,
            bookingDetail: this.bookingDetail
          }
        });
      } else {
        this.$confirm("当前预订信息不完整，是否返回首页重新填写", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
          customClass: 'messageBox'
        })
          .then(() => {
            this.$router.push({
              path: "/home",
              name: "home"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
        return;
      }
    }
  },
  created() {
    this.bookingDetail = {
      num: this.$route.params.searchInfo.num,
      region: this.$route.params.searchInfo.region,
      date1: this.$route.params.searchInfo.date1,
      date2: this.$route.params.searchInfo.date2,
      findstar: this.$route.params.searchInfo.findstar
    };
    this.hotelDetail = {
      src: this.$route.params.i_src,
      name: this.$route.params.i_name,
      star: this.$route.params.i_star,
      info: this.$route.params.i_info,
      city: this.$route.params.i_city,
      address: this.$route.params.i_address,
      type: this.$route.params.i_type,
      oldprice: this.$route.params.i_oldprice,
      price: this.$route.params.i_price,
      number: this.$route.params.i_number
    };
  },
  components: {
    split
  },
  watch: {
    $route: function(to, from) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$nextTick(() => {
        document.body.scrollTop = 0;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;
  width: 100%;
  height: 1150px;
}
.header {
  background-color: #2e4e9e;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-weight: 600;
  width: 100%;
  height: 60px;
  padding: 0px;
  margin: 0px;
  position: fixed;
  .back {
    position: absolute;
    left: 20px;
    top: 0;
  }
}

.hotelbox {
  width: auto;
  text-align: left;
  line-height: 28px;
  font-size: 17px;

  .image {
    height: 375px;
    width: 100%;
    display: flex;
      justify-content: center;
      align-items: center;
    img {
      max-width: 100%;
      max-height: 375px;
      
    }
  }
  .hotelinfo {
    padding: 20px;
    .title {
      color: #2e4e9e;
      padding: 5px;
      font-weight: 700;
    }
    .name {
      font-size: 28px;
      font-weight: 700;
      padding-left: 4px;
      margin-bottom: 10px;
      line-height: 56px;
      border-bottom: 1px solid #aaa;
    }
    .inner {
      padding-left: 5px;
      margin-bottom: 20px;
    }
    .price {
      position: relative;
      width: 100%;
      height: 60px;
    }
    .old {
      position: absolute;
      right: 12px;
      text-decoration: line-through;
      font-size: 12px;
      text-align: right;
    }
    .new {
      font-size: 26px;
      color: #ff4545;
      position: absolute;
      right: 10px;
      bottom: 0px;
      vertical-align: center;
      .titleprice {
        display: inline-block;
        font-size: 16px;
        color: #fff;
        width: 50px;
        height: 28px;
        text-align: center;
        background-color: #ff4545;
        border-radius: 10px;
      }
      .newprice {
        font-weight: 700;
        vertical-align: bottom;
      }
    }
  }
  .book {
    position: relative;
    .booking {
      position: absolute;
      right: 30px;
      display: inline-block;
      text-align: center;
      border: none;
      width: 170px;
      height: 60px;
      font-size: 23px;
      background-color: #ff4545;
      color: #fff;
      outline: none;
      border-radius: 20px;
    }
    .iconfont {
      font-size: 22px;
    }
  }
}
</style>
<style>
.el-message-box, .messageBox {
  width: 80%!important;
}
</style>