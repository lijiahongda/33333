<!--suppress ALL -->
<template>
    <div class="app-container">
      <el-table v-loading="loading" v-if="!switchChart" :data="list" border :fit="true" style="width: 100%">
        <el-table-column prop="cityName" label="城市名称" align="center"></el-table-column>
        <el-table-column prop="orderTotal" label="订单总量" align="center"></el-table-column>
        <el-table-column prop="payTotal" label="订单总额" align="center"></el-table-column>
        <el-table-column prop="actualTotal" label="实际支付金额" align="center"></el-table-column>
        <el-table-column prop="discountTotal" label="折扣总额" align="center"></el-table-column>
        <el-table-column prop="saleTotal" label="立减总额" align="center"></el-table-column>
        <el-table-column prop="couponTotal" label="优惠券总额" align="center"></el-table-column>
        <el-table-column prop="maxPrice" label="最高订单金额" align="center"></el-table-column>
        <el-table-column prop="minPrice" label="最低订单金额" align="center"></el-table-column>
        <el-table-column prop="customerPrice" label="客单价" align="center"></el-table-column>
		<el-table-column prop="" label="操作" align="center">
			<template slot-scope="scope">
				<span style="color:blue;" @click="goToOrder(scope.row,undefined)">日维度</span>
				<span style="color:blueviolet;" @click="goToOrder(scope.row,1)">月维度</span>
			</template>
		</el-table-column>
      </el-table>
      <div v-if="!loading" class="pagination-container" style="text-align:right;">
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
import { hotelCityStatistics } from '@/api/dataCenter' // 接口

export default {
    // components: {
    //     hotelCharts
    // },
    data() {
        return {
            searchCondition: {
				page: 1,
				pageSize: 20
			},
			total: null,
			loading: false,
            downloadLoading: false,
            switchChart: false,
            list: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 列表数据
        getList() {
		  this.loading = true
          hotelCityStatistics(this.searchCondition).then(res => {
            if (res.data.code === 200){
              this.list = res.data.data.list
			  this.total = res.data.data.total
			  this.loading = false
			}
			else{
				this.$message.error(res.data.msg)
				this.loading = false
			}
          })
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
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
		},
		handleSizeChange(val) {
			this.searchCondition.pageSize = val
          this.getList()
		},
		goToOrder(row,month){
			this.$router.push({ path: '/hotel-lists/hotel-order-statistics', query: { cityId:row.cityId,name:row.cityName,month:month,title:'城市' }})
		}
    }
}
</script>
<style type="scss">
td{
	cursor: pointer;
}
</style>
