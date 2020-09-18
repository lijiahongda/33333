<!--suppress ALL -->
<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px" :inline="true">
			<el-form-item>
				<el-input type="text" v-model="searchCondition.mobile" placeholder="输入手机号" style="width:300px"></el-input>
			</el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
               <!-- <div class="pan-btn ">
                    <el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
                </div> -->
            </el-form-item>
        </el-form>
      <el-table v-if="!switchChart" :data="list" border :fit="true" style="width: 100%" v-loading="loading">
        <el-table-column prop="truename" label="真实姓名" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
        <el-table-column prop="cardId" label="身份证" align="center"></el-table-column>
        <el-table-column prop="billNo" label="单号" align="center"></el-table-column>
        <el-table-column prop="isCheck" label="是否实名" align="center"></el-table-column>
        <el-table-column prop="money" label="账户总额" align="center"></el-table-column>
        <el-table-column prop="cashMount" label="本次提现金额" align="center"></el-table-column>
        <el-table-column prop="bonusMount" label="累计佣金明细" align="center"></el-table-column>
        <el-table-column  prop="createTime" label="提现申请日期" align="center"></el-table-column>
        <!-- <el-table-column fixed="right" label="操作" align="center" v-if="false">
          <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.orderNo)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination-container" v-if="!switchChart" style="text-align:right;">
        <el-pagination
          :current-page="searchCondition.page"
          :page-sizes="[50]"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        />
      </div>
        <charts v-if="switchChart"/>
    </div>
</template>
<script>
import charts from '../../commonCharts' // 图表
import { cashList } from '@/api/dataCenter' // 接口

export default {
    components: {
        charts
    },
    data() {
        return {
            searchCondition: {
                // "startDate": '',
                "mobile": '',
                "page":1
            },
            total: 0,
            downloadLoading: false,
            switchChart: false,
			list: [],
			loading: false
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 列表数据
        getList() {
			this.loading = true
          cashList(this.searchCondition).then(res => {
            if (res.data.code === 200){
			  this.loading = false
              this.list = res.data.data.list
              this.total = res.data.data.count
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
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        }
    }
}
</script>
<style type="scss">
</style>
