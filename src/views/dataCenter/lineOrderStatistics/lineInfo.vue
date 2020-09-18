<!--suppress ALL -->
<template>
    <div class="app-container">
		<el-col>
			<div style="margin-bottom:20px;">
			<router-link :to="{path:'/user-center/line-order-statistics'}">
				<el-button type="primary">返回列表</el-button>
			</router-link>
			</div>
		</el-col>
		<div class="filter-container">
			<el-date-picker
				v-model="searchCondition.startTime"
				type="date"
				value-format="yyyy-MM-dd"
				placeholder="选择日期">
			</el-date-picker>

			<el-date-picker
				v-model="searchCondition.endTime"
				type="date"
				value-format="yyyy-MM-dd"
				placeholder="选择日期">
			</el-date-picker>

			<el-button class="" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
		</div>
        <el-form ref="form" label-width="120px" :inline="true">
            <el-form-item>
                <div class="pan-btn " v-if="false">
                    <el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
                </div>
            </el-form-item>
        </el-form>

      <el-table v-if="!switchChart" :data="list" border :fit="true" style="width: 100%">
        <el-table-column prop="date" label="下单时间" align="center"></el-table-column>
        <el-table-column prop="userNum" label="用户数量" align="center"></el-table-column>
        <el-table-column prop="orderNum" label="订单数量" align="center"></el-table-column>
        <el-table-column prop="totalPrice" label="订单总额" align="center"></el-table-column>
        <el-table-column prop="paid" label="已支付订单" align="center"></el-table-column>
        <el-table-column prop="notPaid" label="未支付订单" align="center"></el-table-column>
      </el-table>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="searchCondition.page"
          :page-sizes="[20]"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
</template>
<script>
// import hotelCharts from './hotelCharts' // 图表
import { supplierTime } from '@/api/dataCenter' // 接口

export default {
    // components: {
    //     hotelCharts
    // },
    data() {
        return {
			searchCondition:{
				startTime:null,
				endTime:null,
				page:1,
				supplierId:'',
			},
            total: null,
            downloadLoading: false,
            switchChart: false,
			list: [],
			id:'',
        }
    },
    created() {
		this.searchCondition.supplierId = this.$route.query ? this.$route.query.id : this.$router.query ? this.$router.query.id : ''
		if(this.searchCondition.supplierId){
			this.getList()
		}
    },
    methods: {
        // 列表数据
        getList(){
          	supplierTime(this.searchCondition).then(res => {
            if (res.data.code === 200){
              this.list = res.data.data.list
              this.total = res.data.data.total
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
		handleFilter() {
			this.searchCondition.page = 1
			this.getList()
		},
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
		},
    }
}
</script>
<style type="scss">
</style>
