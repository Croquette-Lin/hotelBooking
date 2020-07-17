<template>
  <div>
    <div class="header">
      订单
    </div>
    <ul class="topNav">
      <li :class="[showIn==1?'active':'']" @click="showIn=1">全部</li>
      <li :class="[showIn==0?'active':'']" @click="showIn=0">待入住</li>
    </ul>
    <div class="main">
      <allorder v-show="showIn==1"></allorder>
      <waitorder v-show="showIn==0"></waitorder>
    </div>
    
  </div>
</template>
   
<script>
import allorder from '@/components/allorder/allorder'
import waitorder from '@/components/waitorder/waitorder'

export default {
  name: "order",
  components: {
    allorder,
    waitorder
  },
  data() {
    return {
      showIn:1
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  list-style: none;
}
.header {
  background-color:#2e4e9e;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-weight: 600;
  width: 100%;
  height: 60px;
  padding: 0px;
  margin: 0px;
}
.active{
  color: #2e4e9e;
  border-bottom: 2px solid #2e4e9e;
}
.topNav {
  display: flex;
  flex-direction: inherit;
  padding: 0;
  li {
    flex: 1;
    padding-bottom: 15px;
  }
}
</style>
