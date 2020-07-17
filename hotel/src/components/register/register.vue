<template>
  <div>
    <div class="header">
      注册
      <div class="back" @click="back">
        <i class="iconfont icon-houtuishangyige"></i>
      </div>
    </div>
    <div class="box">
      <div class="login">
        <div class="title">用户注册</div>
        <div class="line">
          <span>用户名</span>
          <span>
            <input type="text" v-model="username" placeholder="用户名为4-10为数字或字母" />
          </span>
        </div>

        <div class="line">
          <span>密码</span>
          <span>
            <input type="password" v-model="password" placeholder="密码不小于2位" />
          </span>
        </div>
        <button class="btn_login" @click="goToLogin">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    goToLogin() {
      if (!this.username || !this.password) {
        this.$message({
          message: '注册信息不完整！',
          type: 'warning',
          offset: 63
        });
        return;
      }
      if (
        this.username.length < 3 ||
        this.username.length > 10 ||
        this.password.length < 2
      ) {
        this.$message({
          message: '用户名或密码格式错误！',
          type: 'warning',
          offset: 63
        });
      } else {
        this.$http
          .post("/api/user/addUser", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            this.$message({
              message: "注册成功！",
              type: "success",
              offset: 63
            });
            this.$router.push({
              path: "/login"
            });
          });
      }
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
  position: relative;
  .back {
    position: absolute;
    left: 20px;
    top: 0;
  }
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
  .line2 {
    text-align: left;
    margin-left: 45px;
    font-weight: 700;
    font-size: 17px;
    margin-top: 13px;
    margin-bottom: 5px;
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
  .register {
    font-size: 14px;
    border-bottom: 1px solid #999;
    width: 135px;
    margin: 0 auto;
  }
}
</style>