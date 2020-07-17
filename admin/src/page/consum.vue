<template>
  <div>
    <div id="echarts_box" style="width: 500px;height:400px; margin-top:30px"></div>
    <div id="echarts_box2" style="width: 900px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      datalist: {},
      pricelist: {},
      names: [],
      prices: []
    };
  },
  methods: {
    _getlist() {
      this.$http.get("/api/order/selectStateCount").then(response => {
        response = response.body[0];
        // console.log(response.c_done);
        this.datalist = response;
        console.log(this.datalist);
        // this.series.data[0] = this.datalist.c_wait
        // this.series.data[1] = this.datalist.c_in
        // this.series.data[2] = this.datalist.c_done
        // this.series.data[3] = this.datalist.c_cancel
        // this.opinionData.value = this.datalist.c_cancel;
      });
    },
    _getPrice() {
      this.$http.get("/api/order/selectPriceCount").then(response => {
        console.log(response);
        response = response.body;
        this.pricelist = response;
        console.log(this.pricelist);
        for (let i = 0, len = this.pricelist.length; i < len; i++) {
          this.names.push(this.pricelist[i].h_name);
          this.prices.push(this.pricelist[i].price);
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      var myChart = echarts.init(document.getElementById("echarts_box"));
      let c_wait = this.datalist.c_wait;
      let c_in = this.datalist.c_in;
      let c_done = this.datalist.c_done;
      let c_cancel = this.datalist.c_cancel;
      var option = {
        title: {
          text: "订单入住情况",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)" // 百分比
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["待入住", "已入住", "已完成", "已取消"]
        },
        series: [
          {
            name: "总体订单",
            type: "pie",
            radius: "55%",
            roseType: "angle",
            data: [
              { name: "待入住", value: c_wait },
              { name: "已入住", value: c_in },
              { name: "已完成", value: c_done },
              { name: "已取消", value: c_cancel }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);

      // 各酒店收入记录图表
      var myChart2 = echarts.init(document.getElementById("echarts_box2"));
      // console.log(this.pricelist[0].h_name);
      let hotelname = this.names;
      let hotelprice = this.prices;
      var option = {
        color: ["#3398DB"],
        title: {
          text: "已入驻酒店收入总计",
          left: 'center',
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        axisLabel: {
          interval: 0
        },
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            show: true,
            textStyle: {
              fontSize: 10 //更改坐标轴文字大小
            },
            // rotate: 40,
            showMinLabel: true
          }, //显示最小值
          data: [
            hotelname[0],
            hotelname[1],
            hotelname[2],
            hotelname[3],
            hotelname[4],
            hotelname[5],
            hotelname[6],
            hotelname[7],
            hotelname[8],
            hotelname[9],
            hotelname[10]
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            barWidth: "60%",
            name: "收入总计￥",
            data: [
              hotelprice[0],
              hotelprice[1],
              hotelprice[2],
              hotelprice[3],
              hotelprice[4],
              hotelprice[5],
              hotelprice[6],
              hotelprice[7],
              hotelprice[8],
              hotelprice[9],
              hotelprice[10]
            ],
            type: "bar",
            label: {
              show: true,
              position: "top"
            },
          }
        ]
      };
      // var option = {
      //   title: {
      //     text: "各酒店收入比对",
      //     left: "center"
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{a} <br/>{b} : {c} ({d}%)" // 百分比
      //   },
      //   legend: {
      //     orient: "vertical",
      //     left: "left",
      //     data: hotelname
      //   },
      //   series: [
      //     {
      //       name: "总体订单",
      //       type: "pie",
      //       radius: "55%",
      //       roseType: "angle",
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: "rgba(0, 0, 0, 0.5)"
      //         }
      //       },
      //       data: [
      //         {
      //           name: hotelname[0],
      //           value: hotelprice[0],
      //         },
      //         {
      //           name: hotelname[1],
      //           value: hotelprice[1],
      //         },
      //         {
      //           name: hotelname[2],
      //           value: hotelprice[2],
      //         },
      //         {
      //           name: hotelname[3],
      //           value: hotelprice[3],
      //         },
      //         {
      //           name: hotelname[4],
      //           value: hotelprice[4],
      //         },
      //         {
      //           name: hotelname[5],
      //           value: hotelprice[5],
      //         },
      //         {
      //           name: hotelname[6],
      //           value: hotelprice[6],
      //         },
      //         {
      //           name: hotelname[7],
      //           value: hotelprice[7],
      //         },
      //         {
      //           name: hotelname[8],
      //           value: hotelprice[8],
      //         },
      //         {
      //           name: hotelname[9],
      //           value: hotelprice[9],
      //         },
      //         {
      //           name: hotelname[10],
      //           value: hotelprice[10],
      //         },
      //       ]
      //     }
      //   ]
      // };
      myChart2.setOption(option);
    }, 500);
  },
  created() {
    this._getlist();
    this._getPrice();
  }
};
</script>

<style lang="scss" scoped>
#echarts_box,
#echarts_box2 {
  display: inline-block;
  margin: 0px;
  padding: 0px;
  // background-color: blue;
}
</style>