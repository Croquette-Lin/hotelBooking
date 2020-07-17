<template>
  <div>
    <div class="header">登录</div>
    <div class="box">
      <div class="login">
        <div class="title">用户登录</div>
        <div class="line">
          <span>用户名</span>
          <span>
            <input type="text" v-model="username" placeholder />
          </span>
        </div>

        <div class="line">
          <span>密码</span>
          <span>
            <input type="password" v-model="password" placeholder />
          </span>
        </div>

        <button class="btn_login" @click="login">登录</button>
        <div v-if="loginflag" class="loginfail">登录失败！用户名或密码错误！</div>
        <div class="register" @click="goToRegister">没有账号？点击注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      loginflag: false
    };
  },
  methods: {
    goToRegister() {
      this.$router.push({
        path: "/register",
        name: "register",
        params: {
          // hotelDetail: this.hotelDetail,
          // bookingDetail: this.bookingDetail
        }
      });
    },
    login() {
      if (!this.username || !this.password) {
        this.$message({
          message: '用户名或密码不能为空！',
          type: 'warning',
          offset: 63
        });
        return;
      } else {
        let postDate = {
          username: this.username,
          password: this.password
        };
        axios
          .post("/api/user/findUser", qs.stringify(postDate))
          .then(res => {
            console.log(res);
            if (res.data.state === 0) {
              window.localStorage.setItem("username", res.data.username);
              window.localStorage.setItem("token", res.data.token);
              this.$store.dispatch("setToken", res.data.token);
              this.$store.dispatch("setUser", res.data.username);
              console.log(res);
              this.$message({
                message: "登录成功！",
                type: "success",
                offset: 63
              });
              this.$router.push("/home");
              return;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
          console.log('abc');
        // console.log(errorMessage);
      }
      console.log('123');
      setTimeout(() => {
        if (this.$store.state.token == "") {
        this.$message({
          message: '登录失败！用户名或密码错误！',
          type: 'error',
          offset: 63
        });
      }
      }, 1000);
      
      console.log('456');
    }
  }
};
</script>
<style lang="scss" scoped>
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
  border-bottom: 1px solid #2e4e9e;
  // position: relative;
}
.box {
  position: relative;
  width: 100%;
  height: 800px;
  background-color: #2e4e9e;
}
.login {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  margin-top: 25%;
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  background-color: #eee;
  border-radius: 40px;
  padding-top: 35px;
  .title {
    margin-bottom: 25px;
    font-weight: 700;
    font-size: 20px;
  }
  .line {
    margin-right: 30px;
    text-align: right;
    margin-bottom: 10px;
    color: #444;
    font-weight: 700;
    font-size: 17px;
  }
  input {
    margin-left: 5px;
    border: none;
    padding: 10px;
    border-radius: 30px;
    outline: none;
  }
  .btn_login {
    width: 200px;
    height: 50px;
    font-size: 18px;
    background-color: #37aa85;
    border: none;
    border-radius: 20px;
    color: #fff;
    margin: 10px 0;
    outline: none;
  }
  .loginfail {
    font-size: 14px;
    color: red;
    margin-bottom: 5px;
  }
  .register {
    font-size: 14px;
    border-bottom: 1px solid #999;
    width: 135px;
    margin: 0 auto;
  }
}
</style>