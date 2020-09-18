<template>
  <div class="main">
    <div class="Setmeal">
      <div class="title">
        <div class="name">实时统计</div>
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
          <el-date-picker v-model="value2"
                          type="daterange"
                          value-format="yyyy-MM-dd HH:hh:mm"
                          align="right"
                          unlink-panels
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="choseDate"
                          :picker-options="pickerOptions"></el-date-picker>
        </div>
      </div>
      <div class="SetmealList">
        <div class="msg">
          <div class="msg_tips">用户订单总数</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.orderTotalNum>sumObj.orderTotalNum?sumObj.orderTotalNum:top.orderTotalNum}}
                <br />
                <span class="sum">总计:{{top.orderTotalNum>sumObj.orderTotalNum?top.orderTotalNum:sumObj.orderTotalNum}}</span>
              </span>
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">用户订单总金额</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.orderTotalAmount>sumObj.orderTotalAmount?sumObj.orderTotalAmount:top.orderTotalAmount}}
                <br />
                <span class="sum">总计:{{top.orderTotalAmount>sumObj.orderTotalAmount?top.orderTotalAmount:sumObj.orderTotalAmount}}</span>
              </span>
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">新增用户数</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.newIncNum>sumObj.groupMemberTotalNum?sumObj.groupMemberTotalNum:top.newIncNum}}
                <br />
                <span class="sum">总计:{{top.newIncNum>sumObj.groupMemberTotalNum?top.newIncNum:sumObj.groupMemberTotalNum}}</span>
              </span>
              <!-- <span>{{sumObj.groupMemberTotalNum}} ({{top.newIncNum}})</span> -->
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">下单总人数</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.orderMemberTotalNum>sumObj.orderMemberTotalNum?sumObj.orderMemberTotalNum:top.orderMemberTotalNum}}
                <br />
                <span class="sum">总计:{{top.orderMemberTotalNum>sumObj.orderMemberTotalNum?top.orderMemberTotalNum:sumObj.orderMemberTotalNum}}</span>
              </span>
              <!-- <span>{{sumObj.messageNum}} ({{top.messageNum}})</span> -->
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg"
             v-if="top.bindRobotNum!=undefined">
          <div class="msg_tips">绑定机器人数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.bindRobotNum}}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="SetmealList"
           style="padding-bottom:30px;">
        <!-- <div class="msg" v-if="top.robotNum!=undefined">
          <div class="msg_tips">机器人数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.robotNum}}</span>
            </div>
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">新增群数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.newGroupNum}}</span>
            </div>
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">新增总人数</div>
          <div class="msg_btn">
            <div class="text">
              <span>{{top.groupMemberTotalNum}}</span>
            </div>
          </div>
        </div> -->
        <div class="msg">
          <div class="msg_tips">新拉群</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.groupTotalNum>sumObj.groupTotalNum?sumObj.groupTotalNum:top.groupTotalNum}}
                <br />
                <span class="sum">总计:{{top.groupTotalNum>sumObj.groupTotalNum?top.groupTotalNum:sumObj.groupTotalNum}}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">新退群</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.groupRemoveTotalNum>sumObj.groupRemoveTotalNum?sumObj.groupRemoveTotalNum:top.groupRemoveTotalNum}}
                <br />
                <span class="sum">总计:{{top.groupRemoveTotalNum>sumObj.groupRemoveTotalNum?top.groupRemoveTotalNum:sumObj.groupRemoveTotalNum}}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">新增群周订单</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.orderWeekNum}}
                <!-- {{top.groupTotalNum>sumObj.groupTotalNum?sumObj.groupTotalNum:top.groupTotalNum}} -->
                <br />
                <!-- <span class="sum">总计:{{top.groupTotalNum>sumObj.groupTotalNum?top.groupTotalNum:sumObj.groupTotalNum}}</span> -->
              </span>
              <!-- <span>{{sumObj.groupTotalNum}} ({{top.groupTotalNum}})</span> -->
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg">
          <div class="msg_tips">社群通过数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.passGroupNum}}
                <br />
                <span class="sum">总计:{{sumObj.passGroupNum}}</span>
              </span>
              <!-- <span>{{sumObj.messageNum}} ({{top.messageNum}})</span> -->
            </div>
            <!-- <div class="paiBtn">购买更多</div> -->
          </div>
        </div>

        <div class="msg"
             v-if="top.groupOwnNum!=undefined">
          <div class="msg_tips">群主数量</div>
          <div class="msg_btn">
            <div class="text">
              <span>
                {{top.groupOwnNum}}
                <br />
                <span class="sum">总计:{{sumObj.groupOwnNum}}</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="Setmeal">
      <div class="title"
           style>
        <div class="name">数据概览</div>
        <div style="margin-top:5px;"></div>
      </div>
      <div class="SetmealList">
        <div id="home_DoubleLine"
             ref="home_DoubleLine"
             style="width: 80%;display:block;margin:0 auto; height: 250px;"></div>
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
import { adminIndex, adminIndexTotal, adminIndexGraph } from "@/api/zAjax"; // 接口
import { get } from "sortablejs";
export default {
  data () {
    return {
      buyStatus: "",
      dialogVisible: false,
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "昨日",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
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
            text: "最近半个月",
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
        // pageSize:'10',
        // page:1,
        beginTime: "",
        endTime: ""
      },
      formBeginDate: "",
      formEndDate: "",
      // 上面统计的字段
      top: {},
      // 时间列表点击下标
      dayListIndex: -1,
      // 总数对象
      sumObj: []
    };
  },
  created () {
    // this.adminIndexTotal();
    // this.getListMsg()
  },
  mounted () {
    this.getDayMsg(-1);
    // this.drawMSg()
    this.userIndex();
  },
  methods: {
    // 时间列表点击事件
    dayListClick (index) {
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
    getDayMsg (dayNum) {
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
      this.listForm.beginTime = start.getTime() / 1000;
      this.listForm.endTime = end.getTime() / 1000;
      this.getTopMsg();
      this.adminIndexTotal();
      this.drawMSg();
    },
    // 绘制表格
    drawMSg () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      var data = {
        mid: JSON.parse(localStorage.getItem("userInfo")).mid, //当前登录用户ID
        beginTime: this.formBeginDate, //筛选开始时间戳
        endTime: this.formEndDate //筛选结束时间戳
      };
      adminIndexGraph(data).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        console.log(res);
        var dateList = [];
        var orderNum = [];
        var orderAmount = [];
        var memberCount = []
        for (let i in res.data.data) {
          dateList.push(i);
          orderNum.push(res.data.data[i].orderNum);
          orderAmount.push(res.data.data[i].orderAmount * 1);
          memberCount.push(res.data.data[i].memberCount)
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
            data: ["用户增长度", "订单数量", "订单金额"]
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
              name: "用户增长度",
              type: "line",
              // stack: '总量',
              data: memberCount
            },
            {
              name: "订单数量",
              type: "line",
              // stack: '总量',
              data: orderNum,
              itemStyle: {
                normal: {
                  color: '#FFFF00', //改变折线点的颜色
                  lineStyle: {
                    color: '#FFFF00' //改变折线颜色
                  }
                }
              }            },
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
    // 获取头部数据
    getTopMsg () {
      adminIndex(this.listForm).then(res => {
        this.top = res.data.data;
        console.log(res);
      });
    },
    // 获取数据总数
    adminIndexTotal () {
      adminIndexTotal({
        mid: JSON.parse(localStorage.getItem("userInfo")).mid
      }).then(res => {
        this.sumObj = res.data.data;
      });
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
    // 选择时间
    choseDate (e) {
      var st = e[0].replace(/-/g, "/")
      var ed = e[1].replace(/-/g, "/")
      var start = new Date(st);
      var end = new Date(ed);
      // this.listForm.page=1
      this.formBeginDate = start.getTime() / 1000;
      this.formEndDate = end.getTime() / 1000;
      this.listForm.beginTime = start.getTime() / 1000;
      this.listForm.endTime = end.getTime() / 1000;
      this.getTopMsg();
      this.drawMSg();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
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
        text-align: center;
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
              > .sum {
                font-size: 16px;
                color: #333;
              }
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
