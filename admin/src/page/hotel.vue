<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>查看酒店</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchData" placeholder="搜索酒店名"></el-input>
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
        <el-table-column prop="id" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="酒店名称"></el-table-column>
        <el-table-column prop="city" label="所在城市"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="number" sortable label="房间号"></el-table-column>
        <el-table-column prop="oldprice" label="原价/晚"></el-table-column>
        <el-table-column prop="price" sortable label="现价/晚"></el-table-column>
        <el-table-column prop="star" sortable label="星级"></el-table-column>
        <el-table-column prop="state" sortable label="状态"></el-table-column>
        <el-table-column prop="type" sortable label="类型"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
    <router-view></router-view>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该酒店房间吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="doDel">确定</el-button>
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
      hotelDetail: {},
      tableData: [
        {
          id: "",
          name: "",
          city: "",
          address: "",
          number: "",
          oldprice: "",
          price: "",
          star: "",
          state: "",
          type: ""
        }
      ],
      data: [],
      limit: 10,
      total: null,
      page: 1,
      searchData: ""
    };
  },
  methods: {
    search() {},
    _getlist() {
      this.$http.get("/api/hotel_category/selectHotel").then(response => {
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
        item.name.includes(this.searchData)
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
    handleEdit(index, row) {
      // console.log(index);
      // console.log(row);
      this.hotelDetail = row;
      this.$router.push({
        path: "/layout/hoteledit",
        name: "hoteledit",
        params: {
          hotelEdit: this.hotelDetail
          // num: Search_form.num,
          // region: Search_form.region,
          // date1: Search_form.date1,
          // date2: Search_form.date2,
          // findstar: Search_form.findstar
        }
      });
      // console.log(index, row);
    },
    handleDelete(index, row) {
      if (row.state != "未入住") {
        this.$message.error("当前房间不是未入住状态，不能删除该房间！");
        return;
      } else {
        // console.log(row);
        this.hotelDetail = row;
        this.delDialogVisible = true;
      }
    },
    doDel() {
      this.delDialogVisible = false;
      this.loading = true;
      this.$http
        .post(
          "/api/hotel_category/deleteRoom",
          {
            r_id: this.hotelDetail.r_id,
            number: this.hotelDetail.number,
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
          // console.log(response);
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
  // background-color: pink;
}
</style>