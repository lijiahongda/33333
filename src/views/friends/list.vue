<template>
  <div class="main">
    <div class="Setmeal" style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-form ref="form" :inline="true">
        <el-form-item label="昵称:">
          <el-input v-model="obj.nickname" placeholder="请输入微信名称" clearable />
        </el-form-item>
        <el-form-item label="性别:">
           <el-select v-model="obj.sex" clearable placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机器人列表:">
           <el-select v-model="obj.wxid" clearable placeholder="请选择">
            <el-option
              v-for="item in frlist"
              :key="item.value"
              :label="item.wx_name"
              :value="item.wxid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="共同群数量:">
          <el-input v-model="obj.groupNum" placeholder="请输入共同群数量" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="Setmeal" style="height:auto; box-sizing: border-box;padding:20px">
      <el-table :data="tableData.list" v-loading="loadingStatus" style="width: 100%">
        <el-table-column align="center" label="昵称"  prop="nickname" width="200"></el-table-column>
        <el-table-column align="center" label="头像" prop="orderNum" width="100">
         <template slot-scope="scope">
           <img :src="scope.row.head_img" style="width:100px;"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="共同群数量" prop="groupNum" width="200"></el-table-column>
        <el-table-column align="center" label="性别" prop="sex" width="200"></el-table-column>
        <el-table-column align="center" label="订单GMV" prop="orderGmv" width="200"></el-table-column>
        <el-table-column align="center" label="订单数量" prop="orderNum" width="200"></el-table-column>
        <!-- <el-table-column align="center" label="订单数量" prop="orderNum" width="200"></el-table-column> -->
        <!-- <el-table-column align="center" label="群数量" prop="groupNum" width="200"></el-table-column> -->
        <el-table-column align="center" label="所属机器人" prop="robotName" width="200"></el-table-column>

        <!--<el-table-column prop="status" label="操作" fixed="right" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleSendMessage(scope.row)">发消息</el-button>
            <el-button size="small" type="text" @click="handleDeleteFriends(scope.row)">删除好友</el-button>
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
const sexOptions = [
  {
    label: "全部",
    value: "0"
  },
  {
    label: "男",
    value: "1"
  },
  {
    label: "女",
    value: "2"
  }
];
import { ajaxFriendsList,getFriendRobotList } from "@/api/friends";
export default {
  name: "friendList",
  data() {
    return {
      sexOptions,
      loadingStatus: false,
      tableData: [],
      total: 0, //总条数
      nickname: "",
      obj: {
        pageSize: 10,
        page: 1,
        roomId: "",
        nickname: "",
        qNum: "",
        sex: "0",
        qmd: "",
        wxid:''
      },
      frlist:[]
    };
  },
  mounted() {
    // this.obj.roomId = this.$route.query.id;
    this.getList();
    this.getFriendRobotList()
  },
  methods: {
    getFriendRobotList(){
      getFriendRobotList({}).then(res=>{
        this.frlist=res.data.data.list
        console.log(res)
      })
    },
    onSearch() {
      this.obj.page = 1;
      // this.getList(this.obj);
      this.loadingStatus = true;
      this.getList();
    },
    getList() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let params = this.obj;
      ajaxFriendsList(params).then(res => {
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
    },
    handleSendMessage() {
      //发消息
    },
    handleDeleteFriends() {
      //删除好友
    }
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.friend-hea {
  margin: 20px  0 20px 20px;

}
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
