<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>修改酒店信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form size="large" label-width="100px">
        <el-form-item label="酒店名称">
          <el-input v-model="editInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input v-model="editInfo.city"></el-input>
        </el-form-item>
        <el-form-item label="酒店简介">
          <el-input v-model="editInfo.info"></el-input>
        </el-form-item>
        <el-form-item label="酒店房间号">
          <el-input v-model="editInfo.number" disabled></el-input>
        </el-form-item>
        <el-form-item label="房间类型">
          <el-input v-model="editInfo.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="原价/晚">
          <el-input v-model="editInfo.oldprice"></el-input>
        </el-form-item>
        <el-form-item label="现价/晚">
          <el-input v-model="editInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="星级">
          <el-input v-model="editInfo.star"></el-input>
        </el-form-item>
        <el-form-item label="入住状态">
          <el-select v-model="editInfo.state" disabled>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="editInfo.state"></el-input> -->
        </el-form-item>
      </el-form>
      <el-button plain @click="goTohotel">返回</el-button>
      <el-button type="primary" @click="edit">确认修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "hoteledit",
  data() {
    return {
      editInfo: {
        name: "",
        city: "",
        info: "",
        number: "",
        type: "",
        oldprice: "",
        price: "",
        star: "",
        state: ""
      },
      options: [
        {
          value: "已入住",
          label: "已入住"
        },
        {
          value: "未入住",
          label: "未入住"
        },
        {
          value: "已预订",
          label: "已预订"
        }
      ]
    };
  },
  methods: {
    goTohotel() {
      this.$router.push({
        path: "/layout/hotel",
        name: "hotel"
      });
    },
    edit() {
      this.$http
        .post(
          "/api/hotel_category/editHotelDetail",
          {
            name: this.editInfo.name,
            city: this.editInfo.city,
            info: this.editInfo.info,
            oldprice: this.editInfo.oldprice,
            price: this.editInfo.price,
            star: this.editInfo.star,
            r_id: this.editInfo.r_id,
            number: this.editInfo.number
          },
          {
            emulateJSON: true
          }
        )
        .then(response => {
          this.$message({
            message: "修改成功！",
            type: "success",
            offset: 67,
            center: true
          });

          console.log(response);
          this.$router.push({
            path: "/layout/hotel",
            name: "hotel"
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.editInfo = this.$route.params.hotelEdit;
    console.log(this.editInfo);
  }
};
</script>

<style lang="scss" scoped>
.bread {
  margin: 20px 0px;
}
.search {
  text-align: left;
  height: 50px;
  // background-color: pink;
}
.box {
  // background-color: pink;
  text-align: left;
  .el-button {
    margin-left: 40px;
    margin-bottom: 50px;
  }
}
</style>