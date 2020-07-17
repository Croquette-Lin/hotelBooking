<template>
  <div class="login">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <div class="title">后台管理登录界面</div>
      <el-form-item prop="username">
        <el-input v-model="form.adminname" placeholder="账户"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "login",
  data() {
    return {
      form: {
        adminname: "",
        password: ""
      },
      rules: {
        adminname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    // this.$http.get("/api/user/selectAlladmin").then(data => {
    //   console.log(data);
    // });
    // this.$http
    //   .get("/api/hotel_category/selectHotel")
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => console.log(err));
  },
  methods: {
    login() {
      if (!this.form.adminname || !this.form.password) {
        this.$message({
          message: "用户名或密码不能为空！",
          type: "warning",
          offset: 63
        });
        // return;
      } else {
        let postDate = {
          adminname: this.form.adminname,
          password: this.form.password
        };
        // console.log(postDate);
        axios
          .post("/api/user/findAdmin", qs.stringify(postDate))
          .then(res => {
            // console.log(res);
            if (res.data.state === 0) {
              window.localStorage.setItem("adminname", res.data.adminname);
              window.localStorage.setItem("admintoken", res.data.admintoken);
              this.$store.dispatch("setToken", res.data.admintoken);
              this.$store.dispatch("setAdmin", res.data.adminname);
              console.log(res);
              this.$message({
                message: "登录成功！",
                type: "success",
                offset: 63
              });
              this.$router.push("/layout/home");
              return;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        setTimeout(() => {
          if (this.$store.state.admintoken == "") {
            this.$message({
              message: "登录失败！用户名或密码错误！",
              type: "error",
              offset: 63
            });
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  height: 100%;
  background: url("../../assets/img/bgadmin.jpg");
  position: fixed;
  background-size: 100% 100%;
  // background-color: rgb(51, 65, 87);
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 300px;
    padding: 0px 40px 15px 40px;
    margin: 125px auto;
    background: rgba(7, 46, 105, 0.6);
    border-radius: 20px;
    .title {
      margin: 40px 0;
      color: #fff;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>