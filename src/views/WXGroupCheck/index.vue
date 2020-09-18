<template>
	<div style="padding:20px">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="会员手机号：">
				<el-input v-model="obj.mobile" placeholder="请输入会员手机号"  clearable />
			</el-form-item>
			<el-form-item label="审核状态">
				<el-col>
					<el-select v-model="obj.examineStatus" clearable>
						<el-option label="待审核" :value="1">待审核</el-option>
						<el-option label="审核通过" :value="2">审核通过</el-option>
						<el-option label="审核不通过" :value="3">审核不通过</el-option>
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="开始时间" prop="starttime">
				<el-date-picker v-model="obj.startTime" type="date" value-format="yyyy-MM-dd" placeholder="开始时间" clearable />
			</el-form-item>
			<el-form-item label="结束时间" prop="endtime">
				<el-date-picker v-model="obj.endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束时间" clearable />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData.list" border style="width: 100%">
			<el-table-column  align="center" label="id" width="80" prop="id"></el-table-column>
			<el-table-column  align="center" label="会员手机号"  prop="mobile"></el-table-column>
			<el-table-column  align="center" label="申请人"  prop="nickname">
				<template slot-scope="scope">
					<router-link :to="{path:'/userManage/user-info',query: {id:scope.row.mid}}" target="_blank">
						<p style="color: #0a76a4">{{scope.row.nickname}}</p>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column  align="center" label="群编号"  prop="groupNumber"></el-table-column>
			<el-table-column  align="center" label="群助理微信号"  prop="assistantWx"></el-table-column>
			<el-table-column  align="center" label="导师微信号"  prop="tutorWx"></el-table-column>
			<el-table-column  align="center" label="群管理编号"  prop="roomId"></el-table-column>
			<el-table-column  align="center" label="直推数|间推数"  prop="directPushNum">
				<template slot-scope="scope">
					{{scope.row.directPushNum}}|{{scope.row.intervalPushNum}}
				</template>
			</el-table-column>
			<el-table-column  align="center" label="审核人"  prop="examineMember"></el-table-column>
			<el-table-column  align="center" label="审核时间"  prop="examineTime" width="180"></el-table-column>
			<el-table-column  align="center" label="审核状态"  prop="examineStatusName"></el-table-column>
			<el-table-column  align="center" prop="addtime" label="记录添加时间" width="180"></el-table-column>
			<el-table-column  align="center" prop="" label="操作" width="220">id
				<template slot-scope="scope">
					<el-button v-if="scope.row.examineStatus== 1" size="mini" @click="handleCheck(scope.row.id,2)">通过</el-button>
					<el-button v-if="scope.row.examineStatus==1" size="mini" @click="handleCheck(scope.row.id,3)">驳回</el-button>
					<el-button size="mini" @click="handleDetail(scope.row.id)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination  @current-change="handleCurrentChange"
							:page-size="tableData.pageSize"
							:current-page="tableData.page"
							layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<el-dialog title="详情信息" :visible.sync="dialogFormVisible">
			<el-form :model="form" :disabled="true">
				<el-form-item label="群编号" :label-width="formLabelWidth">
					<el-input v-model="form.groupNumber" type='number' autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="群管理编号" :label-width="formLabelWidth">
					<el-input v-model="form.roomId" type='number' autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="群助理微信号" :label-width="formLabelWidth">
					<el-input v-model="form.assistantWx"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="导师微信号" :label-width="formLabelWidth">
					<el-input v-model="form.tutorWx"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="审核不通过原因" :label-width="formLabelWidth">
					<el-input v-model="form.examineDesc"  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="审核的图片路径" :label-width="formLabelWidth">
					<el-image
						v-for="item in form.images.split(',')"
						:key="item"
						style="width: 100px; height: 100px"
						:src="item"
						:preview-src-list="form.images.split(',')"
						fit="contain"></el-image>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  import {
    getCommunityInvitationGroupList,
    checkCommunityInvitationGroup,
    getCommunityInvitationGroupInfo
  } from '@/api/shops'
  export default {
    data() {
      return {
        tableData: [],
        formLabelWidth: '120px',
        dialogFormVisible:false,
        fy: {
          page: 1, //当前页
          page_size: 10, //每页条数
        },
        handleStatus: '',
        form:{
          images:''
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
      addConfig(){
        this.dialogFormVisible = true;
        this.handleStatus = 1;
      },
      onSearch() {
        this.obj.page = 1;
        this.getList(this.obj)
      },
      handleCheck(id,status){
        this.$prompt('请输入原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(status == 3 && !value){
            this.$message.warning('请输入驳回原因');
            return false
          }
          checkCommunityInvitationGroup({ id: id, examineStatus: status,examineDesc: value}).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg)
              this.getList()
            } else {
              this.$message.error(res.data.msg || '数据加载失败,请检查网络')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      getList() {
        getCommunityInvitationGroupList(this.obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
            return
          }

        })
      },
      handleDetail(id) {
        getCommunityInvitationGroupInfo({id:id}).then(res=>{
          if(res.data.code == 200){
            this.form = res.data.data;
            this.dialogFormVisible = true;
          }else{
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
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
	.el-table{
		margin-top: 20px;
	}
</style>
