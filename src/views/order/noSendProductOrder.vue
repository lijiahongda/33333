<template>
  <div id="list">
      <div style="width:100%;display:flex;">

         <el-form ref="form" label-width="120px" :inline="true">

          <el-form-item>
              <el-date-picker
                  v-model="searchCondition.startTime"
                  type = "date"
                  value-format="yyyy-MM-dd"
                  placeholder = "下单日期时间"
                  style = "width: 150px;" />
              <el-date-picker
                  v-model="searchCondition.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="下单日期时间"
                  style="width: 150px;"/>
          </el-form-item>

          <el-form-item>
            <el-input
                v-model="searchCondition.keyword"
                placeholder="商品名称/订单编号/收货人" style="width: 300px;"/>
         </el-form-item>

           <el-form-item>
                <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
            </el-form-item>

            <!-- <span v-if="groupId!=0"> -->
                <!-- <el-button type="primary" size="small"  @click="handleDownload">导出</el-button>
                <router-link :to="{path:'/order/uploadOrderIsSend'}" target="_blank">
                    <el-button type="primary" size="small">导入</el-button>
                </router-link> -->
            <!-- </span> -->


            <!-- <router-link href="www.baidu.com" target="_blank"> -->
                <!-- <el-button type="primary" size="small"  @click="handleDownload">导出</el-button> -->
            <!-- </router-link> -->

             <!-- <router-link :to="{path:'/order/uploadOrderIsSend'}" target="_blank">
                <el-button type="primary" size="small">导入</el-button>
            </router-link> -->


          <!-- <el-button type="primary" slot="append" @click="searchAccount">搜索</el-button> -->

        </el-form>
      </div>

	<el-row :gutter="20" class="order_list">
          <el-col class="sku_num" >订单总数：<span v-html="total"></span></el-col>
          <!-- <el-col class="sku_num" >未发货订单数：<span v-html="noSendCount"></span>(2019-11-22之后)</el-col> -->
        </el-row>

    <el-table :data="list" :fit="true" v-loading="loading" style="width: 100%;margin-top:20px;" border>
      <el-table-column fixed prop="product" label="商品名称" width="500" align="center">
        <template slot-scope="scope">
             {{scope.row.products ? scope.row.products : '-' }}
		</template>
      </el-table-column>
      <el-table-column prop="" label="订单编号" width="200" align="center">
          <template slot-scope="scope">
              {{scope.row.orderNo ? scope.row.orderNo : '-' }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="下单时间" width="160" align="center">
          <template slot-scope="scope">
              {{scope.row.createTime ? scope.row.createTime : '-' }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="收货人" width="100" align="center">
          <template slot-scope="scope">
              {{scope.row.receiverName ? scope.row.receiverName : '-' }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="是否发货" width="100" align="center">
          <template slot-scope="scope">
              {{scope.row.isSend ? scope.row.isSend : '-' }}
          </template>
      </el-table-column>
		<el-table-column prop="" label="是否导出" width="100" align="center">
			<template slot-scope="scope">
				{{scope.row.isExport ? scope.row.isExport : '-' }}
			</template>
		</el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope" align="center">
              <router-link :to="{path:'/order/splShopMallDetail',query:{orderNo:scope.row.orderNo}}" target="_blank">
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
import { getNoSendSplOrderList} from "@/api/order";
// 支付状态
const payState = [
    { key: 0, display_name: '待支付' },
    { key: 1, display_name: '已支付' },
]

export default {
  name: "List",

  data() {
        return {
            searchCondition: {
                page: 1,
        keyword:"",
        groupId:'',
				endTime:'',
				startTime:'',
            },
            total: null,
            noSendCount:null,
            payState, // 支付状态
            downloadLoading: false,
            switchChart: false,
            list: [],
            loading: true,
            downData:[],
            splId:'',
        }
    },

  created() {
  if (this.$route.query.splId)
  {
      this.splId  =  this.$route.query.splId
  }

    this.init();
    this.groupId = JSON.parse(localStorage.getItem('userInfo')).groupId;
  },
  methods:
  {
     init: function() {
      const _this = this;
      this.searchCondition.splId=this.splId;
      getNoSendSplOrderList(_this.searchCondition).then(res => {
        if (res.data.code === 200) {
          _this.loading = false;
          _this.list = res.data.data.list;
          _this.total = res.data.data.total;
          _this.noSendCount = res.data.data.noSendCount;

        }
      });
    },

    onSubmit()
    {
      this.searchCondition.page = 1
      this.init()
    },
   goDetail(){
     this.$router.push({path:'/order/splShopMallDetail',query:{orderNo:scope.row.orderNo}})
   },

           // 导出
    handleDownload()
    {
        this.loading = true;
        downNoSendSplOrderList(this.searchCondition).then(res => {
        if (res.data.code === 200) {
            this.loading = false;
            const downData = res.data.data;
            // _this.list = res.data.data.list;
            // console.log(this.downData,'999999');

            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['日期','商品名称','规格','订单号', '收货人姓名','收货人手机号','收货人地址','购买数量', '物流公司','物流单号','物流备注','发货状态']

            const filterVal = [
                'createTime',
                'products',
                'productSpec',
                'orderNo',
                'receiverName',
                'receiverTel',
                'receiverAddress',
                'splOrderNum',
                'logisticsCompany',
                'logisticsNumber',
                '',
                'isSend'
            ];

            const data = this.formatJson(filterVal, downData)
            excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '订单数据',
            autoWidth: this.autoWidth,
            bookType: this.bookType
            })
                this.downloadLoading = false
            })

            // downData=[];

            }else{
                this.$message({message: res.data.msg,type: "error"});
                this.loading = false;
            }
        });
    },

    formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
            filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            })
        )
    },


    // 搜索
    searchAccount() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.loading = true;
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
.order_list{
  margin: 30px 0;
  font-size: 1rem;
  color: #999;
  font-size: 16px;
}
.order_list span{
  font-size: 18px;
  color: #666;
}
.sku_num{float: left;width: auto;}
// .searchValue {
//   width: 420px;
//   display: flex;
//   justify-content: space-between;
// }
</style>
