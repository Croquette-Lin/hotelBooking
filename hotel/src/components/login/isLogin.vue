<template>
  <div>
    <div class="box">
      <i class="iconfont icon-morentouxiang"></i>
      <div class="name">用户名：{{username}}</div>
      <div class="name">当前状态：已登录</div>
    </div>

    <div class="message">
      <div class="msg1">您已登录成功！欢迎你！</div>
      <div class="btn" @click="Loginout">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    Loginout() {
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("token");
      this.$store.dispatch("setToken", "");
      this.$store.dispatch("setUser", "");
      this.$message({
        message: "您已退出登录！",
        type: "success",
        offset: 63
      });
      this.$router.push({
        path: "/home"
      });
    }
  },
  computed: {
    ...mapState(["username"])
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 200px;
  text-align: center;
  margin-top: 100px;
  i {
    font-size: 100px;
  }
  .name {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
  }
}
.message {
  margin: 20px;
  .msg1 {
    font-size: 16px;
    margin-bottom: 20px;
    margin-left: 10px;
  }
  .btn {
    background-color: #2e4e9e;
    width: 70%;
    height: 60px;
    margin: 0 auto;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-weight: 700;
    border-radius: 20px;
  }
}
</style>
