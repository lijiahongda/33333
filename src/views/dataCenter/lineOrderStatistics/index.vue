<!--suppress ALL -->
<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px" :inline="true">
            <el-form-item>
                <div class="pan-btn " v-if="false">
                    <el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
                </div>
            </el-form-item>
        </el-form>

      <el-table v-if="!switchChart" :data="list" border :fit="true" style="width: 100%">
        <el-table-column prop="supplier_name" label="供应商名称" align="center"></el-table-column>
        <el-table-column prop="userNum" label="用户数量" align="center"></el-table-column>
        <el-table-column prop="orderNum" label="订单数量" align="center"></el-table-column>
        <el-table-column prop="totalPrice" label="订单总额" align="center"></el-table-column>
        <el-table-column prop="paid" label="已支付订单" align="center"></el-table-column>
        <el-table-column prop="notPaid" label="未支付订单" align="center"></el-table-column>
		<el-table-column label="操作" align="center">
			<template slot-scope="scope">
				<router-link :to="{path:'/user-center/line-supplier-info',query:{id:scope.row.supplier_id}}">
					<div style="text-align:center;">
						<span style="color:blue">查看详情</span>
					</div>
				</router-link>
			</template>
		</el-table-column>
      </el-table>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="page"
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
import { supplier } from '@/api/dataCenter' // 接口

export default {
    // components: {
    //     hotelCharts
    // },
    data() {
        return {
            page:1,
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
          supplier().then(res => {
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
        // 查看详情
        handleClick(orderNo) {
          // this.$router.push({ path: '/hotel-detail', query: { orderNo: orderNo }})
        },
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
          this.page = val
          this.getList()
        }
    }
}
</script>
<style type="scss">
</style>
