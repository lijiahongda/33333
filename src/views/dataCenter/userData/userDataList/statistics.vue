<!--suppress ALL -->
<template>
    <div class="app-container">
        <!-- <el-form ref="form" label-width="120px" :inline="true">
            <el-form-item label="选择日期：">
                <el-col>
                    <el-date-picker
                        v-model="searchCondition.startTime"
                        type = "date"
                        value-format="yyyy-MM-dd"
                        placeholder = "下单日期时间"
                        style = "width: 150px;"
                    />
                    <el-date-picker
                        v-model="searchCondition.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="下单日期时间"
                        style="width: 150px;"
                    />
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
                <div class="pan-btn ">
                    <el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
                </div>
            </el-form-item>
        </el-form> -->
      <el-table v-if="!switchChart" :data="list" border :fit="true" style="width: 100%" v-loading="loading">
        <el-table-column  prop="date" label="日期" align="center"></el-table-column>
        <el-table-column prop="regCount" label="注册用户" align="center"></el-table-column>
        <el-table-column prop="cardCount" label="购卡会员" align="center"></el-table-column>
        <el-table-column prop="onlineCard" label="线上开卡量" align="center"></el-table-column>
        <el-table-column prop="offlineCard" label="线下开卡量" align="center"></el-table-column>
        <el-table-column prop="hotelUseCount" label="老用户酒店券使用量" align="center"></el-table-column>
        <el-table-column prop="mallUseCount" label="老用户商城券使用量" align="center"></el-table-column>
        <el-table-column prop="vCount" label="分配注册人数" align="center"></el-table-column>
        <el-table-column prop="yCount" label="邀请注册人数" align="center"></el-table-column>
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
import { analysisList } from '@/api/dataCenter' // 接口

export default {
    components: {
        charts
    },
    data() {
        return {
            searchCondition: {
                // "startDate": '',
                // "endDate": '',
                "page":1
            },
            total: null,
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
          analysisList(this.searchCondition).then(res => {
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
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        }
    }
}
</script>
<style type="scss">
</style>
