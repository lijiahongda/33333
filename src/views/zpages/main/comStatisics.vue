<template>
  <div class="main" @click="showDownload">
    <div class="Setmeal" style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            format="yyyy/MM/dd HH"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="adminId" clearable placeholder="请选择管理员">
            <el-option
              v-for="(item,index) in adminList"
              :key="index"
              :label="item.name"
              :value="item.mid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="goods_type" clearable placeholder="请选择商品类型">
            <el-option
              v-for="item in goodTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="showButton>=5" @click="downLoadEx">下载ex</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="Setmeal" style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-table
        :data="tableData"
        border
        @sort-change="sortChange"
        style="width: 100%;margin-top:10px;"
      >
        <el-table-column prop="key" label="名次" width="80"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="300"></el-table-column>
        <el-table-column prop="goods_cover_image" label="商品图片" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.goods_cover_image" style="width:100px;" />
          </template>
        </el-table-column>
        <el-table-column prop="goodsTypeName" label="商品类型" width="200"></el-table-column>
        <el-table-column prop="goodsNumber" label="销量" width="200" sortable="custom"></el-table-column>
        <el-table-column prop="totalmoney" label="Gmv" width="200" sortable="custom"></el-table-column>
        <el-table-column prop="orderCount" label="订单数量" width="200"></el-table-column>
        <el-table-column prop="click" label="链接点击次数" width="200" sortable="custom"></el-table-column>
        <!-- 利润 -->
        <el-table-column prop="liren" label="群主预估收益" width="200" sortable="custom"></el-table-column>
        <el-table-column prop="zLiRun" label="总分佣" width="200"></el-table-column>
        <el-table-column prop="goods_price_orig" label="原价" width="200"></el-table-column>
        <el-table-column prop="goods_price_member" label="售价" width="200"></el-table-column>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getProductStatistics, getSelectType } from "@/api/robot"; // 接口
import { getUserListByName } from "@/api/zAjax"; // 接口
export default {
  data() {
    return {
      goodTypeList: [], //商品类型
      // 列表参数
      tableData: [],
      pageindex: 1,
      pagesum: 0,
      mobile: "",
      pageSize: 10,
      startTime: "",
      orderBy: 3,
      clickNum:"",
      adminId: "",
      goods_type: "",
      endTime: new Date(),
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: [new Date(), new Date()],
      showButton: 0,
      adminList: [],
      goodsList: [
        {
          name: "自营",
          value: 1,
        },
        {
          name: "京东",
          value: 2,
        },
        {
          name: "拼多多",
          value: 3,
        },
      ],
    };
  },
  mounted() {
    // Date.prototype.format = function (format) {
    //   var args = {
    //     "M+": this.getMonth() + 1,
    //     "d+": this.getDate(),
    //     // "h+": this.getHours(),
    //     // "m+": this.getMinutes(),
    //     // "s+": this.getSeconds(),
    //     "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    //     "S": this.getMilliseconds()
    //   };
    //   if (/(y+)/.test(format))
    //     format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    //   for (var i in args) {
    //     var n = args[i];
    //     if (new RegExp("(" + i + ")").test(format))
    //       format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    //   }
    //   return format;
    // };
    // this.startTime = new Date().format("yyyy-MM-dd 00:00:00")
    // this.value2 = [new Date(), new Date()]

    // 请求列表
    // this.getservicelist()
    this.handleSearch();
    this.getUserListByName();
    this.getSelectType();
  },
  methods: {
    //商品类型
    getSelectType() {
      getSelectType().then((res) => {
        this.goodTypeList = res.data.data;
        console.log(this.goodTypeList, "123123123123");
      });
    },
    // 下载ex
    downLoadEx() {
      var mainData = [];
      var mHeader = [
        "名次",
        "商品名称",
        "商品图片",
        "销量",
        "Gmv",
        "群主预估收益",
        "总分佣",
        "原价",
        "售价",
      ];
      var mData = [
        "key",
        "goods_name",
        "goods_cover_image",
        "goodsNumber",
        "totalmoney",
        "liren",
        "zLiRun",
        "goods_price_orig",
        "goods_price_member",
      ];
      var userRData = [];
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      getProductStatistics({
        page: this.pageindex,
        pageSize: 10000,
        startTime: this.startTime,
        endTime: this.endTime,
        orderBy: this.orderBy,
        adminId: this.adminId,
        goods_type: this.goods_type,
      }).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code === 200) {
          var list = res.data.data.list;
          console.log(list);
          for (let i in list) {
            var data = {
              key: list[i].key,
              goods_name: list[i].goods_name,
              goods_cover_image: list[i].goods_cover_image,
              goodsNumber: list[i].goodsNumber,
              totalmoney: list[i].totalmoney,
              liren: list[i].liren,
              zLiRun: list[i].zLiRun,
              goods_price_orig: list[i].goods_price_orig,
              goods_price_member: list[i].goods_price_member,
            };
            mainData.push(data);
          }
          this.json2excel(mainData, mHeader, mData);
        }
      });
      dataStatistics(obj).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 300);
        console.log(res.data.data);
        var list = res.data.data.data;
        console.log(list);
        for (let i in list) {
          var data = {
            num: list[i].num,
            name: list[i].name,
            tag_name: list[i].tag_name,
            wx_alias: list[i].wx_alias,
            orderNum: list[i].orderNum,
            orderAmount: list[i].orderAmount,
            groupMemberNum: list[i].groupMemberNum,
            groupCommission: list[i].groupCommission,
            groupManProportion: list[i].groupManProportion,
            groupWomenProportion: list[i].groupWomenProportion,
            adminName: list[i].adminName,
            robotStatus: list[i].robotStatus,
          };
          mainData.push(data);
        }
        this.json2excel(mainData, mHeader, mData);
      });
    },
    // tableJson 导出数据 ; filenames导出表的名字; autowidth表格宽度自动 true or false; bookTypes xlsx & csv & txt
    json2excel(tableJson, header, filter) {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel");
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = header; // 导出的excel表头名信息
        const filterVal = filter; // 导出的excel表头字段名，需要导出表格字段名
        const list = tableJson;
        const data = that.formatJson(filter, tableJson);

        export_json_to_excel(tHeader, data, "商品统计"); // 导出的表格名称，根据需要自己命名
      });
    },
    //格式转换，直接复制即可,不需要修改什么
    formatJson(filterVal, jsonData) {
      console.log(jsonData);
      console.log(filterVal);
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 显示下载按钮
    showDownload(e) {
      var pageX = e.pageX;
      var pageY = e.pageY;
      if (pageX < 100 && pageY < 100) {
        this.showButton++;
      }
    },
    // 获取管理员列表
    getUserListByName() {
      getUserListByName({}).then((res) => {
        if (res.data.code === 200) {
          this.adminList = res.data.data.data;
        }
      });
    },
    // 表格排序
    sortChange(column) {
      console.log(column);
      if (column.prop == "totalmoney") {
        if (column.order == "ascending") {
          this.orderBy = 1;
        } else {
          this.orderBy = 2;
        }
      } else if (column.prop == "goodsNumber") {
        if (column.order == "ascending") {
          this.orderBy = 4;
        } else {
          this.orderBy = 3;
        }
      } else if (column.prop == "liren") {
        if (column.order == "ascending") {
          this.orderBy = 6;
        } else {
          this.orderBy = 5;
        }
      }else if(column.prop == "click"){
        if (column.order == "ascending") {
          this.clickNum = 'desc';
        } else {
          this.clickNum = 'asc';
        }
      }
      this.pagesum = 1;
      this.getservicelist();
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleSearch() {
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

        this.startTime = `${start.getFullYear()}-${sM}-${sD} ${sH}:00:00`;
        this.endTime = `${start.getFullYear()}-${eM}-${eD} ${eH}:00:00`;

        // console.log(new Date().format("yyyy-MM-dd 00:00:00"), '-------', this.endTime)
        // this.startTime = new Date().format("yyyy-MM-dd 00:00:00")
        // console.log(this.sendStartTime)
        // this.sendEndTime = end.getTime() / 1000;
      }
      this.pageindex = 1;
      this.getservicelist();
    },

    // 请求列表方法
    getservicelist() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // this.startTime = new Date().format("yyyy-MM-dd 00:00:00")
      console.log(this.startTime, this.endTime, "endTime");
      getProductStatistics({
        page: this.pageindex,
        pageSize: this.pageSize,
        startTime: this.startTime,
        endTime: this.endTime,
        orderBy: this.orderBy,
        clickNum:this.clickNum,
        adminId: this.adminId,
        goods_type: this.goods_type,
      }).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.pagesum = res.data.data.totalCount;
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
