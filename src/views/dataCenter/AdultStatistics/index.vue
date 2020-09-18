<!--suppress ALL -->
<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px" :inline="true">
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
                <div class="pan-btn " v-if="false">
                    <el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
                </div>
                <!-- <div class="pan-btn yellow-btn" @click="() => { switchChart = !switchChart}">查看图表</div> -->
            </el-form-item>
        </el-form>

      <el-table v-if="!switchChart" :data="list" border :fit="true" style="width: 100%">
        <el-table-column fixed prop="" label="日期" align="center"></el-table-column>
        <el-table-column prop="" label="新增人数" align="center"></el-table-column>
        <el-table-column prop="" label="累计人数" align="center"></el-table-column>
        <el-table-column prop="" label="GMV" align="center"></el-table-column>
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
        <!-- <hotelCharts v-if="switchChart"/> -->
    </div>
</template>
<script>
// import hotelCharts from './hotelCharts' // 图表
import { hotelList, hotelDetail } from '@/api/hotelOrder' // 接口

export default {
    // components: {
    //     hotelCharts
    // },
    data() {
        return {
            searchCondition: {
                "startDate": '',
                "endDate": '',
                "page":1
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
          hotelList(this.searchCondition).then(res => {
            if (res.data.code === 200){
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
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        }
    }
}
</script>
<style type="scss">
</style>
