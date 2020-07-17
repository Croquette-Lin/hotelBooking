<template>
  <div class="lbox">
    <div class="header">
      {{hotelDetail.name}}
      <div class="back" @click="back">
        <i class="iconfont icon-houtuishangyige"></i>
      </div>
    </div>

    <!-- <el-alert v-show="showTag" title="预订成功！您已支付xxx元" center
      type="success" description="已成功为您预留房间，期待您的入住！" 
    show-icon></el-alert>-->

    <div class="hotelbox">
      <div class="check_in">
        <span class="line">您的入住日期为：</span>
        <span>{{bookingDetail.date1}}</span>
      </div>
      <div class="check_in">
        <span class="line">您的退房日期为：</span>
        <span>{{bookingDetail.date2}}</span>
      </div>
      <div class="day">
        <span class="line">入住天数：</span>
        <span>共{{countDay}}晚</span>
      </div>
      <div class="address">
        <span class="line">酒店地址：</span>
        <span>{{hotelDetail.address}}</span>
      </div>
      <div class="type">
        <span class="line">入住房型：</span>
        <span>{{hotelDetail.type}}</span>
      </div>
      <div class="number">
        <span class="line">入住房号：</span>
        <span>{{hotelDetail.number}}</span>
      </div>
    </div>
    <!-- <div class="toast">请填写您的信息</div>
    <div class="theline"></div>-->

    <div class="form">
      <el-form ref="form" :model="orderForm" label-width="90px" size="large">
        <el-form-item label="您的姓名">
          <el-input v-model="orderForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="orderForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证ID">
          <el-input v-model="orderForm.idnumber"></el-input>
        </el-form-item>
        <el-form-item label="预计到店">
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="orderForm.detailtime" style="width: 200px;"></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

    <div class="pay">
      <div class="left">
        <div class="price">
          <div class="new">总价￥{{countPrice}}</div>
          <div class="old">原价￥{{hotelDetail.oldprice}}/晚</div>
        </div>
      </div>
      <div class="right" @click="submit">提交订单</div>
    </div>

    <el-dialog title="提示" :append-to-body="true" :visible.sync="delDialogVisible" width="210px">
      <span>确定提交订单并支付金额？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dosubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      delDialogVisible: false,
      showTag: false,
      hotelDetail: {},
      bookingDetail: {},
      orderForm: {
        name: "",
        phone: "",
        idnumber: "",
        detailtime: ""
      },
      daynight: "",
      totalPrice: "",
      formatTime: "",
      createTime: "",
      orderId: ""
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "hoteldetail",
        path: "/hoteldetail",
        params: {
          searchInfo: this.bookingDetail,
          i_src: this.hotelDetail.src,
          i_name: this.hotelDetail.name,
          i_star: this.hotelDetail.star,
          i_info: this.hotelDetail.info,
          i_city: this.hotelDetail.city,
          i_address: this.hotelDetail.address,
          i_type: this.hotelDetail.type,
          i_oldprice: this.hotelDetail.oldprice,
          i_price: this.hotelDetail.price,
          i_number: this.hotelDetail.number
        }
      });
    },
    _getParams() {
      this.hotelDetail = this.$route.params.hotelDetail;
      this.bookingDetail = this.$route.params.bookingDetail;
    },
    submit() {
      this.delDialogVisible = true;
    },
    dosubmit() {
      this.delDialogVisible = false;
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      let orderNumber =
        "JD" +
        date.getFullYear() +
        month +
        strDate +
        date.getHours() +
        date.getMinutes() +
        date.getSeconds() +
        parseInt(10 * Math.random());
      this.createTime = currentdate; // 获取提交订单的创建订单时间
      this.orderId = orderNumber; // 获取订单编号
      this.$http
        .post(
          "/api/order/updateRoomState",
          {
            roomr_id: this.hotelDetail.r_id,
            roomNumber: this.hotelDetail.number
          },
          {
            emulateJSON: true
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          // console.log(e);
        });
      this.$http
        .post(
          "/api/order/addOrder",
          {
            checkInDate: this.bookingDetail.date1,
            checkOutDate: this.bookingDetail.date2,
            type: this.hotelDetail.type,
            daynight: this.daynight,
            userId: this.$store.state.username,
            roomr_id: this.hotelDetail.r_id,
            roomNumber: this.hotelDetail.number,
            totalPrice: this.totalPrice,
            hotelName: this.hotelDetail.name,
            roomImg: this.hotelDetail.src,
            idNumber: this.orderForm.idnumber,
            name: this.orderForm.name,
            phone: this.orderForm.phone,
            intime: this.fomatdetailTime, //预计到店时间
            createTime: this.createTime, //订单创建时间
            orderId: this.orderId, //订单编号
            state: "待入住"
          },
          {
            emulateJSON: true
          }
        )
        .then(response => {
          this.$message({
            message:
              "预订成功！您已支付" +
              this.totalPrice +
              "元！\n房间已为您保留，逾时将取消订单！",
            type: "success",
            offset: 67,
            center: true
          });
          this.$router.push({
            path: "/order",
            name: "order"
          });
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
      return;
    }
  },
  created() {
    this._getParams();
  },
  computed: {
    countDay: function() {
      let date1 = this.bookingDetail.date1;
      let date2 = this.bookingDetail.date2;
      let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
      let start = new Date(date1);
      let end = new Date(date2);
      let year = end.getFullYear() - start.getFullYear();
      let month = end.getMonth() - start.getMonth();
      let day = end.getDate() - start.getDate();
      if (month < 0) {
        year--;
        month = end.getMonth() + (12 - start.getMonth());
      }
      if (day < 0) {
        month--;
        let index = flag.findIndex(temp => {
          return temp === start.getMonth() + 1;
        });
        let monthLength;
        if (index <= 6) {
          monthLength = 31;
        } else if (index > 6 && index <= 10) {
          monthLength = 30;
        } else {
          monthLength = 28;
        }
        day = end.getDate() + (monthLength - start.getDate());
      }
      this.daynight = day;
      return day;
    },
    countPrice: function() {
      let theprice = "";
      theprice = this.hotelDetail.price * this.daynight;
      this.totalPrice = theprice;
      return theprice;
    },
    fomatdetailTime: function() {
      let getTime = new Date(this.orderForm.detailtime);
      let date = this.bookingDetail.date1;
      let h = getTime.getHours();
      let m = getTime.getMinutes();
      let s = getTime.getSeconds();
      let fomatTime = date + " " + h + ":" + m + ":" + s;
      this.formatTime = fomatTime;
      // console.log(fomatTime);
      return this.formatTime;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.box {
  min-width: 100%;
  background: yellow;
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
  position: relative;
  .back {
    position: absolute;
    left: 20px;
    top: 0;
  }
}
.hotelbox {
  width: 100%;
  text-align: left;
  line-height: 28px;
  font-size: 15px;
  padding: 15px;
  padding-left: 30px;
  background-color: rgb(247, 246, 220);
  box-sizing: border-box;
  width: 90%;
  margin: 20px;
  .line {
    font-weight: 700;
  }
}
.toast {
  width: 110px;
  margin-left: 20px;
  font-size: 14px;
  background-color: #2e4e9e;
  color: #fff;
  border-radius: 20px 20px 0px 0px;
  padding: 8px;
  padding-left: 12px;
  text-align: left;
}
.theline {
  margin-left: 20px;
  margin-right: 20px;
  border: 0.5px solid #2e4e9e;
  margin-bottom: 10px;
}
.form {
  padding: 0px 5px;
  margin-right: 50px;
  .el-input--suffix .el-input__inner {
    padding-right: 0px;
  }
}
.pay {
  position: fixed;
  background-color: #fff;
  width: 100%;
  height: 65px;
  display: flex;
  bottom: 0;
  .left {
    flex: 1;
    text-align: left;
    padding-left: 30px;
    padding-top: 13px;
    border-right: 1px solid #fff;
    .old {
      font-size: 11px;
      color: #999;
      text-decoration: line-through;
      padding-top: 3px;
    }
    .new {
      font-size: 19px;
      font-weight: 700;
      color: rgb(238, 51, 51);
    }
  }
  .right {
    flex: 2;
    line-height: 64px;
    color: #fff;
    font-weight: 700;
    font-size: 17px;
    background-color: rgb(238, 51, 51);
  }
}
</style>
<style>
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
</style>
