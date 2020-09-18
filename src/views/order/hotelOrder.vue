<template>
  <div id="list">
    <div class="searchValue">
      <div style="width:100%;display:flex;">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          style="margin: 0 20px;"
          v-model="searchForm.keyWord"
          placeholder="请输入1-15个字符"
          class="input-with-select"
          @keyup.enter.native="searchAccount"
        />
        <el-button type="primary" slot="append" @click="searchAccount">搜索</el-button>
      </div>
    </div>

    <el-table
      v-if="!switchChart"
      :data="tableData"
      border
      :fit="true"
      style="width: 100%;margin-top:20px;"
    >
      <el-table-column prop="orderNo" align="center" width="200" label="订单编号"></el-table-column>
      <el-table-column prop="orderSource" align="center" width="200" label="订单来源"></el-table-column>
      <el-table-column prop="createTime" align="center" label="下单日期" width="200"></el-table-column>
      <el-table-column prop="payFormNo" align="center" width="140" label="支付单号"></el-table-column>
      <el-table-column prop="hotelName" align="center" width="350" label="酒店名称"></el-table-column>
      <el-table-column prop="linkman" align="center" label="联系人"></el-table-column>
      <el-table-column prop="linktel" align="center" width="140" label="联系电话"></el-table-column>
      <el-table-column prop="roomNum" align="center" label="预定间夜"></el-table-column>
      <el-table-column prop="actualPay" align="center" label="支付金额"></el-table-column>
      <el-table-column prop="payStatus" align="center" label="支付状态"></el-table-column>
      <el-table-column prop="roomStatus" align="center" width="200" label="订单状态"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.orderNo)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align:center;">
      <el-pagination
        :current-page="searchCondition.page"
        :page-sizes="[20]"
        :page-size="searchCondition.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
// 订单状态
const OrderState = [
  { key: 31, display_name: "待审核" },
  { key: 33, display_name: "审核不通过" },
  { key: 35, display_name: "审核通过" },
  { key: 40, display_name: "退款中" },
  { key: 45, display_name: "已处理(但不退款)" },
  { key: 47, display_name: "退款失败" },
  { key: 50, display_name: "退款完成" },
  { key: 53, display_name: "退款完成(手工)" }
];
// 支付状态
const payState = [
  { key: 1, display_name: "待支付" },
  { key: 5, display_name: "支付成功" },
  { key: 7, display_name: "支付失败" }
];
const options = [
  { id: 0, name: "艺龙" },
  { id: 1, name: "捷旅" },
  { id: 2, name: "携程" },
  { id: 3, name: "高星特惠" }
];
// 是否会员
const isMember = [
  { key: "是", display_name: "是" },
  { key: "否", display_name: "否" }
];
export default {
  data() {
    return {
      value: "",
      searchForm: {
        page: 1,
        pageSize: 10,
        keyWord: ""
      },
      input: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      searchCondition: {
        startDate: "",
        endDate: "",
        linktel: "",
        orderNo: "",
        payStatus: "",
        payFormNo: "",
        refundStatus: "",
        page: 1
      },
      total: null,
      OrderState, // 订单状态
      payState, // 支付状态
      isMember, // 是否会员
      options, //供应商
      downloadLoading: false,
      tableData: [{ date: "2018-10-01" }],
      switchChart: false,
      list: []
    };
  },
  created() {
    // this.getList()
  },
  methods: {
    // 搜索
    searchAccount() {},
    // 列表数据
    getList() {
      let params = {
        // "startDate": this.searchCondition.startTime,
        // "endDate": this.searchCondition.endTime,
        // "linktel": this.searchCondition.tel,
        // "orderNo": this.searchCondition.orderNo16,
        // "payStatus": this.searchCondition.payState,
        // "payFormNo": this.searchCondition.orderNo8,
        // "refundStatus": this.searchCondition.OrderState,
        // "page":this.searchCondition.page,
        // "sourceType":this.searchCondition.sourceType,
        // "orderSource":this.searchCondition.orderSource,
      };
      hotelList(params).then(res => {
        // if (res.data.code === 200){
        //     this.list = res.data.data.list
        //     this.total = res.data.data.total
        // }
      });
    },
    onSubmit() {
      this.searchCondition.page = 1;
      // this.getList()
    },
    onEmpty() {
      this.searchCondition = {
        page: 1
      };
    },
    // 导出
    handleDownload() {
      // this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //     const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      //     const filterVal = [
      //     'id',
      //     'title',
      //     'author',
      //     'pageviews',
      //     'display_time'
      //     ]
      //     const list = this.list
      //     const data = this.formatJson(filterVal, list)
      //     excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: this.filename,
      //     autoWidth: this.autoWidth,
      //     bookType: this.bookType
      //     })
      //     this.downloadLoading = false
      // })
    },
    formatJson(filterVal, jsonData) {
      // return jsonData.map(v =>
      //     filterVal.map(j => {
      //         if (j === 'timestamp') {
      //             return parseTime(v[j])
      //         } else {
      //             return v[j]
      //         }
      //     })
      // )
    },
    // 查看详情
    handleClick(orderNo) {
      this.$router.push({
        path: "/order/hotelDetail",
        query: { orderNo: orderNo }
      });
    },
    // 分页
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.searchCondition.page = val;
      this.getList();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#list {
  box-sizing: border-box;
  padding: 20px;
}
.tableList {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
}
.pagination {
  margin-top: 20px;
}
.searchValue {
  width: 420px;
  display: flex;
  justify-content: space-between;
}
</style>