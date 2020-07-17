<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchData" placeholder="搜索用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="list">
      <el-table
        :data="tableData"
        :default-sort="{prop: 'price', order: 'descending'}"
        class="tableBox"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="预计到店">
                <span>{{ props.row.g_intime }}</span>
              </el-form-item>
              <el-form-item label="入住天数">
                <span>{{ props.row.g_day }}</span>
              </el-form-item>
              <el-form-item label="入住酒店">
                <span>{{ props.row.h_name }}</span>
              </el-form-item>
              <el-form-item label="入住房型">
                <span>{{ props.row.h_type }}</span>
              </el-form-item>
              <el-form-item label="入住房号">
                RM
                <span>{{ props.row.h_number }}</span>
              </el-form-item>
              <el-form-item label="消费总额">
                ￥
                <span>{{ props.row.h_price }}</span>
              </el-form-item>
              <el-form-item label="订单创建时间">
                <span>{{ props.row.d_ctime }}</span>
              </el-form-item>
              <el-form-item label="订单编号">
                <span>{{ props.row.d_number }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="userid" width="80"></el-table-column>
        <el-table-column label="入住姓名" prop="g_name" align="center"></el-table-column>
        <el-table-column label="身份证号" prop="g_idnumber" align="center" width="190"></el-table-column>
        <el-table-column label="联系电话" prop="g_phone" align="center" width="130"></el-table-column>
        <el-table-column label="入住日期" prop="g_ck_in" align="center"></el-table-column>
        <el-table-column label="离店日期" prop="g_ck_out" align="center"></el-table-column>
        <el-table-column label="入住状态" prop="g_state" align="center"></el-table-column>
        <el-table-column label="操作" width="160" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <router-view></router-view>

    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dodel">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delDialogVisible: false,
      loading: false,
      orderDetail: {},
      tableData: [{}],
      data: [],
      limit: 20,
      total: null,
      page: 1,
      searchData: ""
    };
  },
  methods: {
    _getlist() {
      this.$http.get("/api/order/getcancleList").then(response => {
        response = response.body;
        console.log(response);
        this.tableData = response;
        this.data = this.tableData; //把获取的数据复制一份在data里
        this.showList();
      });
    },
    // 处理数据
    showList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.data.filter((item, index) =>
        item.g_name.includes(this.searchData)
      );
      this.tableData = list.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      );
      this.total = list.length;
    },
    // 当每页数量改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.showList();
    },
    // 当当前页改变
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.showList();
    },
    // 搜索过滤数据
    search() {
      this.page = 1;
      this.showList();
    },
    del(index, row) {
        this.orderDetail = row;
        this.delDialogVisible = true;
    },
    dodel() {
      this.delDialogVisible = false;
      this.loading = true;
      // 将订单删除
      this.$http
        .post(
          "/api/order/delOrder",
          {
            d_number: this.orderDetail.d_number
          },
          {
            emulateJSON: true
          }
        )
        .then(response => {
          this.loading = false;
          this.$message({
            message: "删除成功！",
            type: "success",
            offset: 67,
            center: true
          });
          this._getlist();
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this._getlist();
  }
};
</script>

<style lang="scss" scoped>
.bread {
  margin: 20px 0px;
}
.search {
  text-align: left;
  height: 50px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>