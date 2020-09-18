<template>
  <div class="main">
    <div class="Setmeal"
         style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-form ref="form"
               :inline="true">
        <el-form-item label="选择管理员">
          <el-select v-model="obj.mid"
                     clearable
                     filterable
                     placeholder="请选择管理员"
                     style="margin-right:10px;">
            <el-option v-for="item in userList"
                       :key="item.mid"
                       :label="item.name"
                       :value="item.mid">{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-date-picker v-model="value2"
                          type="datetimerange"
                          format="yyyy/MM/dd HH"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          align="right"></el-date-picker>
        </el-form-item>

        <el-form-item label="商品类型">
          <el-select v-model="obj.goodType"
                     clearable
                     filterable
                     placeholder="请选择商品类型"
                     style="margin-right:10px;">
            <el-option v-for="item in goodTypeList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源">
          <el-select v-model="obj.orderFrom"
                     clearable
                     filterable
                     placeholder="请选择来源"
                     style="margin-right:10px;">
            <el-option label="社群"
                       :value="1">社群</el-option>
            <el-option label="APP "
                       :value="2">APP</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机器人列表:">
          <el-select v-model="obj.robotWx"
                     clearable
                     placeholder="请选择">
            <el-option v-for="item in frlist"
                       :key="item.value"
                       :label="item.wx_name"
                       :value="item.wxid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="群名称:">
          <el-input v-model="obj.groupName"
                    placeholder="请输入群名称"
                    clearable />
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input v-model="obj.goodsName"
                    placeholder="请输入商品名称"
                    clearable />
        </el-form-item>
        <el-form-item label="下单人手机号:">
          <el-input v-model="obj.buyerPhone"
                    placeholder="请输入下单人手机号"
                    clearable />
        </el-form-item>
        <el-form-item label="订单号:">
          <el-input v-model="obj.ordersn"
                    placeholder="请输入订单号"
                    clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="Setmeal"
         style="height:auto; box-sizing: border-box;padding:20px">
      <el-table :data="tableData.orderGoodsList"
                v-loading="loadingStatus"
                style="width: 100%">
        <el-table-column align="center"
                         label="昵称"
                         prop="buyerNickname"
                         width="200"></el-table-column>
        <el-table-column align="center"
                         label="手机号"
                         prop="buyerPhone"
                         width="100"></el-table-column>
        <el-table-column align="center"
                         label="商品名称"
                         prop="goodsName"
                         width="200"></el-table-column>
        <!-- <el-table-column align="center"
                         label="渠道"
                         prop="channelName"
        width="200"></el-table-column>-->
        <el-table-column align="center"
                         label="商品类型"
                         prop="goodTypeName"
                         width="200"></el-table-column>
        <el-table-column align="center"
                         label="实付金额"
                         prop="actualPrice"
                         width="200"></el-table-column>
        <el-table-column align="center"
                         label="下单时间"
                         prop="orderTime"
                         width="200"></el-table-column>
        <el-table-column align="center"
                         label="群名称"
                         prop="groupName"
                         width="200"></el-table-column>
        <el-table-column align="center"
                         label="来源"
                         prop="orderFrom"
                         width="200"></el-table-column>
        <el-table-column align="center"
                         label="所属机器人"
                         prop="robotName"
                         width="200"></el-table-column>
        <el-table-column align="center"
                         label="所属管理员"
                         prop="manageName"
                         width="200"></el-table-column>

        <!--<el-table-column prop="status" label="操作" fixed="right" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleSendMessage(scope.row)">发消息</el-button>
            <el-button size="small" type="text" @click="handleDeleteFriends(scope.row)">删除好友</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="obj.page"
                     :page-size="obj.pageSize"
                     layout="total, prev, pager, next, jumper"
                     :total="total"></el-pagination>
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
import { getOrderList, getSelectType } from "@/api/robot";
import { getFriendRobotList } from "@/api/friends";
import { getUserListByName } from "@/api/zAjax";
export default {
  name: "friendList",
  data () {
    return {
      sexOptions,
      loadingStatus: false,
      tableData: [],
      total: 0, //总条数
      nickname: "",
      obj: {
        pageSize: 10,
        page: 1,
        groupName: "",
        goodsName: "",
        mid: "",
        robotWx: "",
        goodType: "", //商品类型
        groupMid: "",
        orderFrom: "",
        ordersn: "", //订单号
        room_id: "",// 查看订单id
      },
      goodTypeList: [], //商品类型
      value2: "",
      userList: "",
      frlist: [],

    };
  },
  mounted () {
    // this.obj.roomId = this.$route.query.id;
    if (this.$route.query.groupMid) {
      this.obj.groupMid = this.$route.query.groupMid;
    }
    if (this.$route.query.id) {
      this.obj.room_id = this.$route.query.id
      console.log(this.obj.Vieworderid, "我是查看订单id")
    }
    this.getUserListByName();
    this.getFriendRobotList();
    this.getSelectType();
  },
  methods: {
    //商品类型
    getSelectType () {
      getSelectType().then(res => {
        this.goodTypeList = res.data.data;
      });
    },

    // 机器人列表
    getFriendRobotList () {
      getFriendRobotList({}).then(res => {
        this.frlist = res.data.data.list;
        console.log(res);
      });
    },
    // 获取用户列表
    getUserListByName () {
      getUserListByName({}).then(res => {
        this.userList = res.data.data.data;
        console.log(res.data.data.total, "total");
        if (res.data.data.total == 1) {
          console.log(res.data.data.data[0].mid, "mid");
          this.obj.mid = res.data.data.data[0].mid;
        }

        this.getList();
        console.log(res);
      });
    },
    onSearch () {
      // debugger
      console.log(this.value2);
      if (this.value2 == "" || this.value2 == null) {
        this.startTime = "";
        this.endTime = "";
      } else {
        var start = new Date(this.value2[0]);
        var end = new Date(this.value2[1]);

        // this.listForm.page=1
        var sM =
          start.getMonth() + 1 < 10
            ? "0" + (start.getMonth() + 1)
            : start.getMonth() + 1;
        var sD = start.getDate() < 10 ? "0" + start.getDate() : start.getDate();
        var sH =
          start.getHours() < 10 ? "0" + start.getHours() : start.getHours();

        var eM =
          end.getMonth() + 1 < 10
            ? "0" + (end.getMonth() + 1)
            : end.getMonth() + 1;
        var eD = end.getDate() < 10 ? "0" + end.getDate() : end.getDate();
        var eH = end.getHours() < 10 ? "0" + end.getHours() : end.getHours();
        this.goodType = this.obj.goodType;
        this.ordersn = this.obj.ordersn
        this.obj.startTime = `${start.getFullYear()}-${sM}-${sD} ${sH}:00:00`;
        this.obj.endTime = `${start.getFullYear()}-${eM}-${eD} ${eH}:00:00`;
        // console.log(this.sendStartTime)
        // this.sendEndTime = end.getTime() / 1000;
      }
      this.obj.page = 1;
      // this.getList(this.obj);
      this.loadingStatus = true;
      this.getList();
    },
    getList () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let params = this.obj;
      getOrderList(params).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          let _res = res.data.data;
          this.tableData = _res;
          this.total = _res.orderTotal;
          this.loadingStatus = false;
        } else {
          this.loadingStatus = false;

          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
      });
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList();
    },
    handleSendMessage () {
      //发消息
    },
    handleDeleteFriends () {
      //删除好友
    }
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.friend-hea {
  margin: 20px 0 20px 20px;
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
