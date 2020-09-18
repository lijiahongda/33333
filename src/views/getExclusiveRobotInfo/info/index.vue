<template>
  <div class="main">
    <el-button type="primary" @click="back()" style="margin-bottom:20px;">返回</el-button>

    <div class="Setmeal">
      <div class="title">
        <div class="name">数据概览</div>
        <div style="margin-top:5px;display:flex">
          <!-- <div
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
          >30天</div> -->
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
      </div>
      <div class="SetmealList">
        <div class="msg">
          <div class="msg_tips">订单总金额</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.orderCountMany}}</span>
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">订单总数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.orderCountNum}}</span>
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">社群总数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.groupCountNum}}</span>
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">用户总数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.userCountNum}}</span>
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">新增用户数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.newUserCountNum}}</span>
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">新增群组数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.newGroupCountNum}}</span>
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="Setmeal">
      <div class="title" style>
        <div class="name">交易统计</div>
      </div>
      <div class="SetmealList">
        <div
          id="home_DoubleLine"
          ref="home_DoubleLine"
          style="width: 80%;display:block;margin:0 auto; height: 250px;"
        ></div>
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
  </div>
</template>
<script>
import ECharts from "echarts";
import { dataStatistics, userIndex } from "@/api/robot";
import { getRobotStatistics } from "@/api/zAjax"; // 接口
export default {
  data() {
    return {
      buyStatus: "",
      dialogVisible: false,
      top: {},
      dayListIndex: -1,
      formBeginDate: "",
      formEndDate: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "昨日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
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
            text: "最近半个月",
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
      value2: ""
    };
  },
  created() {
    // this.getTopMsg()
    // this.getListMsg()
  },
  mounted() {
    this.getDayMsg(-1);
    // this.dayListClick(3);
    this.userIndex();
  },
  methods: {
    back() {
      this.$router.back();
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

      this.formBeginDate = start.getTime() / 1000;
      this.formEndDate = end.getTime() / 1000;
      this.drawMSg();
    },
    // 绘制表格
    drawMSg() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      getRobotStatistics({
        wxid: this.$route.query.wxid,
        beginTime: this.formBeginDate,
        endTime: this.formEndDate
      }).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        this.top = res.data.data;
        console.log(res);
        var dateList = [];
        var orderNum = [];
        var orderAmount = [];
        var userdata=[]
        for (let i in res.data.data.gmvInfo) {
          dateList.push(res.data.data.gmvInfo[i].times);
          orderAmount.push(res.data.data.gmvInfo[i].totalmoney);
          userdata.push(res.data.data.userdata[i].count_1);
          orderNum.push(res.data.data.msgdata[i].count_add);
        }
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.home_DoubleLine);
        // 绘制图表
        myChart.setOption({
          title: {
            text: ""
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["新增用户","消息数量", "订单金额"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: dateList
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "新增用户",
              type: "line",
              // stack: '总量',
              data: userdata
            },
            {
              name: "消息数量",
              type: "line",
              // stack: '总量',
              data: orderNum
            },
            {
              name: "订单金额",
              type: "line",
              // stack: '总量',
              data: orderAmount
            },
          ]
        });
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
    // 获取列表数据
    getListMsg() {
      getRobotStatistics({ wxid: this.$route.query.wxid }).then(res => {
        this.top = res.data.data;
        console.log(res);
      });
    },
    // 翻页
    handleCurrentChange(e) {
      console.log(e);
      this.listForm.page = e;
      this.getListMsg();
    },
    handleSizeChange() {},
    // 选择时间
    choseDate(e) {
      var st=e[0].replace(/-/g,"/")
      var ed=e[1].replace(/-/g,"/")
      var start = new Date(st);
      var end = new Date(ed);
      // this.listForm.page=1
      this.formBeginDate = start.getTime() / 1000;
      this.formEndDate = end.getTime() / 1000;
      this.drawMSg();
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
