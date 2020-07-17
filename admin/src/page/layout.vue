<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#334157"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="2" class="fr">
            <template slot="title">{{adminname}},欢迎你</template>
            <el-menu-item @click="Loginout">退出登录</el-menu-item>
            <el-menu-item index="2-2">设置</el-menu-item>
            <el-menu-item index="2-3">首页</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            width="200px"
            router
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#334157"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/layout/home">
              <i class="iconfont icon-daohangshouye"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont icon-yonghu"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/layout/user">查看用户</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="iconfont icon-weilaijiudian"></i>
                <span>酒店管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/layout/hotel">酒店列表</el-menu-item>
                <el-menu-item index="/layout/hoteledit">编辑酒店</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="iconfont icon-dingdan-"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/layout/order">订单列表</el-menu-item>
                <el-menu-item index="/layout/orderwait">待入住订单</el-menu-item>
                <el-menu-item index="/layout/orderin">已入住订单</el-menu-item>
                <el-menu-item index="/layout/orderdone">已完成订单</el-menu-item>
                <el-menu-item index="/layout/ordercancel">已取消订单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/layout/consum">
              <i class="iconfont icon-tongji"></i>
              <span slot="title">汇总</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layout",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Loginout() {
      this.$confirm("您将退出登录状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        roundButton: true
      })
        .then(() => {
          window.localStorage.removeItem("adminname");
          window.localStorage.removeItem("admintoken");
          this.$store.dispatch("setToken", "");
          this.$store.dispatch("setAdmin", "");
          this.$message({
            message: "您已退出登录！",
            type: "success",
            offset: 63
          });
          this.$router.push({
            path: "/login"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
            offset: 10
          });
        });
    }
  },
  computed: {
    ...mapState(["adminname"])
  }
};
</script>

<style>
.el-container {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0;
  bottom: 0;
}
.el-header {
  padding: 0;
  z-index: 1000;
}
.el-header .fr {
  float: right;
}
.el-header .el-menu {
  border-bottom: none;
}
.el-aside,
.el-main {
  padding-top: 60px;
}

.el-aside .el-menu {
  border-right: none;
}
.el-header {
  background-color: #334157;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #334157;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>