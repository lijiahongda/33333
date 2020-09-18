<template>
  <div class="main">
    <div style="padding:20px">
      <div class="Setmeal"
           style="min-height:10px; box-sizing: border-box;padding:20px">
        <el-form ref="form"
                 label-width="120px"
                 :inline="true">
          <!-- <el-form-item>
          <el-select v-model="obj.source" clearable placeholder="请选择">
            <el-option
              label="悦淘"
              :value="1">
            </el-option>
            <el-option
              label="悦旅"
              :value="2">
            </el-option>
            <el-option
              label="大人"
              :value="3">
            </el-option>
          </el-select>
        </el-form-item> -->
          <el-form-item label="手机号查询">
            <el-input v-model="obj.phone"
                      placeholder="请输入手机号"
                      clearable
                      style="width:200px" />
          </el-form-item>
          <el-form-item label="选择管理员">
            <el-select v-model="obj.mid"
                       clearable
                       filterable
                       placeholder="请选择管理员"
                       style="margin-right:10px;width:200px">
              <el-option v-for="item in userList"
                         :key="item.mid"
                         :label="item.name"
                         :value="item.mid">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="Setmeal"
           style="height:auto; box-sizing: border-box;padding:20px">
        <el-table :data="tableData"
                  style="width: 100%"
                  @sort-change="sortChange">
          <el-table-column align="center"
                           label="序号"
                           width="80"
                           prop="id"></el-table-column>
          <el-table-column align="center"
                           label="机器人编号"
                           width="200"
                           prop="rid"></el-table-column>
          <el-table-column align="center"
                           label="管理员列"
                           width="200"
                           prop="name"></el-table-column>
          <el-table-column align="center"
                           label="群主信息"
                           width="200"
                           prop="adminName"></el-table-column>
          <el-table-column align="center"
                           label="机器人状态"
                           width="200"
                           prop="robotStatus"></el-table-column>
          <el-table-column align="center"
                           label="绑定群数量"
                           width="200"
                           prop=""
                           sortable="custom">
            <template slot-scope="scope">
              <router-link :to="'/main/dataCollect/?groupMid='+scope.row.groupMid">{{scope.row.groupCount}}</router-link>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="GMV"
                           width="200"
                           prop="orderAmount"
                           sortable="custom"></el-table-column>
          <el-table-column align="center"
                           label="订单数量"
                           width="200"
                           prop=""
                           sortable="custom">
            <template slot-scope="scope">
              <router-link :to="'/newOrder/list/?groupMid='+scope.row.groupMid">{{scope.row.orderNum}}</router-link>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="群主社群数量限制"
                           width="200"
                           prop="limitGroupCount"></el-table-column>
        </el-table>
      </div>
      <div class="pagination-container"
           style="text-align:right;">
        <el-pagination @current-change="handleCurrentChange"
                       :page-size="obj.pageSize"
                       :current-page="obj.page"
                       layout="total, prev, pager, next, jumper"
                       :total="total"></el-pagination>
      </div>
    </div>
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
import { verifyList, getUserListByName } from "@/api/zAjax"; // 接口
import {
  getCommunityInvitationGroupList,
  checkCommunityInvitationGroup,
  getCommunityInvitationGroupInfo
} from "@/api/zAjax";

import { groupAdminStatistics } from "@/api/getExclusiveRobotInfo";
export default {
  data () {
    return {
      dialogVisible: false,
      loadingStatus: true,
      tableData: [],
      total: 0, //总条数
      pageIndex: 1,
      pageSize: 10,
      userList: [],
      // 微信号列表
      wechartList: [],
      obj: {
        page: this.pageIndex == undefined ? 1 : this.pageIndex,
        pageSize: this.pageSize == undefined ? 10 : this.pageSize,
        orderBy: ''
      },
      loading: false,
    };
  },
  mounted () {
    // this.getList();
    this.userIndex();
    this.onSearch('')
    this.getUserListByName()
  },
  methods: {
    // 表格排序
    sortChange (column) {
      console.log(column)
      if (column.prop == 'groupCount') {
        if (column.order == 'ascending') {
          this.obj.orderBy = 2
        } else {
          this.obj.orderBy = 1
        }
      } else if (column.prop == 'orderAmount') {
        if (column.order == 'ascending') {
          this.obj.orderAmount = 'asc'
        } else {
          this.obj.orderAmount = 'desc'
        }
      } else if (column.prop == 'orderNum') {
        if (column.order == 'ascending') {
          this.obj.orderNum = 'asc'
        } else {
          this.obj.orderNum = 'desc'
        }
      }
      this.obj.page = 1;
      this.getList()
    },
    handleClose () {
      this.ReasonShow = false;
    },
    // 验证是否购买
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
    // 搜索
    onSearch (e) {
      console.log(e)
      this.loading = true
      this.getList()
    },
    // 获取列表
    getList () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      console.log(this.obj);
      groupAdminStatistics(this.obj).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        // this.wechartList = res.data.data.robotAlias;
        this.tableData = res.data.data.data;
        this.total = res.data.data.total;
        this.loadingStatus = false;
        // this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        return;
      });
    },

    getUserListByName () {
      getUserListByName({}).then(res => {
        this.userList = res.data.data.data
        console.log(res)
      })
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList();
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
  .Setmeal {
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
