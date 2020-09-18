<template>
  <div id="list">
      <div style="width:100%;display:flex;">

         <el-form ref="form" label-width="120px" :inline="true">
			 <el-form-item label="签合同负责人">
				 <el-select v-model="searchCondition.adminId" filterable placeholder="请选择" clearable>
					 <el-option v-for="item in principalPeople" :key="item.adminId"
								:label="item.supplierPrincipalPeople" :value="item.adminId" />
				 </el-select>
			 </el-form-item>

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
                placeholder="供应商名称" style="width: 300px;"/>
         </el-form-item>

           <el-form-item>
                <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
            </el-form-item>

        </el-form>
      </div>

    <el-table :data="list" :fit="true" v-loading="loading" style="width: 100%;margin-top:20px;" border>
      <el-table-column fixed prop="product" label="供应商名称" width="500" align="center">
        <template slot-scope="scope">
             {{scope.row.supplierName ? scope.row.supplierName : '-' }}
		</template>
      </el-table-column>

      <el-table-column prop="" label="订单总数"  align="center">
          <template slot-scope="scope">
              {{scope.row.orderCount ? scope.row.orderCount : 0 }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="已发货订单数"  align="center">
          <template slot-scope="scope">
              {{scope.row.isSendCount ? scope.row.isSendCount : 0 }}
          </template>
      </el-table-column>

      <el-table-column prop="" label="未发货订单数" width="170">
          <template slot-scope="scope">
            <router-link :to="{path:'/order/noSendProductOrder?splId='+scope.row.spl_id}" target="_blank">
                <!---->
                    <span style="padding-right:30px;width:40px" >
                        {{scope.row.notSendCount ? scope.row.notSendCount : 0 }}
  <el-button type="primary" size="small"  style="float:right" > 点此查看
                </el-button>
                    </span>

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
import { getSupplierOrderCountList,getPrincipalPeople} from "@/api/order";
// 渠道
const accountList = [
    { key: 1, name: '悦淘' },
    { key: 3, name: '悦店' },
]

export default {
  name: "List",

  data() {
        return {
            searchCondition: {
                page: 1,
                keyword:"",
                endTime:'',
                startTime:'',
            },
            total: null,
            accountList, // 渠道
            downloadLoading: false,
            switchChart: false,
            list: [],
            loading: true,
            downData:[],
            sendCount:'',
            noSendCount:'',
          principalPeople: [],

        }
    },

  created() {
    this.init();
    this.getPrincipalPeople()
    this.groupId = JSON.parse(localStorage.getItem('userInfo')).groupId;
  },
  methods:
  {
     init: function() {
      const _this = this;
      getSupplierOrderCountList(_this.searchCondition).then(res => {
        if (res.data.code === 200) {
          _this.loading = false;
          _this.list = res.data.data.list;
          _this.total = res.data.data.total;
          _this.sendCount = res.data.data.sendCount;
          _this.noSendCount = res.data.data.noSendCount;
        }
      });
    },
    getPrincipalPeople(val) {
      getPrincipalPeople({
        departmentIds: val
      }).then(res => {
        if (res.data.code == 200) {
          this.principalPeople = res.data.data
        }
      })
    },
    onSubmit()
    {
      this.searchCondition.page = 1
      this.init()
    },
   goDetail(){
     this.$router.push({path:'/order/splShopMallDetail',query:{orderNo:scope.row.orderNo}})
   },


    // 搜索
    searchAccount() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.searchCondition.page = val;
      this.loading = true;
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
