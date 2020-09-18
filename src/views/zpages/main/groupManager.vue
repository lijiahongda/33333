<template>
  <div class="content">
    <!-- <el-button type="primary" @click="back()" style="margin-bottom:20px;">返回</el-button> -->

    <!-- <el-select v-model="listForm.mid" filterable placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.mid"
            :label="item.mid"
            :value="item.name">
            {{item.name}}
          </el-option>
    </el-select>-->

    <el-form ref="form" label-width="120px" :inline="true">
      <el-form-item label="选择管理员">
        <el-select
          v-model="obj.mid"
          clearable
          filterable
          placeholder="请选择管理员"
          style="margin-right:10px;width:200px"
        >
          <el-option
            v-for="item in userList"
            :key="item.mid"
            :label="item.name"
            :value="item.mid"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="群数量">
        <el-select
          v-model="obj.num"
          clearable
          filterable
          placeholder="请选择管理员"
          style="margin-right:10px;width:200px"
        >
          <el-option
            v-for="item in qNumArr"
            :key="item"
            :label="item.label"
            :value="item.value"
          >{{item.label}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <div class="Setmeal">
      <el-table :data="tableData.data" style="width: 100%">
        <el-table-column align="center" label="序号" width="80" prop="id"></el-table-column>
        <el-table-column align="center" label="群主名称" width="320" prop="name"></el-table-column>
        <el-table-column align="center" label="群主手机号" width="220" prop="wx_alias"></el-table-column>
        <el-table-column align="center" label="群数量" width="80" prop="orderNum"></el-table-column>
        <el-table-column align="center" label="绑定机器人" width="180" prop="orderAmount"></el-table-column>
        <el-table-column align="center" label="管理员" width="80" prop="browseGoodsNum"></el-table-column>

        <el-table-column prop="status" label="操作" fixed="right" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleCheck(scope.row)">赠送群</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="text-align:right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="tableData.current_page"
        :page-size="tableData.per_page"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { dataStatistics, userIndex } from "@/api/robot";
import {
  adminIndex,
  admindataStatistics,
  adminIndexGraph,
  getRobotInfo,
  getUserListByName
} from "@/api/zAjax"; // 接口

const qNumArr = [
  {
    label: "0-10",
    value: 1
  },
  {
    label: "10-100",
    value: 2
  },
  {
    label: "100以上",
    value: 3
  }
];
export default {
  name: "dataCollect",
  data() {
    return {
      qNumArr,
      buyStatus: "",
      dialogVisible: false,
      tableData: [],
      fy: {
        page: 1, //当前页
        page_size: 10 //每页条数
      },
      total: 0, //总条数
      pageIndex: 1,
      obj: {
        page: this.pageIndex,
        mid: "",
        keyword: "",
        num: ""
      },
      userList: []
    };
  },
  mounted() {
    //   this.getList()
    //   this.getUserListByName()
    //   this.userIndex()
  },
  methods: {
    getUserListByName() {
      getUserListByName({}).then(res => {
        this.userList = res.data.data.data;
        console.log(res);
      });
    },
    back() {
      this.$router.back();
    },
    handleCheck(e) {
      this.$router.push({
        name: "群主统计详情",
        query: {
          roomId: e.id
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    userIndex() {
      userIndex().then(res => {
        if (res.data.code == 200) {
          this.buyStatus = res.data.data.buyStatus;
          if (!this.buyStatus) {
            this.dialogVisible = true;
          }
        } else {
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
      });
    },
    onSearch() {
      this.obj.page = 1;
      this.getList(this.obj);
    },
    getList() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let obj = {
        ...this.obj
      };
      obj.beginTime = this.obj.beginTime
        ? new Date(this.obj.beginTime).getTime() / 1000
        : "";
      obj.endTime = this.obj.endTime
        ? new Date(this.obj.endTime).getTime() / 1000
        : "";
      dataStatistics(obj).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
          return;
        }
      });
    },
    handleCurrentChange(val) {
      this.obj.page = val;
      this.getList();
    },
    handleLookUser(obj) {
      //点击查看微信群成员
      this.$router.push({ path: "/main/wxMemberList", query: { id: obj.id } });
    }
  }
};
</script>

<style scoped>
.content {
  padding: 20px;
  background-color: #f8f8f8;
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
