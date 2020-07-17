<template>
  <div class="transbody" id="test">
    <div class="header">
      <span>首页</span>
    </div>

    <!-- 搜索栏 -->
    <div class="bar">
      <i class="iconfont icon-search-line"></i>
      <input
        type="text"
        v-model="keywords"
        class="search_input"
        placeholder="输入目的地|关键字"
        @keyup.enter="searchthing"
      />
    </div>

    <div class="box">
      <!-- 查询的酒店列表 -->
      <div class="list_box" v-cloak>
        <ul class="list">
          <li
            class="list_loop"
            v-show="!showTag"
            v-cloak
            v-for="(item, index) in listInfo"
            :key="index"
            @click="goToHoteldetail(item)"
          >
            <div class="list_img">
              <img :src="item.src" style="width: 140px; height: 140px" alt />
            </div>
            <div class="list_right">
              <div class="title">{{item.name}}-{{item.type}}</div>
              <div class="rate">
                <div class="rate">
                  <el-rate
                    v-model="star[index]"
                    disabled
                    show-score
                    text-color="#ff9900"
                    :score-template="item.star + '星'"
                  ></el-rate>
                </div>
              </div>
              <div class="info">{{item.info}}</div>
              <div class="address">
                地址信息：
                <span>{{item.address}}</span>
              </div>
              <div class="city">{{item.city}}</div>
              <div class="know">了解详情></div>
              <div class="price">
                <div class="old">
                  ￥
                  <span>{{item.oldprice}}</span>
                </div>
                <div class="new">
                  <span class="symbol">￥</span>
                  <span class="priceword">{{item.price}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="nullbox">
      <div v-show="showTag">
        <i class="iconfont icon-wukongbiaoqing"></i>
        <div>未找到符合条件的结果！</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      showTag: false,
      searchInfo: {
        num: "",
        region: "",
        date1: "",
        date2: "",
        findstar: ""
      },
      listInfo: {},
      value: "",
      star: [],
      keywords: "",
      selecthotel: {}
    };
  },
  methods: {
    searchthing() {
      let keywords = this.keywords;
      this.$http
        .post(
          "/api/hotel_category/selectSearchKeywords",
          {
            keywords: keywords
          },
          { emulateJSON: true }
        )
        .then(response => {
          // console.log(response);
          response = response.body;
          this.listInfo = response;
          for (let i = 0, len = response.length; i < len; i++) {
            this.star.push(parseInt(response[i].star));
          }
          if (this.listInfo.length == "0") {
            this.showTag = true;
          }
        });
      return;
    },
    hideFather() {
      hideFlag = true;
    },
    _getAllHotel() {
      // 获取显示所有未入住的酒店列表
      axios.get("/api/hotel_category/selectSearchInfoAll").then(res => {
        console.log(res);
        res = res.data;
        this.listInfo = res;
        for (let i = 0, len = res.length; i < len; i++) {
          this.star.push(parseInt(res[i].star));
        }
      });
    },
    goToHoteldetail(item) {
      this.$router.push({
        path: "/hoteldetail",
        name: "hoteldetail",
        params: {
          i_src: item.src,
          i_name: item.name,
          i_star: item.star,
          i_info: item.info,
          i_city: item.city,
          i_address: item.address,
          i_type: item.type,
          i_oldprice: item.oldprice,
          i_price: item.price,
          i_number: item.number,
          searchInfo: this.searchInfo
        }
      });
    }
  },
  created() {
    this.searchInfo = {
      num: this.$route.params.num,
      region: this.$route.params.region,
      date1: this.$route.params.date1,
      date2: this.$route.params.date2,
      findstar: this.$route.params.findstar
    };

    if (
      this.searchInfo.num == "" &&
      this.searchInfo.region == "" &&
      this.searchInfo.findstar == ""
    ) {
      this.$http
        .get("/api/hotel_category/selectSearchInfoAll")
        .then(response => {
          response = response.body;
          this.listInfo = response;
          for (let i = 0, len = response.length; i < len; i++) {
            this.star.push(parseInt(response[i].star));
          }
          if (this.listInfo.length == "0") {
            this.showTag = true;
          }
        });
      return;
    }

    if (this.searchInfo.findstar == "all") {
      this.$http
        .post(
          "/api/hotel_category/selectSearchInfoAllStar",
          {
            num: this.searchInfo.num, // 人数，查询符合条件的房型
            region: this.searchInfo.region // 地区
          },
          { emulateJSON: true }
        )
        .then(response => {
          response = response.body;
          this.listInfo = response;
          for (let i = 0, len = response.length; i < len; i++) {
            this.star.push(parseInt(response[i].star));
          }
          if (this.listInfo.length == "0") {
            this.showTag = true;
          }
        });
      return;
    } else {
      this.$http
        .post(
          "/api/hotel_category/selectSearchInfo",
          {
            num: this.searchInfo.num, // 人数，查询符合条件的房型
            region: this.searchInfo.region, // 地区
            findstar: this.searchInfo.findstar // 星级
          },
          { emulateJSON: true }
        )
        .then(response => {
          response = response.body;
          this.listInfo = response;
          for (let i = 0, len = response.length; i < len; i++) {
            this.star.push(parseInt(response[i].star));
          }
          if (this.listInfo.length == "0") {
            this.showTag = true;
          }
        });
      return;
    }
    this._getAllHotel();
  },
  mounted() {
    window.scrollTo(0, 0);
    let dom = document.querySelector("#test");
    if (dom !== null) {
      dom.scrollTop = 0;
    }
  },
  updated() {
    let scrollTop = document.querySelector(".box");
    this.$nextTick(() => {
      document.body.scrollTop = 0;
    });
    scrollTop.scrollTop = 0;
  },
  watch: {
    $route(to, from) {
      document.querySelector(".list_box").scrollTop = 0;
      document.querySelector(".box").scrollTop = 0; 
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
};
</script>

<style lang="scss" scoped>
* {
  list-style: none;
  margin: 0;
  padding: 0;
}
[v-cloak] {
  display: none;
}
.nullbox {
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
}
.bar {
  height: 40px;
  width: 100%;
  padding: 5px 0px;
  position: relative;
  .search_input {
    width: 70%;
    height: 30px;
    border: 1px solid #2e4e9e;
    border-radius: 20px;
    text-indent: 40px;
    outline: none;
    margin-top: 5px;
  }
  .iconfont {
    position: absolute;
    top: 15px;
    left: 73px;
    font-size: 19px;
  }
}
.sort {
  background-color: pink;
  width: 100%;
  height: 30px;
  text-align: right;
  padding: 10px;
  .form_select .el-input__inner {
    height: 15px;
  }
}
.list_box {
  padding: 5px;
  text-align: left;
  .list {
    .list_loop {
      display: flex;
      flex-direction: inherit;
      width: 100%;
      height: 173px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      padding: 12px;
      padding-right: 20px;
      margin-bottom: 10px;
      .list_img {
        margin-right: 10px;
      }
      .list_right {
        flex: 1;
        line-height: 22px;
        position: relative;
        .title {
          font-weight: 700;
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .rate {
          font-size: 14px;
          margin: 5px 0;
        }
        .info {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .city {
          font-weight: 700;
          margin-top: 6px;
        }
        .address {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .know {
          font-size: 12px;
          color: #fff;
          position: absolute;
          width: 76px;
          height: 30px;
          text-align: center;
          right: 0;
          background-color: #f60;
          border-radius: 10px;
          padding: 5px;
          box-sizing: border-box;
          bottom: 1px;
        }
        .price {
          display: inline-block;
          position: absolute;
          left: 0;
          bottom: 0;
          vertical-align: bottom;
          .old {
            font-size: 10px;
            display: inline-block;
            color: #3f3f3f;
            text-decoration: line-through;
            vertical-align: bottom;
            span {
              font-size: 12px;
            }
          }
          .new {
            display: inline-block;
            color: red;
            font-size: 13px;
            vertical-align: bottom;
            .symbol {
              position: absolute;
              bottom: 0px;
            }
            .priceword {
              font-size: 19px;
              margin-left: 12px;
            }
          }
        }
      }
    }
  }
}
</style>