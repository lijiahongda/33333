<template>
	<div style="padding:20px" v-loading="loading">
		<el-button type="primary" @click="addLog">新增申请记录</el-button>
		<el-table :data="tableData.data" border style="width: 100%">
			<el-table-column  align="center" label="id" width="60" prop="id"></el-table-column>
			<el-table-column  align="center" label="用户姓名" width="80" prop="user_name"></el-table-column>
			<el-table-column  align="center" label="用户手机号" prop="phone"></el-table-column>
			<el-table-column  align="center" label="公司名称" prop="company_name"></el-table-column>
			<el-table-column  align="center" label="所属行业" width="80" prop="industry"></el-table-column>
			<el-table-column  align="center" label="拥有群数量" width="130" prop="group_num"></el-table-column>
			<el-table-column  align="center" label="创建时间" width="180" prop="created_at"></el-table-column>
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination @current-change="handleCurrentChange"
						   :current-page="tableData.page" :page-size="tableData.pageSize"
						   layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<el-dialog title="申请记录" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="用户姓名" label-width="120px">
					<el-input v-model="form.user_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户手机号" label-width="120px">
					<el-input v-model="form.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="公司名称" label-width="120px">
					<el-input v-model="form.company_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="所属行业" label-width="120px">
					<el-input v-model="form.industry" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="拥有群数量" label-width="120px">
					<el-select v-model="form.group_num" placeholder="请选择拥有群数量">
						<el-option label="1-29个" value="1"></el-option>
						<el-option label="30-49个" value="2"></el-option>
						<el-option label="50-99个" value="3"></el-option>
						<el-option label="100以上" value="4"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  import {
    applicationList,
    addApplication
  } from '@/api/robot'
  export default {
    data() {
      return {
        dialogFormVisible:false,
		form:{},
        tableData: [],
        loading: false,
        fy: {
          page: 1, //当前页
          page_size: 10, //每页条数
        },
        total: 0, //总条数
        pageIndex: 1,
        obj: {
          page: this.pageIndex,
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      onSearch() {
        this.obj.page = 1;
        this.getList()
      },
      getList() {
        this.loading = true;
        applicationList(this.obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
          }
          this.loading = false;
        })
      },
      addLog(){
        this.dialogFormVisible = true;
	  },
      confirm(){
        this.loading = true;
        addApplication(this.form).then((res) => {
          if (res.data.code == 200) {
            this.getList()
            this.dialogFormVisible = false;
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
          }
          this.loading = false;
        })

      },
      handleDel(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          deleteArticle({id:id}).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()
            } else {
              this.$message.error(res.data.message || '数据加载失败,请检查网络')
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleEdit(id) {
        this.$router.push({
          path: '/material/guides/edit',
          query: {
            id: id
          }
        })
      },
      handleCurrentChange(val) {
        this.obj.page = val;
        this.getList()
      },
    }
  }

</script>
<style scoped="scoped" lang="scss">
	img{
		width: 70px;
		height: 70px;
	}
	.el-table{
		margin-top: 10px;
	}
</style>
