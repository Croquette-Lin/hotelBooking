<template>
  <div>
    <div class="header">我的</div>
    <isLogin v-if="token"></isLogin>
    <notLogin v-else></notLogin>
  </div>
</template>

<script>
import isLogin from "../components/login/isLogin";
import notLogin from "../components/login/notLogin";
import { mapState } from 'vuex';
export default {
  components: {
    isLogin,
    notLogin
  },
  computed: {
    ...mapState(["token"])
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
}
</style>
