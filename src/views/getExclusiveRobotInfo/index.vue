<template>
  <div class="main">
    <div class="Setmeal"
         style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-form ref="form"
               label-width="120px"
               :inline="true">
        <el-form-item label="选择管理员">
          <el-select v-model="listForm.mid"
                     clearable
                     filterable
                     placeholder="请选择管理员"
                     style="margin-right:10px;">
            <el-option v-for="item in userList"
                       :key="item.mid"
                       :label="item.name"
                       :value="item.mid">
              {{item.name}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机器人微信号">
          <el-input v-model="listForm.wx_alias"
                    placeholder="请输入机器人微信号"
                    style="width:200px;margin-bottom:10px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="searchList">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="Setmeal"
         style="height:auto; box-sizing: border-box;padding:20px">
      <el-table :data="tableData"
                height="500"
                style="width: 100%"
                @sort-change="sortChange">
        <el-table-column prop="id"
                         label="序号"
                         width="120"
                         align="center"></el-table-column>
        <el-table-column prop="code_number"
                         label="机器人编号"
                         width="220"
                         align="center"></el-table-column>
        <el-table-column prop="wx_name"
                         label="微信昵称"
                         width="220"
                         align="center"></el-table-column>
        <el-table-column prop="wx_alias"
                         label="机器人微信号"
                         width="220"
                         align="center"></el-table-column>
        <el-table-column prop="bind_master"
                         label="绑定群主数量"
                         width="180"
                         align="center"
                         sortable="custom"></el-table-column>
        <el-table-column prop="bind_group_number"
                         label="绑定群数量"
                         width="180"
                         align="center"
                         sortable="custom"></el-table-column>
        <el-table-column prop="orderCount"
                         label="订单数量"
                         width="180"
                         align="center"
                         sortable="custom"></el-table-column>
        <el-table-column prop="orderPrice"
                         label="GMV"
                         width="180"
                         align="center"
                         sortable="custom"></el-table-column>
        <el-table-column prop="count_num"
                         label="总群数量"
                         width="180"
                         align="center"></el-table-column>
        <el-table-column prop="on_line"
                         label="登录状态"
                         width="180"
                         align="center"></el-table-column>
        <el-table-column prop="adminName"
                         label="管理员"
                         width="180"
                         align="center"></el-table-column>
        <el-table-column prop="status"
                         label="状态"
                         width="80"
                         align="center">
          <template slot-scope="scope">{{scope.row.status==0?'开启':'关闭'}}</template>
        </el-table-column>
        <el-table-column prop="last_login_time"
                         label="最后一次在线时间"
                         width="180"
                         align="center"></el-table-column>
        <el-table-column prop="status"
                         label="操作"
                         width="120"
                         align="center"
                         fixed="right">
          <template slot-scope="scope">
            <el-button size="small"
                       type="text"
                       @click="handleCheck(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="listForm.page"
                     :page-size="listForm.pageSize"
                     layout="total, prev, pager, next, jumper"
                     :total="pagesum==0?1:pagesum">
      </el-pagination>
    </div>
    <!-- <el-pagination
      :current-page="listForm.page"
      style="margin:20px auto;text-align:center;"
      :total="pagesum==0?1:pagesum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               style="text-align: center"
               :before-close="handleClose">
      <img src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-20/20/yuelvhuiFyCYadTvN21587384490.jpg"
           alt />
      <h1>套餐购买提醒</h1>
      <span>您还未购买套餐或购买的套餐已过期，无法使用系统功能，请前往购买。</span>
      <span slot="footer"
            class="dialog-footer">
        <router-link to="/buy/buy">
          <el-button type="primary">去购买</el-button>
        </router-link>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ECharts from "echarts";
import { dataStatistics, userIndex } from "@/api/robot";
import {
  adminIndex,
  admindataStatistics,
  adminIndexGraph,
  getUserListByName
} from "@/api/zAjax"; // 接口

import { getRobotInfo } from "@/api/getExclusiveRobotInfo";
export default {
  data () {
    return {
      buyStatus: "",
      dialogVisible: false,
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      pagesum: "",
      listForm: {
        pageSize: 10,
        page: 1,
        wx_alias: "",
        mid: '',
        bind_master: '',
        bind_group_number: ''
      },
      formBeginDate: "",
      formEndDate: "",
      top: {},
      userList: ''
    };
  },
  created () {
    this.getRobotInfo();
  },
  mounted () {
    this.getUserListByName()
    this.userIndex();
  },
  methods: {
    // 表格排序
    sortChange (column) {
      console.log(column)
      if (column.prop == 'bind_master') {
        if (column.order == 'ascending') {
          this.listForm.bind_master = 1
          this.listForm.bind_group_number = ''
          this.listForm.orderPrice = ''
          this.listForm.orderCount = ''
        } else {
          this.listForm.bind_master = 2
          this.listForm.bind_group_number = ''
          this.listForm.orderPrice = ''
          this.listForm.orderCount = ''
        }
      } else if (column.prop == "bind_group_number") {
        if (column.order == 'ascending') {
          this.listForm.bind_group_number = 1
          this.listForm.bind_master = ''
          this.listForm.orderPrice = ''
          this.listForm.orderCount = ''
        } else {
          this.listForm.bind_group_number = 2
          this.listForm.bind_master = ''
          this.listForm.orderPrice = ''
          this.listForm.orderCount = ''
        }
      } else if (column.prop == "orderCount") {
        if (column.order == 'ascending') {
          this.listForm.orderCount = 1
          this.listForm.bind_master = ''
          this.listForm.bind_group_number = ''
          this.listForm.orderPrice = ''
        } else {
          this.listForm.orderCount = 2
          this.listForm.bind_master = ''
          this.listForm.bind_group_number = ''
          this.listForm.orderPrice = ''
        }
      } else if (column.prop == "orderPrice") {
        if (column.order == 'ascending') {
          this.listForm.orderPrice = 1
          this.listForm.bind_master = ''
          this.listForm.bind_group_number = ''
          this.listForm.orderCount = ''
        } else {
          this.listForm.orderPrice = 2
          this.listForm.bind_master = ''
          this.listForm.bind_group_number = ''
          this.listForm.orderCount = ''
        }
      }
      this.listForm.page = 1
      this.getRobotInfo();
    },
    // 获取用户列表
    getUserListByName () {
      getUserListByName({}).then(res => {
        this.userList = res.data.data.data
        console.log(res)
      })
    },
    // 绘制表格
    searchList (e) {
      this.listForm.page = 1;
      this.getRobotInfo();
    },
    handleClose () {
      this.dialogVisible = false;
    },
    userIndex () {
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
    // 获取列表数据
    getRobotInfo () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      getRobotInfo(this.listForm).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        console.log(res.data.data);
        this.tableData = res.data.data.list;
        this.pagesum = res.data.data.total;
      });
    },
    // 翻页
    handleSizeChange (e) {
      console.log(e);
      this.listForm.page = e;
      this.getRobotInfo();
    },
    handleCurrentChange (e) {
      console.log(e);
      this.listForm.page = e;
      this.getRobotInfo();
    },
    handleCheck (e) {
      this.$router.push({
        name: "我的机器人详情",
        query: {
          wxid: e.wxid
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f8f8f8;
  > .Setmeal {
    width: 100%;
    min-height: 220px;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    > .title {
      width: 95%;
      height: 50px;
      border-bottom: 1px solid #f4f4f4;
      margin: 0 auto;
      line-height: 50rpx;
      display: flex;
      justify-content: space-between;
      > .name {
        width: 90px;
        height: 100%;
        border-bottom: 1px solid #30333b;
        font-size: 14px;
        font-weight: 800;
        line-height: 50px;
      }
    }
    > .SetmealList {
      width: 100%;
      display: flex;
      justify-content: space-around;
      text-align: center;
      > .msg {
        width: 95%;
        margin: 0 auto;
        > .msg_tips {
          width: 94%;
          margin: 0 auto;
          font-size: 14px;
          color: #888999;
          font-weight: 400;
          margin-top: 40px;
        }
        > .msg_btn {
          width: 94%;
          margin: 0 auto;
          margin-top: 20px;
          display: flex;
          > .text {
            font-size: 14px;
            color: #888999;
            font-weight: 400;
            margin: 0 auto;
            > span {
              color: rgb(56, 118, 232);
              font-size: 25px;
              // margin-right: 10px;
            }
          }
          .paiBtn {
            width: 100px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
            background-color: #3876e8;
            font-weight: 800;
            text-align: center;
            margin-left: 30px;
          }
        }
      }
    }
    > .msg_table {
      width: 95%;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
}
</style>
