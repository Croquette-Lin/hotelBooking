<template>
  <div>
    <div class="box">
      <i class="iconfont icon-morentouxiang"></i>
      <div class="name">用户名：</div>
      <div class="name">当前状态：未登录</div>
    </div>

    <div class="message">
      <div class="msg1">您当前暂未登录，请先登录！</div>
      <div class="btn" @click="goLogin">去登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: "/login",
        name: "login",
      });
    }
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
    background-color:#2e4e9e;
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
