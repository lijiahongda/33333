<template>
  <div class="main">
    <div class="Setmeal" style="min-height:10px; box-sizing: border-box;padding:20px">
      <div style="display:flex">
        <el-form ref="form" label-width="120px" :inline="true">
        <el-form-item label="选择管理员">
         <el-select v-model="listForm.mid" clearable filterable placeholder="请选择" style="margin-right:10px;" @change="dayListClick(dayListIndex)">
          <el-option
            v-for="item in userList"
            :key="item.mid"
            :label="item.name"
            :value="item.mid">
            {{item.name}}
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
        <div style="display:flex">
            <div
              class="dayList"
              :style="dayListIndex==0?'background:#3876e8;color:#fff;':''"
              @click="dayListClick(0)"
            >昨日</div>
            <div
              class="dayList"
              :style="dayListIndex==3?'background:#3876e8;color:#fff;':''"
              @click="dayListClick(3)"
            >7天</div>
            <div
              class="dayList"
              :style="dayListIndex==2?'background:#3876e8;color:#fff;':''"
              @click="dayListClick(2)"
            >15天</div>
            <div
              class="dayList"
              :style="dayListIndex==1?'background:#3876e8;color:#fff;':''"
              @click="dayListClick(1)"
            >30天</div>
            <el-date-picker
              v-model="value2"
              type="daterange"
              value-format="yyyy-MM-dd HH:hh:mm"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="choseDate"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
            <el-button type="primary" @click="searchMsg" style="height:35px;margin-left:10px;">搜索</el-button>
        <!-- <el-button type="primary" @click="searchList">搜索</el-button> -->
      </div>
    </div>
    <div class="Setmeal" style="height:auto; box-sizing: border-box;padding:20px">
      <el-table :data="tableData" height="500" style="width: 100%">
        <el-table-column prop="message" label="操作模块"  align="center"></el-table-column>
        <el-table-column prop="created_time" label="操作时间" align="center"></el-table-column>
        <el-table-column prop="nickname" label="操作人" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="text-align:right;">
			<el-pagination @current-change="handleCurrentChange"
						   :current-page="listForm.page" :page-size="listForm.pageSize"
						   layout="total, prev, pager, next, jumper" :total="pagesum==0?1:pagesum">
			</el-pagination>
		</div>
  </div>
</template>
<script>
import ECharts from "echarts";
import { dataStatistics, userIndex } from "@/api/robot";
import {
  userOperationList,
  getUserListByName,
} from "@/api/zAjax"; // 接口
export default {
  data() {
    return {
      buyStatus: "",
      dialogVisible: false,
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
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
        mid: JSON.parse(localStorage.getItem('userInfo')).mid ,
        beginTime:'',  //开始时间
        endTime:''   //结束时间
      },
      formBeginDate: "",
      formEndDate: "",
      top: {},
      dayListIndex:'-1',
      userList:[]
    };
  },
  created() {
    this.getRobotInfo();
  },
  mounted() {
    // this.dayListClick(3)
    this.getUserListByName()
    this.userIndex();
  },
  methods: {
    // 获取用户列表
    getUserListByName(){
      getUserListByName({}).then(res=>{
        this.userList=res.data.data.data
        console.log(res)
      })
    },
    // 时间列表点击事件
    dayListClick(index) {
      this.dayListIndex = index;
      if (index == 0) {
        this.getDayMsg(1);
      } else if (index == 1) {
        this.getDayMsg(30);
      } else if (index == 2) {
        this.getDayMsg(15);
      } else if (index == 3) {
        this.getDayMsg(7);
      }
    },
    // 点击天数请求数据
    getDayMsg(dayNum) {
      this.listForm.page = 1;
      var timestamp = new Date().getTime();
      var day = 24 * 60 * 60 * 1000;
      if (dayNum == -1) {
        var tim = new Date();
      } else {
        var tim = new Date(timestamp - day * dayNum);
      }
      var tod = new Date();
      var ymd =
        tim.getFullYear() + "/" + (tim.getMonth() + 1) + "/" + tim.getDate();
      var todymd =
        tod.getFullYear() + "/" + (tod.getMonth() + 1) + "/" + tod.getDate();

      var start = new Date(ymd);
      var end = new Date(todymd);

      this.listForm.beginTime = start.getTime() / 1000;
      this.listForm.endTime = end.getTime() / 1000;
      // this.getRobotInfo();
    },
    // 选择时间
    choseDate(e) {
      var st=e[0].replace(/-/g,"/")
      var ed=e[1].replace(/-/g,"/")
      var start = new Date(st);
      var end = new Date(ed);
      // this.listForm.page=1
      this.listForm.beginTime = start.getTime() / 1000;
      this.listForm.endTime = end.getTime() / 1000;
      // this.getRobotInfo();
    },
    searchMsg(){
      this.listForm.page = 1;
      this.getRobotInfo();
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
    // 获取列表数据
    getRobotInfo() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      userOperationList(this.listForm).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        console.log(res.data.data);
        this.tableData = res.data.data.data;
        this.pagesum = res.data.data.total;
      });
    },
    handleCurrentChange(e) {
      console.log(e);
      this.listForm.page = e;
      this.getRobotInfo();
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
    .dayList {
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #eaeaea;
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 2.5px;
      color: #333;
      border-radius: 2px;
    }
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
