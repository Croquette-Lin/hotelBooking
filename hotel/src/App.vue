<template>
  <div id="app" v-cloak ref="app">
    <el-container>
      <div class="main">
        <transition :name="transitionName">
          <router-view></router-view>
        </transition>
      </div>

      <el-footer>
        <ul class="tab-item">
          <li
            class="item"
            v-for="(item, index) of list"
            :key="index"
            :class="{active:index == num}"
            @click="addClassName(index)"
          >
            <router-link :to="item.path" class="tab-item-link">
              <span v-show="num!=index" :class="item.icon"></span>
              <span v-show="num==index" :class="item.active"></span>
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: true,
      list: [
        {
          icon: "iconfont icon-shouye",
          active: "iconfont icon-fangzi",
          name: "首页",
          path: "/home"
        },
        {
          icon: "iconfont icon-dingdan",
          active: "iconfont icon-icondd2",
          name: "订单",
          path: "/order"
        },
        {
          icon: "iconfont icon-wode",
          active: "iconfont icon-04f",
          name: "我的",
          path: "/person"
        }
      ],
      num: 0,
      tabName: "",
      transitionName: ""
    };
  },
  methods: {
    addClassName: function(index) {
      this.num = index;
    }
  },
  created() {
    var body = document.getElementsByTagName("body")[0];
    body.style.margin = 0;
    body.style.padding = 0;
  },
  watch: {
    $route: function(to, from) {
      this.$refs.app.scrollTo(0, 0);
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      // this.$parent.$el.scrollTop = 0;
      //将不想有过渡动画效果的部分路由写进判断条件中
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index < from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-right";
      } else if (to.meta.index == 99) {
        this.transitionName = "";
      } else {
        this.transitionName = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  min-height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
* {
  list-style: none;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  width: 100%;
}
.slide-right-enter {
  left: 200%;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-enter-to {
  left: 0;
}
.slide-right-leave {
  left: 0;
}
.slide-right-leave-to {
  left: -100%;
}
.slide-left-enter {
  left: -100%;
}
.slide-left-enter-to {
  left: 0;
}
.slide-left-leave {
  left: 0;
}
.slide-left-leave-to {
  left: 200%;
}
.el-container {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  .main {
    flex: 1;
    background-color: #f2f2f2;
    color: #333;
    text-align: center;
    width: 100%;
    overflow-y: auto;
    position: relative;
    opacity: 1 !important;
    transform: translate3d(0, 0, 0) !important;
  }
  .el-footer {
    padding: 0;
    .tab-item {
      display: flex;
      // background-color: yellow;
      color: #333;
      text-align: center;
      width: 100%;
      height: 50px;
      padding: 0;
      margin: 0;
      .item {
        flex: 1;
        height: 50px;
        padding-top: 10px;
        span {
          font-size: 23px;
        }
        p {
          margin: 0;
        }
        a {
          text-decoration: none;
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
}
.el-container .el-footer .tab-item .ele-active[data-v-7ba5bd90] {
  color: #2e4e9e !important;
  z-index: 99;
}

</style>