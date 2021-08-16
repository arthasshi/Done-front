<template>
  <div class="home">
    <el-button @click="goBack" class="btn-return" type="text">return</el-button>
    <el-table :data="userList" style="width: 100%">
      <el-table-column
        prop="username"
        label="name"
        width="180"
      ></el-table-column>
      <el-table-column prop="phone" label="phone" width="180"></el-table-column>
      <el-table-column prop="email" label="email" width="180"></el-table-column>
      <el-table-column prop="birth" label="birth" width="180"></el-table-column>
      <el-table-column prop="address" label="address"></el-table-column>
      <el-table-column prop="photo" label="photo">
        <template slot-scope="scope">
          <img :src="'/static/uploads/id_' + scope.row.ID" alt="" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="pager" @current-change="pageChange" :total="total">
    </el-pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import { getUserList } from "@/api/user";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      userList: [],
      page: 1,
      size: 12,
      total: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      getUserList(this.page, this.size).then(res => {
        if (res.code == 200) {
          this.userList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    goBack() {
      this.$router.back(-1);
    },
    pageChange(page) {
      this.page = page;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: calc(100% - 80px);
  padding: 40px;
  position: relative;
  img {
    width: 40px;
    height: 40px;
  }
  .btn-return {
    position: absolute;
    right: 40px;
    top: 0px;
  }
}
</style>
