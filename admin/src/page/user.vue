<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>查看用户</el-breadcrumb-item>
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
      <el-table :data="tableData" class="tableBox" stripe style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2,5, 10]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      tableData: [
        {
          id: "",
          username: "",
          gender: "",
          phone: ""
        }
      ],
      data: [],
      limit: 5,
      total: null,
      page: 1,
      searchData: ""
    };
  },
  methods: {
    search() {},
    _getlist() {
      this.$http.get("/api/user/selectAlladmin").then(response => {
        response = response.body;
        this.tableData = response;
        this.data = this.tableData; //把获取的数据复制一份在data里
        this.showList()
      });
    },
    // 处理数据
    showList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.data.filter((item, index) =>
        item.username.includes(this.searchData)
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
  // background-color: pink;
}

</style>