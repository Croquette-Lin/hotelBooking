<template>
  <div>
    <div class="header">
      <span>首页</span>
    </div>

    <!-- 轮播图 -->
    <div class="lunbo">
      <el-carousel trigger="click" height="250px" :interval="3000">
        <el-carousel-item v-for="item in lunboList" :key="item.id">
          <h3 class="small">
            <img v-lazy="item.src" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 表单搜索 -->
    <el-form ref="Search_form" :model="Search_form" label-width="80px" size="mini">
      <el-form-item label="目的地">
        <el-select v-model="Search_form.region" placeholder="请选择入住目的地">
          <!-- <option v-for="option in options" v-bind:value="option.id">{{ option.name }}</option> -->
          <el-option
            v-for="(item, index) in city"
            :key="item.id"
            :label="item.city"
            :value="item.city"
          >{{ item.city }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入住日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择入住日期"
            v-model="Search_form.date1"
            style="width: 100%;"
            class="check_date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="退房日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择退房日期"
            v-model="Search_form.date2"
            style="width: 100%;"
            class="check_date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="入住人数">
        <el-select v-model="Search_form.num" placeholder="请选择入住人数">
          <el-option label="1" value="单人间"></el-option>
          <el-option label="2" value="双人间"></el-option>
          <el-option label="3人以上" value="多人间"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="酒店级别">
        <el-select v-model="Search_form.findstar" placeholder="请选择酒店级别">
          <el-option label="不限" value="all"></el-option>
          <el-option label="五星" value="5"></el-option>
          <el-option label="四星" value="4"></el-option>
          <el-option label="三星" value="3"></el-option>
          <el-option label="二星以下" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <!-- <router-link to="/search" event="click"> -->
        <el-button
          style="outline:none"
          hidefocus="hidefocus"
          class="btn_search"
          type="primary"
          @click="goToSearch(Search_form)"
          
        >搜索</el-button>
        <el-button style="outline:none" hidefocus="hidefocus" class="btn_cancel">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 推荐 -->
    <div class="box">
      <ul class="topNav">
        <li class="active">猜您喜欢</li>
      </ul>
      <div class="hotel">
        <div
          class="hotel-box"
          v-for="(item, index) in hotelInfo"
          :key="index"
          @click="goToHoteldetail(item)"
        >
          <div class="hotel-img">
            <img v-lazy="item.src" />
          </div>
          <div class="hotel-title">{{item.name}}-{{item.type}}</div>
          <div class="rate">
            <el-rate
              v-model="star[index]"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="item.star + '星'"
            ></el-rate>
            <!-- v-model="star" -->
          </div>
          <div class="hotel-city">{{item.city}}</div>
          <div class="hotel-info">{{item.info}}</div>
          <div class="hotel-price">
            <span class="now">
              ￥
              <span class="num">{{item.price}}</span>
            </span>
            <span class="old">
              ￥
              <span class="num">{{item.oldprice}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import search from "@/components/search/search";
export default {
  name: "home",
  data() {
    return {
      showIn: 1,
      lunboList: [
        {
          id: 0,
          src: "/static/img/lb1.jpg"
        },
        {
          id: 1,
          src: "/static/img/lb2.jpg"
        },
        {
          id: 2,
          src: "/static/img/lb3.jpg"
        },
        {
          id: 3,
          src: "/static/img/lb4.jpg"
        }
      ],
      hotelInfo: {},
      Search_form: {
        num: "",
        region: "",
        date1: "",
        date2: "",
        findstar: ""
      },
      star: [],
      city: [],
      selecthotel: {}
    };
  },
  methods: {
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
          searchInfo: this.Search_form
        }
      });
    },
    goToSearch(Search_form) {
      this.$router.push({
        path: "/search",
        name: "search",
        params: {
          num: Search_form.num,
          region: Search_form.region,
          date1: Search_form.date1,
          date2: Search_form.date2,
          findstar: Search_form.findstar
        }
      });
    },
    famatTime(data) {
      let fmt = "yyyy-MM-dd hh:mm:ss";
      const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分钟
        "s+": date.getSeconds() //秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear());
      }
      for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            o[k].toString().length == 1 ? "0" + o[k] : o[k]
          );
        }
      }
      return fmt;
    }
  },
  mounted() {
    window.scrollTo(0,0);
  },
  created() {
    // 获取数据库中酒店信息
    this.$http.get("/api/hotel_category/selectHotel").then(response => {
      response = response.body;
      this.hotelInfo = response;
      for (let i = 0, len = response.length; i < len; i++) {
        this.star.push(parseInt(response[i].star));
      }
    });

    // 获取数据库中已有的酒店
    this.$http.get("/api/hotel_category/selectHotelCity").then(response => {
      response = response.body;
      this.city = response;
    });
  },
  components: {
    search
  },
};
</script>

<style lang="scss" scoped>
* {
  list-style: none;
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
.lunbo {
  position: relative;
  // background-color:#37aa85;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  // opacity: 0.75;
  line-height: 150px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 300px;
  }
}

.el-form {
  background-color: #fff;
  // border-top: 1px solid #d3dce6;
  border-bottom: 1px solid #d3dce6;
  // border-radius: 20px;
  margin: 10px;
  text-align: left;
  padding: 10px;
  padding-top: 30px;
  padding-right: 40px;
  position: relative;
  .check_date {
    position: absolute;
    // background-color: yellow;
  }
}
.btn_search {
  background-color: #37aa85;
  border: none;
  border-radius: 15px;
  outline: none;
}
.btn_cancel {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #3f3f3f;
  border-radius: 15px;
  outline: none;
}
.btn_search:focus,
.btn_search:active:focus {
  outline: none;
  border-color: transparent;
  box-shadow: none;
}
// .btn_cancel:
.topNav {
  display: flex;
  flex-direction: inherit;
  padding: 0;
  width: 30%;
  margin: 0 auto;
  li {
    flex: 1;
    padding-top: 30px;
    padding-bottom: 20px;
    letter-spacing: 5px;
    color: #2e4e9e;
    border-bottom: 1px solid #2e4e9e;
  }
}
.box {
  height: 2000px;
  background-color: #fff;
  .hotel {
    width: 100%;
    height: 100%;
    text-align: left;
    background-color: #fff;
    margin-top: 10px;
    .hotel-box {
      display: inline-block;
      width: 170px;
      height: 335px;
      // border: 1px solid #9f9f9f;
      box-shadow: 1px 1px 1px #eee;
      margin-left: 8px;
      margin-top: 8px;
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      position: relative;
      // border-radius: 10px;
      vertical-align: top;
      .hotel-img {
        width: 150px;
        height: 150px;
        background-color: yellow;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .hotel-title {
        font-weight: 700;
        font-size: 17px;
        margin-top: 10px;
        margin-bottom: 5px;
      }
      .hotel-city {
        font-size: 15px;
        color: #666666;
        font-weight: 700;
        margin-top: 5px;
      }
      .hotel-info {
        font-size: 11px;
        color: #ccc;
        padding-left: 1px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .hotel-price {
        position: absolute;
        bottom: 5px;
        .now {
          color: red;
          font-size: 13px;
          span {
            font-size: 18px;
          }
        }
        .old {
          font-size: 13px;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
