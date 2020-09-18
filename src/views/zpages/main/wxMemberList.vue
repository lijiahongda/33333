<template>
  <div class="dataCollect">
    <div class="Setmeal">
      <el-form ref="form" :inline="true">
        <el-form-item label="昵称:">
          <el-input v-model="obj.nickname" placeholder="请输入微信名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="Setmeal">
      <el-table :data="tableData.data" v-loading="loadingStatus" style="width: 100%">
        <el-table-column align="center" label="微信号" width="250" prop="wx_alias"></el-table-column>
        <el-table-column align="center" label="微信头像" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.head_img" style="width:100px;height:100px;" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="昵称" width="230" prop="nickname"></el-table-column>
        <el-table-column align="center" label="群昵称" width="300" prop="room_nickname"></el-table-column>
        <el-table-column align="center" label="性别" width="80" prop="sex">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">保密</span>
            <span v-if="scope.row.sex == 1">男</span>
            <span v-if="scope.row.sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户地址"  width="340" prop="address"></el-table-column>
        <el-table-column align="center" label="加群时间"  width="220" prop="created_at"></el-table-column>
        <!-- <el-table-column
        prop="status"
        label="操作"
        width="180">
        <template slot-scope="scope">
            <el-button size="mini" @click="handleCheck(scope.row)">查看详情</el-button>
            <el-button size="mini" @click="handleLookUser(scope.row)">查看群成员</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
    <div class="pagination-container" style="text-align:right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="obj.page"
        :page-size="obj.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { groupMemberList, searchGroupMember } from "@/api/robot";
export default {
  name: "wxMemberList",
  data() {
    return {
      loadingStatus: true,
      tableData: [],
      total: 0, //总条数
      nickname: "",
      obj: {
        pageSize: 10,
        page: 1,
        roomId: "",
        nickname:''
      }
    };
  },
  mounted() {
    this.obj.roomId = this.$route.query.id;
    this.getList();
  },
  methods: {
    onSearch() {
        this.obj.page = 1;
      // this.getList(this.obj);
      this.loadingStatus = true;
        this.getList();
      
    },
    getList() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = this.obj;
      groupMemberList(params).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          let _res = res.data.data;
          this.tableData = _res;
          this.total = _res.total;
          this.loadingStatus = false;
        } else {
          this.loadingStatus = false;

          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
      });
    },
    handleCurrentChange(val) {
      this.obj.page = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
.dataCollect {
  background-color: #f8f8f8;
  padding: 20px;
}
.Setmeal {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    /* min-height: 220px; */
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}
</style>
