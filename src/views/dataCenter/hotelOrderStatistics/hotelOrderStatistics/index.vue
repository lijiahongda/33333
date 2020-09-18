<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px" :inline="true"  v-if="!loading">
			<el-form-item>
				<el-button type="primary">{{searchCondition.name}}</el-button>
			</el-form-item>
            <el-form-item>
                <el-col>
                    <el-date-picker
                        v-model="searchCondition.startTime"
                        type = "date"
                        value-format="yyyy-MM-dd"
                        placeholder = "下单开始日期"
                        style = "width: 150px;"
                    />
                    <el-date-picker
                        v-model="searchCondition.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="下单结束日期"
                        style="width: 150px;"
                    />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
                <div class="pan-btn " v-if="false">
                    <el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
                </div>
                <!-- <div class="pan-btn yellow-btn" @click="() => { switchChart = !switchChart}">查看图表</div> -->
            </el-form-item>
        </el-form>
      <el-table v-loading="loading" v-if="!switchChart" :data="list" border :fit="true" style="width: 100%">
        <el-table-column prop="createTime" label="日期" align="center"></el-table-column>
        <el-table-column prop="orderTotal" label="订单总量" align="center"></el-table-column>
        <el-table-column prop="payTotal" label="订单总额" align="center"></el-table-column>
        <el-table-column prop="actualTotal" label="实际支付总额" align="center"></el-table-column>
        <el-table-column prop="discountTotal" label="折扣总额" align="center"></el-table-column>
        <el-table-column prop="saleTotal" label="立减总额" align="center"></el-table-column>
        <el-table-column prop="couponTotal" label="优惠券总额" align="center"></el-table-column>
        <el-table-column prop="orderRefundTotal" label="退款单量" align="center"></el-table-column>
        <el-table-column prop="refundTotal" label="退款总额" align="center"></el-table-column>
        <el-table-column prop="memTotal" label="会员预定量" align="center"></el-table-column>
        <el-table-column prop="normalTotal" label="非会员预定量" align="center"></el-table-column>
        <el-table-column prop="todayLoss" label="今日亏损" align="center">
          <template slot-scope="scope">
             {{scope.row.payTotal - scope.row.actualTotal}}
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
import { statistics } from '@/api/dataCenter' // 接口

export default {
    // components: {
    //     hotelCharts
    // },
    data() {
        return {
			titleName: '',
            searchCondition: {
				page:1,
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
		this.searchCondition = this.$route.query ? this.$route.query : this.$router.query
		this.searchCondition.name = this.searchCondition.name ? this.searchCondition.name : '酒店下单数据统计'
		this.searchCondition.page = 1
		this.searchCondition.pageSize = 20
		this.searchCondition.sourceType = this.searchCondition.sourceType == 'yl' ? 0 : this.searchCondition.sourceType
		this.getList()
    },
    methods: {
        // 列表数据
        getList() {
		  this.loading = true
          statistics(this.searchCondition).then(res => {
            if (res.data.code === 200){
              this.list = res.data.data.list
			  this.total = res.data.data.total
			  this.loading = false
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
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        },
		handleSizeChange(val) {
			this.searchCondition.pageSize = val
          this.getList()
		}
    }
}
</script>
<style type="scss">
</style>
