<template>
  <div class="main">
    <div style="padding:20px">
      <div class="Setmeal" style="min-height:10px; box-sizing: border-box;padding:20px">
        <el-form ref="form" label-width="120px" :inline="true">
          <el-form-item>
            <el-button type="primary" @click="handleCheck('add')">新增关键词</el-button>
          </el-form-item>
          <el-form-item label="关键词查询">
            <el-input v-model="obj.keyword" placeholder="请输入关键词" clearable style="width:200px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="Setmeal" style="height:auto; box-sizing: border-box;padding:20px">
        <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'touch_off_num'}">
          <el-table-column align="center" label="ID" width="80" prop="id"></el-table-column>
          <el-table-column align="center" label="关键词" width="300" prop="keyword"></el-table-column>
          <el-table-column align="center" label="创建时间" width="180" prop="created_at"></el-table-column>
          <el-table-column align="center" sortable label="触发次数" prop="touch_off_num"></el-table-column>
          <el-table-column align="center" prop label="操作" width="220" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                style="color:#E6A23C"
                @click="handleCheckwgo('edit',scope.row)"
              >详情</el-button>
              <el-button
                style="color:#F56C6C"
                size="small"
                type="text"
                @click="handleCheckDel(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="obj.pageSize"
          :current-page="obj.page"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      style="text-align: center"
      :before-close="handleClose"
    >
      <img
        src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-20/20/yuelvhuiFyCYadTvN21587384490.jpg"
        alt
      />
      <h1>套餐购买提醒</h1>
      <span>您还未购买套餐或购买的套餐已过期，无法使用系统功能，请前往购买。</span>
      <span slot="footer" class="dialog-footer">
        <router-link to="/buy/buy">
          <el-button type="primary">去购买</el-button>
        </router-link>
      </span>
    </el-dialog>

    <el-dialog title :visible.sync="ReasonShow" width="60%" :before-close="handleClose">
      <el-form ref="form" label-width="120px" :inline="true">
        <!-- <el-form-item label="标题">
          <el-input v-model="contentTitle" placeholder="请输入标题" clearable />
        </el-form-item>-->
        <!-- <el-form-item label="关键字">
        </el-form-item>-->
        <el-form-item label="关键字">
          <el-input
            v-model="contentDetail"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入关键字"
            clearable
          />
        </el-form-item>
      </el-form>
      <!-- <span>{{ReasonStatus==3?'请输入驳回原因':'请输入原因'}}</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="ReasonShow = false">取 消</el-button>
        <el-button type="primary" @click="checkCommunity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ECharts from "echarts";
import {
  dataStatistics,
  userIndex,
  keyWordsReplyList,
  keyWordsListk,
  addKeyWordsk,
  updateKeyWordsReply,
  deleteKeyWordsk,
} from "@/api/robot";
import { verifyList } from "@/api/zAjax"; // 接口
import {
  getCommunityInvitationGroupList,
  checkCommunityInvitationGroup,
  getCommunityInvitationGroupInfo,
} from "@/api/zAjax";
export default {
  data() {
    return {
      dialogVisible: false,
      loadingStatus: true,
      tableData: [],
      total: 0, //总条数
      pageIndex: 1,
      pageSize: 10,
      // 微信号列表
      wechartList: [],
      obj: {
        keyword: "",
        page: this.pageIndex == undefined ? 1 : this.pageIndex,
        pageSize: this.pageSize == undefined ? 10 : this.pageSize,
      },
      loading: false,
      ReasonShow: false,
      keywordId: "",
      contentDetail: "",
      contentTitle: "",
      options: [],
      contentId: "",
    };
  },
  mounted() {
    this.getList();
    // this.userIndex();
    // this.onSearch('')
  },
  methods: {
    handleClose() {
      this.ReasonShow = false;
    },
    // 验证是否购买
    userIndex() {
      userIndex().then((res) => {
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
    onSearch() {
      // console.log(e)
      // this.loading = true;
      // let params = this.obj;
      // keyWordsListk(params).then((res) => {
      //   this.loading = false;
      //   // this.wechartList = res.data.data.robotAlias;
      //   // this.options = res.data.data;
      //   this.tableData = res.data.data;
      //   this.total = res.data.total;
      //   this.loadingStatus = false;
      //   // this.$message.error(res.data.msg || "数据加载失败,请检查网络");
      // });
      this.getList();
    },
    // 删除
    handleCheckDel(e) {
      this.$confirm("此操作将永久删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          deleteKeyWordsk({ id: e.id }).then((res) => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    handleCheck(type, e) {
      this.ReasonShow = true;
      if (type == "edit") {
        this.contentId = e.id;
        this.keywordId = e.keyword_id;
        this.contentDetail = e.content;
        this.contentTitle = e.title;
      } else {
        this.contentId = "";
        this.keywordId = "";
        this.contentDetail = "";
        this.contentTitle = "";
      }
    },
    handleCheckwgo(type, e) {
      console.log(type, e);
      // this.$router
      this.$router.push({
        path: "/Reply/keywordstatisDetail",
        query: { id: e.id },
      });
    },
    // 获取列表
    getList() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(this.obj);
      keyWordsListk(this.obj).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
          this.loadingStatus = false;
        } else {
          this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        }
        return;
      });
    },
    checkCommunity(id) {
      if (this.contentId == "") {
        if (this.contentDetail == "") {
          this.$message("关键字不能为空");
          return;
        }
        addKeyWordsk({ keyword: this.contentDetail }).then((res) => {
          this.$message(res.data.msg || "数据加载失败,请检查网络");
          this.getList();
          this.ReasonShow = false;
        });
      } else {
        updateKeyWordsReply({
          id: this.contentId,
          title: this.contentTitle,
          content: this.contentDetail,
          keyword_id: this.keywordId,
        }).then((res) => {
          this.$message(res.data.msg || "数据加载失败,请检查网络");
          this.getList();
          this.ReasonShow = false;
        });
      }
    },
    handleCurrentChange(val) {
      this.obj.page = val;
      this.getList();
    },
  },
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
