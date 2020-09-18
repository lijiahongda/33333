<template>
    <div class="app-container">
      <el-table v-loading="loading" v-if="!switchChart" :data="list" border :fit="true" style="width: 100%">
        <el-table-column fixed prop="createTime" width="140" label="日期" align="center"></el-table-column>
        <el-table-column prop="orderTotal" label="订单量" align="center"></el-table-column>
        <el-table-column prop="payTotal" label="订单总金额(原价)" align="center"></el-table-column>
        <el-table-column prop="companyTotal" label="订单总金额(平台)" align="center"></el-table-column>
        <el-table-column prop="actualTotal" label="订单实际支付金额" align="center"></el-table-column>
        <el-table-column prop="discountTotal" label="平台优惠金额" align="center"></el-table-column>
        <el-table-column prop="couponTotal" label="订单所用券金额" align="center"></el-table-column>
        <el-table-column prop="coinTotal" label="订单所用币金额" align="center"></el-table-column>
        <el-table-column prop="memTotal" label="会员购买量" align="center"></el-table-column>
        <el-table-column prop="normalTotal" label="非会员购买量" align="center"></el-table-column>
        <el-table-column prop="customerPrice" label="客单价" align="center"></el-table-column>
        <el-table-column prop="totalIncomeFreight" label="运费(收)" align="center"></el-table-column>
        <el-table-column prop="totalPayFreight" label="运费(支)" align="center"></el-table-column>
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
import { mallList, hotelDetail } from '@/api/hotelOrder' // 接口

export default {
    // components: {
    //     hotelCharts
    // },
    data() {
        return {
			loading: false,
            searchCondition: {
				page: 1,
				pageSize: 20
            },
            total: null,
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
          mallList(this.searchCondition).then(res => {
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
        }
    }
}
</script>
<style type="scss">
</style>
