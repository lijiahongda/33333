<template>
  <div class="main"
       @click="showDownload">
    <div style="padding:20px">
      <div class="Setmeal"
           style="min-height:10px; box-sizing: border-box;padding:20px">
        <el-form ref="form"
                 label-width="120px"
                 :inline="true">
          <el-form-item>
            <el-date-picker v-model="value2"
                            type="datetimerange"
                            format="yyyy/MM/dd HH"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="group_id"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.group_id"
                         :label="item.group_name"
                         :value="item.group_id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="手机号查询">
            <el-input v-model="obj.phone" placeholder="请输入手机号" clearable style="width:200px" />
          </el-form-item>
          <el-form-item>-->
          <el-form-item>
            <el-button type="primary"
                       @click="onSearch">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       v-if="showButton>=5"
                       @click="downLoadEx">下载ex</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="Setmeal"
           style="height:auto; box-sizing: border-box;padding:20px">
        <el-table :data="tableData"
                  border
                  @sort-change="sortChange"
                  style="width: 100%;margin-top:10px;">
          <div v-for="(item,index) of tableTitle"
               :key="index">
            <el-table-column :prop="item.filter"
                             v-if="item.title"
                             :label="item.title"
                             :width="item.title=='机器人编号'?'500':'200'"
                             :sortable="item.title=='订单量'||item.title=='GMV'||item.title=='绑定群数量'||item.title=='群用户数量'||item.title=='发送素材条数'||item.title=='发送群数'?true:false"
                             :fixed="item.title=='管理员姓名'?'left':false">
            </el-table-column>
          </div>
          <!-- <el-table-column prop="name" label="管理员姓名" width="200"></el-table-column>

          <el-table-column prop="orderCount" label="订单量" width="120" sortable="custom"></el-table-column>

          <el-table-column prop="orderAmount" label="GMV" width="120" sortable="custom"></el-table-column>

          <el-table-column prop="groupCount" label="绑定群数量" width="120" sortable="custom"></el-table-column>

          <el-table-column prop="memberCount" label="群用户数量" width="120" sortable="custom"></el-table-column>

          <el-table-column prop="relodeCount" label="发送素材条数" width="180" sortable="custom"></el-table-column>

          <el-table-column prop="sendGroupCount" label="发送群数" width="120" sortable="custom"></el-table-column>

          <el-table-column prop="robotName" label="机器人编号" width="500"></el-table-column> -->
          <!-- 
          <el-table-column v-for="(item,index) in orderListByTime" :key="index" :prop="item.orderCount" :label="item.payTime">
         
          </el-table-column> -->

          <!-- <el-table-column label="统计" prop="orderListByTime" width="100">
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <div slot="content">
                  <div style="width:1200px;height:200px;overflow-x:hidden;">
                    <div style="font-size:30px;text-align:center">{{scope.row.name}}</div>
                    <div style="display:flex;flex-wrap:wrap">
                      <div
                        v-for="(item,index) in scope.row.orderListByTime"
                        :key="index"
                        style="width:100px;height:50px;text-align:center"
                      >
                        <div>{{item.payTime}}</div>
                        <div>{{item.orderCount}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-button>查看</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
         -->
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
import { dataStatistics, userIndex, getUserAdminList } from "@/api/robot";
import { verifyList } from "@/api/zAjax"; // 接口
import {
  getCommunityInvitationGroupList,
  checkCommunityInvitationGroup,
  getCommunityInvitationGroupInfo,
  getGroupAllList
} from "@/api/zAjax";
export default {
  data () {
    return {
      dialogVisible: false,
      loadingStatus: true,
      tableData: [],
      total: 0, //总条数
      pageIndex: 1,
      pageSize: 10,
      options: [],
      // 微信号列表
      wechartList: [],
      obj: {
        page: this.pageIndex == undefined ? 1 : this.pageIndex,
        pageSize: this.pageSize == undefined ? 10 : this.pageSize,
        orderBy: "",
        startTime: "",
        endTime: ""
      },
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
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
            text: '本月',
            onClick (picker) {
              picker.$emit('pick', [new Date(), new Date()]);
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
          },
          {
            text: '最近六个月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '今年至今',
            onClick (picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      value2: "",
      group_id: '',
      showButton: 0,
      tableTitle: [],
      tableTitleList: [
        {
          title: '',
          filter: ''
        },
        {
          title: '管理员姓名',
          filter: 'name'
        },
        {
          title: '订单量',
          filter: 'orderCount'
        },
        {
          title: 'GMV',
          filter: 'orderAmount'
        },
        {
          title: '绑定群数量',
          filter: 'groupCount'
        },
        {
          title: '群用户数量',
          filter: 'memberCount'
        },
        {
          title: '发送素材条数',
          filter: 'relodeCount'
        },
        {
          title: '发送群数',
          filter: 'sendGroupCount'
        },
        {
          title: '机器人编号',
          filter: 'robotList'
        }
      ]
    };
  },
  mounted () {
    // this.getList();
    this.userIndex();
    this.onSearch("");
    this.getGroupAllList()
  },
  methods: {
    getGroupAllList () {
      getGroupAllList().then(res => {
        this.options = res.data.data
      })
    },
    // 下载ex
    downLoadEx () {
      var mainData = []
      var mHeader = ['管理员姓名', '订单量', 'GMV', '绑定群数量', '用户群数量', '发送素材条数', '发送群书', '机器人编号']
      var mData = ['name', 'orderCount', 'orderAmount', 'groupCount', 'memberCount', 'relodeCount', 'sendGroupCount', 'robotList']
      var userRData = []
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      getUserAdminList({ page: 1, pageSize: 10000, startTime: this.obj.startTime, endTime: this.obj.endTime }).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        var list = res.data.data.list
        for (let i in list) {
          var data = {
            name: list[i].name,
            orderCount: list[i].orderCount,
            orderAmount: list[i].orderAmount,
            groupCount: list[i].groupCount,
            memberCount: list[i].memberCount,
            relodeCount: list[i].relodeCount,
            sendGroupCount: list[i].sendGroupCount,
            robotList: list[i].robotList.join(','),
          }
          mainData.push(data)
        }
        this.json2excel(mainData, mHeader, mData);
      });

    },
    // tableJson 导出数据 ; filenames导出表的名字; autowidth表格宽度自动 true or false; bookTypes xlsx & csv & txt
    json2excel (tableJson, header, filter) {
      var that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("@/vendor/Export2Excel");
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = header; // 导出的excel表头名信息
        const filterVal = filter; // 导出的excel表头字段名，需要导出表格字段名
        const list = tableJson;
        const data = that.formatJson(filter, tableJson);

        export_json_to_excel(tHeader, data, "管理员统计"); // 导出的表格名称，根据需要自己命名
      });
    },
    //格式转换，直接复制即可,不需要修改什么
    formatJson (filterVal, jsonData) {
      console.log(jsonData)
      console.log(filterVal)
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 显示下载按钮
    showDownload (e) {
      console.log(e)
      var pageX = e.pageX;
      var pageY = e.pageY;
      if (pageX < 100 && pageY < 100) {
        this.showButton++;
        console.log(this.showButton)
      }
    },
    // 表格排序
    sortChange (column) {
      console.log(column);
      if (column.prop == "orderAmount") {
        if (column.order == "ascending") {
          this.obj.orderBy = 2;
        } else {
          this.obj.orderBy = 1;
        }
      } else if (column.prop == "orderCount") {
        if (column.order == "ascending") {
          this.obj.orderBy = 4;
        } else {
          this.obj.orderBy = 3;
        }
      } else if (column.prop == "groupCount") {
        if (column.order == "ascending") {
          this.obj.orderBy = 6;
        } else {
          this.obj.orderBy = 5;
        }
      } else if (column.prop == "memberCount") {
        if (column.order == "ascending") {
          this.obj.orderBy = 8;
        } else {
          this.obj.orderBy = 7;
        }
      } else if (column.prop == "relodeCount") {
        if (column.order == "ascending") {
          this.obj.orderBy = 10;
        } else {
          this.obj.orderBy = 9;
        }
      } else if (column.prop == "sendGroupCount") {
        if (column.order == "ascending") {
          this.obj.orderBy = 12;
        } else {
          this.obj.orderBy = 11;
        }
      }
      this.obj.page = 1;
      this.getList();
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
      console.log(this.value2);
      if (this.value2 == "" || this.value2 == null) {
        this.obj.startTime = "";
        this.obj.endTime = "";
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

        this.obj.startTime = `${start.getFullYear()}/${sM}/${sD} ${sH}:00:00`;
        this.obj.endTime = `${start.getFullYear()}/${eM}/${eD} ${eH}:00:00`;
        this.obj.startTime = this.obj.startTime
          ? new Date(this.obj.startTime).getTime() / 1000
          : "";
        this.obj.endTime = this.obj.endTime
          ? new Date(this.obj.endTime).getTime() / 1000
          : "";
        // console.log(this.sendStartTime)
        // this.sendEndTime = end.getTime() / 1000;
      }
      this.obj.group_id = this.group_id
      this.loading = true;
      this.getList();
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
      getUserAdminList(this.obj).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        // this.wechartList = res.data.data.robotAlias;
        var list = res.data.data.list
        this.tableData = res.data.data.list;
        var orderListByTime = res.data.data.list[0].orderListByTime
        for (let i in list) {
          this.tableData[i].robotName = list[i].robotList.join(',')
          for (let j in list[i].orderListByTime) {
            this.$set(this.tableData[i], list[i].orderListByTime[j].payTime, list[i].orderListByTime[j].orderCount)
          }
        }

        this.tableTitle = this.clone(this.tableTitleList)
        for (let e in orderListByTime) {
          var data = {
            title: orderListByTime[e].payTime,
            filter: orderListByTime[e].payTime,
          }
          this.tableTitle.push(data)
        }
        console.log(this.tableData)
        this.total = res.data.data.total;
        this.loadingStatus = false;
        // this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        return;
      });
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList();
    },
    // 防止变量被污染
    clone (Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = [];
        var i = Obj.length;
        while (i--) {
          buf[i] = this.clone(Obj[i]);
        }
        return buf;
      }
      else if (Obj instanceof Object) {
        buf = {};
        for (var k in Obj) {
          buf[k] = this.clone(Obj[k]);
        }
        return buf;
      } else {
        return Obj;
      }
    },
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
