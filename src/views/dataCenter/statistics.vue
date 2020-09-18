<template>
    <div class="app-container">
      <el-form style="margin-bottom:20px;" :model="form" ref="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-date-picker
            v-model="timeArray"
            type="daterange"
            range-separator="-"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd hh:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
				<el-form-item>
					<el-button @click="getList" type="primary">查询</el-button>
				</el-form-item>
		  <div>
			
		  </div>
      </el-form>
        <el-table v-if="!loading" :data="list" border stripe :fit="true" style="width: 100%">
            <el-table-column prop="day" label="日期" align="center">
            </el-table-column>
            <el-table-column prop="total_open_count" label="总团" align="center"></el-table-column>
            <el-table-column width="300px" prop="total_success_count" label="成团" align="center"></el-table-column>
            <el-table-column prop="order_total" label="总订单" align="center"></el-table-column>
            <el-table-column prop="total_income" label="总收入" align="center"></el-table-column>
            <el-table-column prop="total_pay" label="总支出" align="center"></el-table-column>
            <el-table-column prop="profit_loss" label="盈亏" align="center"></el-table-column>
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
    </div>
</template>
<script>
// import hotelCharts from './hotelCharts' // 图表
import { getCombinationsCal  } from '@/api/shop' // 接口

export default {
    name: 'gropList',
    data() {
      return {
        tableData: '',
        dialogTableVisible: false,
        searchCondition: {
          page:1,
          pageSize:20,
					act_endtime:"",
					act_starttime:""
        },
        input:'',
        total : null,
        loading: false,
        list: [],
        timeArray:[],
        form:{
          act_status:'',//活动状态
          act_name:'',//活动标题
          goods_name:'',//商品名称
          act_starttime:'',//起始时间
          act_endtime:'',//结束时间
        },
        options: [{//活动状态
                value: '0',
                label: '所有活动'
              }, {
                value: '1',
                label: '未开起'
              }, {
                value: '2',
                label: '进行中'
              }, {
                value: '3',
                label: '已结束'
            }],
        value: ''
      }
    },
    created() {
		this.searchCondition.page = 1
		// this.searchCondition.pageSize = 20
		this.getList()
    },
    methods: {
        // 列表数据
        getList() {
					console.log(this.timeArray,"2323")
					let self =this;
					if(this.timeArray == null ){
						this.searchCondition.act_endtime='';
						this.searchCondition.act_starttime='';
					}else{
						this.searchCondition.act_endtime=this.timeArray[1];
						this.searchCondition.act_starttime=this.timeArray[0];
					}
					let data = this.searchCondition;
					getCombinationsCal(data).then(res => {
					  if (res.data.code === 200){
							console.log(res,"listedfdd")
					      self.loading = false;
								self.list= res.data.data.list
								self.total = res.data.data.total;
					  }
					})
					
        },
         // 修改排序
      changeorder (index,gid) {
        var self = this
        console.log({'id': gid,'sort':self.list[index].sort});
        updateCombinationSort({'id': gid,'sort':self.list[index].sort}).then((response) => {
          if (response.data.code == 200) {
            self.$message({
              message: '修改排序成功',
              type: 'success',
              duration: 5000
            })
          }
          else {
            self.$message({
              message: response.data.msg,
              type: 'warning',
              duration: 5000
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
        //分页
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        },
        handleSizeChange(val) {
          this.searchCondition.pageSize = val
              this.getList()
        },
    }
}
</script>
<style type="scss">
</style>
