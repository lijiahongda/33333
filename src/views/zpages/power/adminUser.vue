<!--suppress ALL -->
<template>
	<div class="main">
		<div class="Setmeal" style="min-height:20px; box-sizing: border-box;padding:20px">
			<el-form ref="form" label-width="120px" :inline="true">
				<el-form-item label="员工姓名">
					<el-col>
						<el-input v-model="search.keyWord" placeholder="员工姓名查询" style="width:300px;" clearable/>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleFilter">搜索</el-button>
					<el-button type="primary" @click="openBox(1)">新增员工</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--搜索部分-->
		<div class="Setmeal" style="min-height:20px; box-sizing: border-box;padding:20px">
			<div class="new_tab">
				<el-table :data="list" :fit="true" style="width: 100%;" v-loading="loading">
					<el-table-column prop="name" label="员工姓名" align="center"></el-table-column>
					<!-- <el-table-column prop="departmentName" label="所属部门" align="center"></el-table-column>
					<el-table-column prop="positionName" label="职位" align="center"></el-table-column> -->
					<!-- <el-table-column prop="adminUserName" label="登录名" align="center"></el-table-column> -->
					<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
					<el-table-column prop="role_name" label="角色" align="center"></el-table-column>
					<!-- <el-table-column prop="createdAt" label="添加/修改时间" align="center"></el-table-column> -->
					<el-table-column label="操作" align="center">
						<template slot-scope="scope" align="center">
							<el-button type="text" size="small" @click="openBox(2,scope.row.id)">编辑</el-button>
							<el-button type="text" size="small" @click="onDel(scope.row.id,list,scope.$index)" v-if="scope.row.adminUserName!='admin'">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="pageIndex"
				:page-size="pageSize"
				layout="total, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
		<!-- <div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="total" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
			 
		</div> -->
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form :model="form" :rules="rules" ref="ruleForm">
				<el-form-item label="员工姓名" :label-width="formLabelWidth" prop="staffName">
					<el-input v-model="form.staffName" autocomplete="off" placeholder="请输入员工姓名"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" :label-width="formLabelWidth"  prop="adminPassword" v-if="this.userType!=2">
					<el-input v-model="form.adminPassword" autocomplete="off" placeholder="请设置登录密码"  type="password"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" :label-width="formLabelWidth"  v-if="this.userType==2">
					<el-input v-model="form.adminPassword" autocomplete="off" placeholder="请设置登录密码"  type="password"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" :label-width="formLabelWidth"  prop="confirmPassword" v-if="this.userType!=2">
					<el-input v-model="form.confirmPassword" autocomplete="off" placeholder="请重复登录密码" type="password"></el-input>
				</el-form-item>
				<el-form-item label="重复密码" :label-width="formLabelWidth" v-if="this.userType==2">
					<el-input v-model="form.confirmPassword" autocomplete="off" placeholder="请重复登录密码" type="password"></el-input>
				</el-form-item>
				<el-form-item label="手 机 号" :label-width="formLabelWidth"  prop="mobile">
					<el-input v-model="form.mobile" autocomplete="off" placeholder="请输入手机号" maxlength="11" ></el-input>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth"  prop="userRole">
					<el-radio-group v-model="form.userRole" size="mini" >
						<el-radio v-for="item in userRolesList" :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="分组" :label-width="formLabelWidth"  prop="groupRole">
					<el-radio-group v-model="form.groupRole" size="mini" >
						<el-radio v-for="item in groupIdlist" :label="item.group_id" :key="item.group_id">{{item.group_name}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="微信号" :label-width="formLabelWidth">
					<el-checkbox-group v-model="form.wxId" size="mini" >
						<el-checkbox v-for="item in wechartIdlist" :value="item.id" :label="item.id" :key="item.id">{{item.wx_alias}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onConfirm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {robotWxAlias,getUserLists,createFrontUser,getUserRoleList,getUserInfo,upFrontUser,delFrontUser,getGroupAllList} from '@/api/zAjax'
	import _ from 'lodash'

  import md5 from 'js-md5'
export default {
    directives: {
        waves
    },
    data() {
        return {
			loading:true,
            total: null,
            list: [],
		    pageTotal:0,   //显示页数
		    pageIndex:1,
		    pageSize:10,
		    titleName:"",//弹窗title
			dialogFormVisible:false,//弹窗开关
			formLabelWidth:"15%",
			form:{
				id:'',
				staffName:"",//员工姓名
				mobile:"",//手机号
				adminPassword:"",//密码
				confirmPassword:"",//重复密码
				userRole:[],//角色
				groupRole:[],//分组
				wxId:[],
			},
			rules:{
				staffName: [
					{ required: true, message: '请输入名称', trigger: 'blur' },
				],
				mobile: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
				],
				adminPassword: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
				],
				confirmPassword: [
					{ required: true, message: '请重复密码', trigger: 'blur' },
				],
				userRole: [
					{ required: true, message: '请选择角色', trigger: 'change' },
				],
				wxId: [
					{ required: true, message: '请选择微信号', trigger: 'change' },
				],
			},
			userRolesList:[],//角色列表默认页面
			//弹窗数据模型
			search:{
				keyWord:'',
				page:1,
				pageSize:10
			},
			departmentList:[],//部门下拉列表数据
			positionList:[],//职位下拉列表数据
			userType:"",//编辑或者添加
			wechartIdlist:'',//微信号列表
			groupIdlist:'',//分组列表
			wxId:[]
        }
    },
    created() {
        this.getList();
    },
    methods: {
		//打开弹窗
		openBox(type,id){
			//角色列表
			this.getRolesList()
			// 微信号id
			this.getRobotWxAlias()
			// 分组
			this.getRobotGroupAlias()
			//部门下拉
			// this.getDepartmentsMenuList()
			this.dialogFormVisible = true;
			if(type == 1){
				this.titleName = "新增员工"
			}else{
				this.userType =2;
				this.titleName = "编辑员工"
				this.getAdminUserDetails(id)
			}
		},
		closeBox(){
			this.userType='';
			this.form={
				staffName:"",//员工姓名
				mobile:"",//手机号
				adminPassword:"",//密码
				userRole:[],//角色
				wxId:[],
				confirmPassword:'',//管理员类型
			}
		},
		//获取角色列表
		getRolesList(){
			getUserRoleList({pageSize:300}).then(res=>{
				this.userRolesList = res.data.data.list;
			})
		},
		// 获取微信号id
		getRobotWxAlias(){
			robotWxAlias({}).then(res=>{
				this.wechartIdlist = res.data.data;
			})
		},
		// 获取微信号id
		getRobotGroupAlias(){
			getGroupAllList({}).then(res=>{
				this.groupIdlist = res.data.data;
				console.log(res.data)
			})
		},
		//获取详情
		getAdminUserDetails(id){
			getUserInfo({id:id}).then(res=>{
				if(res.data.code == 200){
					let obj =res.data.data;
					this.form.staffName=obj.name
					this.form.mobile=obj.mobile
					this.form.userRole=obj.roleId
					this.form.wxId=JSON.parse(JSON.stringify(obj.wxids)).map(Number)
					this.form.id=obj.id
					console.log(this.form.wxId)
				}
			})
		},
        // 列表数据
        getList() {
			const loading = this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)"
			});
			this.search.page = this.pageIndex;
			getUserLists(this.search).then(res=>{
				setTimeout(() => {
					loading.close();
				}, 300);
				if(res.data.code==200){
					this.loading =false
					this.list = res.data.data.list;
					this.total = res.data.data.total;
				}else{
					this.loading =false;
					this.$message.error(res.data.msg || '网络开小差了~')
				}
			})
        },
		//保存
		onConfirm(formName){//type=1添加 type=2编辑
			
			this.$refs[formName].validate((valid) => {
			if (valid) {
				if(this.form.adminPassword!=this.form.confirmPassword){
					this.$message.error('两次输入的密码不一致')
					return
				}
				console.log(this.form)
				var data={
					// id:this.form.id,
					roleId:this.form.userRole,
					group_id:this.form.groupRole,
					name:this.form.staffName,
					mobile:this.form.mobile,
					wxids:this.form.wxId.join(","),
					// password:md5(this.form.adminPassword),
					// confirmPassword:md5(this.form.confirmPassword),
				}
				console.log(data)
				// return
					// var obj=_.clone(this.form);
					if(this.userType){
						if(this.form.adminPassword!=''&&this.form.confirmPassword!=''){
							data.password=md5(this.form.adminPassword)
							data.confirmPassword=md5(this.form.confirmPassword)
						}
						data.id=this.form.id
						upFrontUser(data).then(res=>{
							if(res.data.code==200){
								this.dialogFormVisible = false;
								this.$message({
									message: '编辑成功',
									type: 'success'
								});
								this.pageIndex = 1
								this.getList()
								this.form={
									staffName:"",//员工姓名
									confirmPassword:"",//登录名
									mobile:"",//手机号
									adminPassword:"",//密码
									userRole:[],//角色
									wxId:[],//管理员类型
								}
							}else{
								this.$message({
									message: res.data.msg || '编辑失败',
									type: 'error'
								});
							}
						})
					}else{
						data.password=md5(this.form.adminPassword)
						data.confirmPassword=md5(this.form.confirmPassword)
						// obj.userRole =obj.userRole.join(",")
						createFrontUser(data).then(res=>{
							if(res.data.code==200){
								this.dialogFormVisible = false;
								this.$message({
									message: '保存成功',
									type: 'success'
								});
								this.pageIndex = 1
								this.getList()
								this.form={
									staffName:"",//员工姓名
									confirmPassword:"",//登录名
									mobile:"",//手机号
									adminPassword:"",//密码
									userRole:[],//角色
									wxId:[],//管理员类型
								}
							}else{
								this.$message({
									message: res.data.msg || '保存失败',
									type: 'error'
								});
							}
						})
					}
			} else {
				console.log('error submit!!');
				return false;
			}
			});
		},
		// 删除
		onDel(row,data,index){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				delFrontUser({id:row}).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg || "删除成功")
						data.splice(index,1)
					}
				})
			}).catch(() => {
			  this.$message({
				type: 'info',
				message: '已取消删除'
			  });          
			});
		},
        onSubmit() {
            this.pageIndex = 1
            this.getList()
        },
        // 搜索
        handleFilter() {
			this.loading = true
            this.pageIndex = 1
			this.getList()
        },
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
			console.log(val)
			this.loading = true
            this.pageIndex = val
            this.getList()
        }
    }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.goodsName {
  display: block;
}

.main {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f8f8f8;
  > .Setmeal {
    width: 100%;
    min-height: 220px;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    .dayList {
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #eaeaea;
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 2.5px;
      color: #333;
      border-radius: 2px;
    }
    > .title {
      width: 95%;
      height: 50px;
      border-bottom: 1px solid #f4f4f4;
      margin: 0 auto;
      line-height: 50rpx;
      display: flex;
      justify-content: space-between;
      > .name {
        width: 90px;
        height: 100%;
        border-bottom: 1px solid #30333b;
        font-size: 14px;
        font-weight: 800;
        line-height: 50px;
      }
    }
    > .SetmealList {
      width: 100%;
      display: flex;
      justify-content: space-around;
      text-align: center;
      > .msg {
        width: 95%;
        margin: 0 auto;
        > .msg_tips {
          width: 94%;
          margin: 0 auto;
          font-size: 14px;
          color: #888999;
          font-weight: 400;
          margin-top: 40px;
        }
        > .msg_btn {
          width: 94%;
          margin: 0 auto;
          margin-top: 20px;
          display: flex;
          > .text {
            font-size: 14px;
            color: #888999;
            font-weight: 400;
            margin: 0 auto;
            > span {
              color: rgb(56, 118, 232);
              font-size: 25px;
              // margin-right: 10px;
            }
          }
          .paiBtn {
            width: 100px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #fff;
            background-color: #3876e8;
            font-weight: 800;
            text-align: center;
            margin-left: 30px;
          }
        }
      }
    }
    > .msg_table {
      width: 95%;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
}
</style>
