<template>
  <div class="main">
    <div class="Setmeal" style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="keyword" placeholder="请输入群名称" clearable style="width:200px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="Setmeal" style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top:10px;"
        :default-sort="{prop: 'touch_off_num'}"
      >
        <el-table-column prop="keyword" label="关键词名称"></el-table-column>
        <el-table-column prop="name" label="群名称"></el-table-column>
        <el-table-column sortable prop="touch_off_num" label="触发次数"></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
      </el-table>
    </div>

    <div class="pagination-container" style="text-align:right;">
      <el-pagination
        :current-page="pageindex"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin:20px auto;text-align:center;"
        :total="pagesum"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getProductStatistics, keyWordsDetail } from "@/api/robot"; // 接口
import { getUserListByName } from "@/api/zAjax"; // 接口
export default {
  data() {
    return {
      wwid:"",
      keyword: "",
      // 列表参数
      tableData: [],
      pageindex: 1,
      pagesum: 0,
      mobile: "",
      pageSize: 10,
      startTime: "",
      orderBy: 3,
      adminId: "",
      goods_type: "",
      endTime: new Date(),
      value2: [new Date(), new Date()],
      showButton: 0,
      adminList: []
    };
  },
  created(){
    this.wwid = this.$route.query.id;
  },
  mounted() {
    // 请求列表
    this.getservicelist()
  },
  methods: {
    handleSearch(){
      this.getservicelist()
      console.log(this.keyword)
    },
    // 请求列表方法
    getservicelist() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      keyWordsDetail({
        page: this.pageindex,
        pageSize: this.pageSize,
        id:this.wwid,
        room_name:this.keyword
      }).then((res) => {
          console.log(res)
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code === 200) {
          this.tableData = res.data.data.data;
          this.pagesum = res.data.data.total;
        }
      });
    },
    // 翻页
    handleCurrentChange(e) {
      console.log(e);
      this.pageindex = e;
      this.getservicelist();
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
