<template>
  <div id="list">
      <div style="width:100%;display:flex;">
         <el-form ref="form" label-width="120px" :inline="true">

           <el-form-item>
			        <el-select v-model="searchCondition.orderSource" placeholder="订单来源" clearable >
                <el-option
                v-for="item in orderSource"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                />
			      </el-select>
			    </el-form-item>
			 <el-form-item>
				 <el-select v-model="searchCondition.status" placeholder="订单状态" clearable >
					 <el-option label="全部订单" value="0" />
					 <el-option label="未付款" value="1" />
					 <el-option label="已付款" value="2" />
					 <el-option label="已出票" value="3" />
					 <el-option label="已退票" value="4" />
				 </el-select>
			 </el-form-item>

          <el-form-item>
              <el-date-picker
                  v-model="searchCondition.startTime"
                  type = "date"
                  value-format="yyyy-MM-dd"
                  placeholder = "开始日期"
                  style = "width: 150px;" />
              <el-date-picker
                  v-model="searchCondition.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="结束日期"
                  style="width: 150px;"/>
          </el-form-item>

          <el-form-item>
			        <el-input
			            v-model="searchCondition.keyword"
			            placeholder="商品名称/订单编号/支付单号/收货人/会员手机号" style="width: 340px;"/>
		    	</el-form-item>

           <el-form-item>
                <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
			   <el-button type="danger" @click="onEmpty">点我清空条件</el-button>
            </el-form-item>
          <!-- <el-button type="primary" slot="append" @click="searchAccount">搜索</el-button> -->

        </el-form>

         <!-- <el-form-item>
                  <el-select v-model="searchCondition.orderType" placeholder="订单类型" clearable >
                  <el-option
                  v-for="item in orderType"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                  />
              </el-select>
          </el-form-item>  -->

         <!-- <el-form-item>
			        <el-select v-model="searchCondition.shippingStatus" placeholder="发货状态" clearable >
                <el-option
                v-for="item in hairState"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
                />
              </el-select>
          </el-form-item> -->

        <!-- <el-input
          style="margin: 0 20px;"
          v-model="searchForm.keyWord"
          placeholder="请输入1-15个字符"
          class="input-with-select"
          @keyup.enter.native="searchAccount"
        /> -->
      </div>

    <el-table :data="list" :fit="true" v-loading="loading" style="width: 100%;margin-top:20px;" border>
      <el-table-column fixed prop="product" label="商品名称" width="180" align="center">
        <template slot-scope="scope">
					<p v-for="item in scope.row.products" v-html='item.name'></p>
				</template>
      </el-table-column>
      <el-table-column prop="" label="订单编号" width="200" align="center">
          <template slot-scope="scope">
              {{scope.row.orderNo ? scope.row.orderNo : '-' }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="订单来源" width="140" align="center">
          <template slot-scope="scope">
              <span>{{scope.row.orderSource ? scope.row.orderSource : '-'}}</span>
          </template>
      </el-table-column>

      <!-- <el-table-column prop="" label="订单类型" align="center">
          <template slot-scope="scope">
              <span>{{scope.row.orderType ? scope.row.orderType : '-'}}</span>
          </template>
      </el-table-column> -->

      <el-table-column prop="" label="下单时间" width="100" align="center">
          <template slot-scope="scope">
              {{scope.row.createTime ? scope.row.createTime : '-' }}
          </template>
      </el-table-column>

			<el-table-column prop="" label="支付单号" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payFormNo ? scope.row.payFormNo : '-' }}
			    </template>
			</el-table-column>

			<el-table-column prop="" label="支付方式" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payType ? scope.row.payType : '-' }}
			    </template>
			</el-table-column>

			<el-table-column prop="" label="实际支付金额" align="center" width="110">
			    <template slot-scope="scope">
			        {{scope.row.actualPayPrice ? scope.row.actualPayPrice : '-' }}
			    </template>
			</el-table-column>

			<el-table-column prop="" label="支付状态" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payStatus ? scope.row.payStatus : '-' }}
			    </template>
			</el-table-column>

      <el-table-column prop="" label="收货人" width="100" align="center">
          <template slot-scope="scope">
              {{scope.row.receiverName ? scope.row.receiverName : '-' }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="会员手机号" width="140" align="center">
          <template slot-scope="scope">
              {{scope.row.memberMobile ? scope.row.memberMobile : '-' }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="订单状态" align="center">
          <template slot-scope="scope">
              {{scope.row.orderStatus ? scope.row.orderStatus : '-' }}
          </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope" align="center">
              <router-link :to="{path:'/order/shopMallDetail',query:{orderNo:scope.row.orderNo}}" target="_blank">
                  <el-button type="text" size="small">查看详情</el-button>
              </router-link>
          </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align:right;">
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
import { getOrderList } from "@/api/order";
// import excel from '@/vendor/Export2Excel';
  // const tHeader=['id','Title'];
  // const data=this.list
  // excel.export_json_to_excel({
  //   header: tHeader, //表头 必填
  //   data, //具体数据 必填
  //   filename: 'excel-list', //非必填
  //   autoWidth: true, //非必填
  //   bookType: 'xlsx' //非必填
  // })


// 订单状态
// 支付状态
const payState = [
    { key: 0, display_name: '待支付' },
    { key: 1, display_name: '已支付' },
]
// 发货状态
const hairState = [
    { key: 0, display_name: '待发货' },
    { key: 1, display_name: '已发货' },
    { key: 2, display_name: '部分发货' },
]
//订单来源
const orderSource = [
    { id: 1, name: '悦旅会APP' },
    { id: 100, name: '悦店' },
    { id: 3, name: '环球悦旅APP' },
    { id: 4, name: '大人APP' },
    { id: 5, name: '大人小程序' },
    { id: 6, name: '汇店小程序' },
    { id: 7, name: '悦旅商城酒店(小程序)' },
]

// 订单类型
const orderType = [
    { key: 0, display_name: '普通' },
    { key: 1, display_name: '拼团' },
    { key: 2, display_name: '砍价' },
    { key: 3, display_name: '秒杀' },
    { key: 4, display_name: '半价' },
    { key: 5, display_name: '积分兑换' },
    { key: 6, display_name: '网红别墅' },
]
// 是否会员
const isMember = [
    { key: '是', display_name: '是' },
    { key: '否', display_name: '否' }
]

export default {
  name: "List",

  data() {
        return {
            searchCondition: {
                page: 1,
				payStatus:'',
				shippingStatus:'',
				orderSource:'',
				orderType:'',
				keyword:"",
				endTime:'',
				startTime:'',
            },
            total: null,
            payState, // 支付状态
            isMember, // 是否会员
			hairState,//发货状态
			orderSource,//订单来源
			orderType,//订单类型
            downloadLoading: false,
            tableData: [
                {date: "2018-10-01"}
            ],
            switchChart: false,
            list: [],
      orderCount:{},

      options: [
        {
          value: "1",
          label: "订单来源"
        },
        {
          value: "2",
          label: "订单类型"
        },
        {
          value: "3",
          label: "支付状态"
        },
        {
          value: "4",
          label: "下单时间"
        },
        {
          value: "5",
          label: "发货状态"
        },
        {
          value: "6",
          label: "商品名称"
        },
        {
          value: "7",
          label: "订单编号"
        },
        {
          value: "8",
          label: "支付单号"
        },
        {
          value: "9",
          label: "收货人"
        },
        {
          value: "10",
          label: "会员手机号"
        },
      ],
      value: "",
      searchType:'',
      loading: true,
        }
    },

  created() {
    this.init();
  },
  methods:
  {
     init: function() {
      const _this = this;
      getOrderList(_this.searchCondition).then(res => {
        if (res.data.code === 200) {
          _this.loading = false;
          _this.list = res.data.data.list;
          _this.total = res.data.data.total;
        }
      });
    },

    searchTypeClick(val)
    {
      this.searchType = val;
    },

    onSubmit()
    {
      this.searchCondition.page = 1
      this.init()
    },
    onEmpty() {
      this.searchCondition = {
        page: 1,
        pageSize: 15
      }
    },
   goDetail(){
     this.$router.push({path:'/order/shopMallDetail',query:{orderNo:scope.row.orderNo}})
   },


    // 搜索
    searchAccount() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.searchCondition.page = val;
      this.init()
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
.tag-list{
	margin-bottom: 20px;
}
.tag-list .el-tag{
	color: #606266;
	border-color: #ccc;
	padding: 2px 12px;
	font-size: 13px;
	line-height: 24px;
	margin: 0 30px 0 0;
}
// .searchValue {
//   width: 420px;
//   display: flex;
//   justify-content: space-between;
// }
</style>
