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
      :data="tableData"
      border
	  :fit="true"
      style="width: 100%">
      <el-table-column
	  	align="center"
        prop="createdAt"
        label="下单时间"
        width="200"/>
      <el-table-column
	  	align="center"
        prop="isMvp"
        label="是否会员"
        width="100"/>
      <el-table-column
	  	align="center"
		width="400"
        prop="proudctName"
        label="预定线路名称"/>
      <el-table-column
	  	align="center"
        prop="productCode"
        label="线路编号"
        width="100"/>
      <el-table-column
	  	align="center"
        prop="supplierName"
        label="供应商"
        width="120">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="contactsName"
        label="联系人姓名"
        width="100">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="contcatsTel"
        label="联系人电话"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="travelNum"
        label="出行人数"
        width="80">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="actualPrice"
        label="支付金额"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="departAndDest"
		width="200"
        label="出发地/目的地">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="orderSn"
        label="订单编号"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="paySn"
        label="支付单号"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="payStatus"
        label="支付状态"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        label="操作"
        width="">
        <template slot-scope="scope">
          <router-link to="/order/lineDetail">
            <router-link :to="'/order/lineDetail?id=' + scope.row.orderSn">
              <el-button type="text" size="small">查看详情</el-button>
            </router-link>
          </router-link>
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
// 支付状态
const payState = [
  { key: 0, display_name: '待支付' },
  { key: 200, display_name: '已支付' },
  { key: 500, display_name: '已取消' }
]

export default {
  data() {
    return {
        lineLists: [],//线路列表
		total: null,
		payState, // 支付状态
		Supplier:[], // 供应商
		downloadLoading: false,
        tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }],
        total: null,
      searchCondition: {
        page: 1,
        payStatus: "",
        shippingStatus: "",
        orderSource: "",
        orderType: "",
        keyword: "",
        endTime: "",
        startTime: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      searchForm: {
        page: 1,
        pageSize: 10,
        keyWord: ""
      },
      input: ""
    };
  },
  methods: {
    // 搜索
    searchAccount() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.searchCondition.page = val;
      // this.getList()
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