<template>
  <div id="list">
      <div style="width:100%;display:flex;">

         <el-form ref="form" label-width="120px" :inline="true">

				<el-upload class="avatar-uploader" :action="action"
					:on-success="uploadSuccessAll3"
                     v-loading="loading"
                    :before-upload="uploadBeforeOfDetail"
                      style="float:left">
					<el-button type="primary" plain>导入</el-button>
				</el-upload>
        </el-form>

      </div>
        <span v-if="listSt==1">
            <el-table :data="list" :fit="true" v-loading="loading" style="width: 100%;margin-top:20px;" border>
                <el-table-column prop="order" label="订单号"  align="center"></el-table-column>
                <el-table-column prop="status" label="导入状态"  align="center"></el-table-column>
            </el-table>
        </span>

        <h3>EXCEL表头</h3>
        <el-table :fit="true" v-loading="loading" style="width: 100%;margin-top:20px;" border>
			<el-table-column label="日期"  align="center"></el-table-column>
            <el-table-column label="商品名称"  align="center"></el-table-column>
			<el-table-column label="型号"  align="center"></el-table-column>
            <el-table-column label="订单号" align="center"></el-table-column>
            <el-table-column label="支付单号" align="center"></el-table-column>
            <el-table-column label="姓名" align="center"></el-table-column>
            <el-table-column label="电话" align="center"></el-table-column>
            <el-table-column label="地址" align="center"></el-table-column>
            <el-table-column label="数量" align="center"></el-table-column>
            <el-table-column label="快递" align="center"></el-table-column>
            <el-table-column label="单号" align="center"></el-table-column>
			<el-table-column label="物流描述" align="center"></el-table-column>
        </el-table>
  </div>
</template>
<script>
import { getSplOrderList,downSplOrderList} from "@/api/order";

export default {
  name: "List",

  data() {
        return {
            searchCondition: {
                page: 1,
				keyword:"",
				endTime:'',
				startTime:'',
            },
            total: null,
            downloadLoading: false,
            switchChart: false,
            list: [],
            listSt:0,
            loading: false,
            downData:[],
            action:'https://zt-admin-api.yuelvhui.com/admin/upExcelExpress',//http://192.168.2.118:8112/admin/getExcelInfo
		  //'https://zt.yuelvhui.com/admin/getExcelInfo
        }
    },

  created() {
    // this.init();
  },
  methods:
  {
     init: function() {
      const _this = this;
      getSplOrderList(_this.searchCondition).then(res => {
        if (res.data.code === 200) {
          _this.loading = false;
          _this.list = res.data.data.list;
          _this.total = res.data.data.total;
        }
      });
    },


    uploadSuccessAll3(res)
    {
        if(res.code==200)
        {
            this.loading = false;
            this.$message.success(res.msg ||"发货成功" )
          if(res.data.length>0)
          {
            this.listSt=1;
            this.list.length = 0;
            this.list = res.data;
          }
        }else{

              this.$message({message: res.msg,type: "error"});
              this.loading = false;
        }
    },

    uploadBeforeOfDetail()
    {
        this.loading = true;
    },

  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#list {
  box-sizing: border-box;
  padding: 20px;
}
.tableList {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
}
.pagination {
  margin-top: 20px;
}
// .searchValue {
//   width: 420px;
//   display: flex;
//   justify-content: space-between;
// }
</style>
