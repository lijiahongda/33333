<template>
    <div class="app-container">
	  <el-button type="primary" @click="goToList">返回列表</el-button>
      <el-table v-loading="loading" v-if="!switchChart" :data="list" border :fit="true" style="width: 100%">
        <el-table-column prop="created_time" label="日期" width="100" align="center"></el-table-column>
        <el-table-column prop="goodsCount" label="订单数量" align="center"></el-table-column>
        <el-table-column prop="countOrig" label="订单总金额(原价)" align="center"></el-table-column>
        <el-table-column prop="totalPrice" label="订单总金额(平台)" align="center"></el-table-column>
        <el-table-column prop="reducePrice" label="平台优惠" align="center"></el-table-column>
        <el-table-column prop="actualPrice" label="订单实际支付金额" align="center"></el-table-column>
        <el-table-column prop="couponPrice" label="订单所用券金额" align="center"></el-table-column>
        <el-table-column prop="memberBuy" label="会员购买量" align="center"></el-table-column>
        <el-table-column prop="noMemberBuy" label="非会员购买量" align="center"></el-table-column>
      </el-table>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="searchCondition.page"
          :page-sizes="[10,20,30,40]"
          :page-size="searchCondition.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
        <!-- <hotelCharts v-if="switchChart"/> -->
    </div>
</template>
<script>
// import hotelCharts from './hotelCharts' // 图表
import { mallchannelInfo } from '@/api/hotelOrder' // 接口

export default {
    // components: {
    //     hotelCharts
    // },
    data() {
        return {
			loading: false,
            searchCondition: {
				page: 1,
				pageSize: 20,
            },
            total: null,
            downloadLoading: false,
            switchChart: false,
            list: []
        }
    },
    created() {
		this.searchCondition.type = this.$route.query && this.$route.query.type ? this.$route.query.type : this.$router.query && this.$router.query.type ? this.$router.query.type : ''
		if(this.searchCondition.type == '自营'){
			this.searchCondition.type = '0'
		}
		if(this.searchCondition.type){
			this.getList()
		}
    },
    methods: {
        // 列表数据
        getList() {
		  this.loading = true
          mallchannelInfo(this.searchCondition).then(res => {
            if (res.data.code === 200){
			  this.loading = false
              this.list = res.data.data.list
              this.total = res.data.data.total
            }
          })
        },
        onSubmit() {
          this.searchCondition.page = 1
          this.getList()
        },
        // 导出
        handleDownload() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
            const filterVal = [
            'id',
            'title',
            'author',
            'pageviews',
            'display_time'
            ]
            const list = this.list
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
            })
            this.downloadLoading = false
          })
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
        // 查看详情
        handleClick(orderNo) {
          // this.$router.push({ path: '/hotel-detail', query: { orderNo: orderNo }})
        },
        // 分页
        handleSizeChange(val) {
			this.searchCondition.pageSize = val
          this.getList()
		},
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
		},
		goToList(){
			this.$router.push('/mall-lists/mall-order-channel-list')
		}
    }
}
</script>
<style type="scss">
</style>
