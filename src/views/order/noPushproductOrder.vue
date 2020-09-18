<template>
  <div id="list">
      <div style="width:100%;display:flex;">

         <el-form ref="form" label-width="120px" :inline="true">

           <el-form-item>
			    <el-select v-model="searchCondition.product_channel_id" placeholder="订单渠道" clearable >
                <el-option
                v-for="item in product_channel_id"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                />
			      </el-select>
			    </el-form-item>
           <el-form-item>
			    <el-select v-model="searchCondition.account" placeholder="订单来源" clearable >
                <el-option
                v-for="item in wheredata"
                :key="item.sourceId"
                :label="item.sourceName"
                :value="item.sourceId"
                />
			      </el-select>
			    </el-form-item>

          <el-form-item>
			        <el-input
			            v-model="searchCondition.keyword"
			            placeholder="商品名称/订单编号/支付单号/收货人/会员手机号" style="width: 300px;"/>
		    	</el-form-item>

           <el-form-item>
                <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
            </el-form-item>
          <!-- <el-button type="primary" slot="append" @click="searchAccount">搜索</el-button> -->

        </el-form>


      </div>

    <el-table :data="list" :fit="true" v-loading="loading" style="width: 100%;margin-top:20px;" border>

        <el-table-column prop="" label="商品名称" width="180" align="center">
          <template slot-scope="scope">
              {{scope.row.productName ? scope.row.productName : '-' }}
          </template>
        </el-table-column>

      <el-table-column prop="" label="子订单编号" width="200" align="center">
          <template slot-scope="scope">
              {{scope.row.orderSnCode ? scope.row.orderSnCode : '-' }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="订单来源" width="140" align="center">
          <template slot-scope="scope">
              <span>{{scope.row.orderSource ? scope.row.orderSource : '-'}}</span>
          </template>
      </el-table-column>

       <el-table-column prop="" label="订单渠道" width="140" align="center">
          <template slot-scope="scope">
              <span>{{scope.row.productChannelId ? scope.row.productChannelId : '-'}}</span>
          </template>
      </el-table-column>

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

       <el-table-column prop="" label="是否处理" width="100" align="center">
          <template slot-scope="scope">
              {{scope.row.handlePushStatus==1 ? '已处理' : '未处理' }}
          </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope" align="center">

            <el-button
              size="mini"
              type="success"
              v-if="scope.row.handlePushStatus== 0"
              @click="handle(scope.row.orderProductId)"
            >处理</el-button>

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
import { getNoPushOrderList,handlePushStatus,getOrderWhere } from "@/api/order";

// 订单状态
// 支付状态
const payState = [
    { key: 0, display_name: '待支付' },
    { key: 1, display_name: '已支付' },
]

//来源
const product_channel_id = [
    { id: 0, name: '自营' },
    { id: 1, name: '寺库' },
    { id: 3, name: '京东' },
    { id: 6, name: '考拉' },
    { id: 7, name: '行云' },
    { id: 8, name: '当当' },
]

export default {
  name: "List",

  data() {
        return {
            searchCondition: {
                page: 1,
				keyword:"",
            },
            total: null,
            payState, // 支付状态
            // isMember, // 是否会员
			// hairState,//发货状态
			// orderSource,//订单来源
      product_channel_id,//订单类型
      wheredata:[],
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
     _this.gOwhere();
      getNoPushOrderList(_this.searchCondition).then(res => {
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

    handle(orderProductId){
			this.$confirm('此操作将永久处理, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				handlePushStatus({orderProductId:orderProductId}).then(res=>{
					if(res.data.code==200){
						  this.$message({
							  message:"处理成功",
							  type:"success"
						  })
						  this.init()
					}
				})
			}).catch(() => {
			  this.$message({
				type: 'info',
				message: '已取消处理'
			  });
			});

		},

    gOwhere(){
      //获取订单渠道
      let _arr = [];
      getOrderWhere().then(res=>{
        if(res.data.code == 200){
          console.log("订单渠道数据",res.data.data);
          let _arrData = res.data.data;
          this.wheredata = _arrData;
        }else{
          this.$message.error(res.data.msg);
        }
      })
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
// .searchValue {
//   width: 420px;
//   display: flex;
//   justify-content: space-between;
// }
</style>
