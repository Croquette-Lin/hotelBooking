<template>
  <div class="box">
    <div>欢迎来到</div>
    <div>酒店预订管理后台系统</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // note: {
      //   backgroundImage: "url(" + require("../assets/img/bgadmin.jpg") + ")",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "25px auto",
      //   marginTop: "5px"
      // }
    };
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding-top: 200px;
  width: 100%;
  
  div {
    margin-bottom: 40px;
    font-size: 20px;
    color: rgb(51, 65, 87);
  }
  // height: 100%;
  // background-color: #ccc;
}
</style>