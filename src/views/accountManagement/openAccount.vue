<template>
  <div id="openAccount">
    <div class="userForm">
      <el-form ref="form" :model="form" class="demo-ruleForm"  :rules="rules"  label-width="100px">
        <el-form-item label="用户类型" prop="resource">
          <el-radio-group v-model="form.checkType" >
            <el-radio label="1">后台用户</el-radio>
            <el-radio label="2">供应商用户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="form.checkType === '2'" label="选择供应商" prop="groupId">
			<el-select
				v-model="form.groupId"
				filterable
				style="width: 300px;"
				remote
				reserve-keyword
				placeholder="请输入关键词"
				:remote-method="remoteMethod"
				clearable
				:loading="loading">
				<el-option v-for="item in sxl_supplier" :key="item.id" :label="item.supplierName" :value="item.id" />
			</el-select>
<!--           <el-select v-model="form.groupId" placeholder="请选择供应商" filterable clearable style="width:400px">-->
<!--              <el-option v-for="item in sxl_supplier" :key="item.id" :label="item.supplierName" :value="item.id" />-->
<!--            </el-select>-->
          <!-- <el-radio-group v-model="form.groupId">
            <el-radio v-for="(item,index) in radioList" :key="index" :label="index">{{ item }}</el-radio>
          </el-radio-group> -->
        </el-form-item>

        <el-form-item label="姓名" prop="staffName">
          <el-input v-model="form.staffName" class="userInput"/>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile" class="userInput"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" class="userInput"/>
        </el-form-item>
		  <el-form-item label="账户类型" prop="accountType">
			  <el-select v-model="form.accountType" placeholder="请选择" clearable>
				  <el-option
					  v-for="item in account_types"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
				  </el-option>
			  </el-select>
		  </el-form-item>
        <el-form-item label="部门">
          <el-input v-if="form.checkType === '2'" v-model="form.departmentName" class="userInput" clearable />
			<el-cascader
				v-else
				ref="departmentName"
				v-model="form.departmentId"
				:options="departments"
				@change="changeDepartment"
				clearable></el-cascader>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.positionName" class="userInput"/>
        </el-form-item>

		  <el-form-item v-if="$route.query.id" label="密码" >
			  <el-input v-model="form.adminPassword" class="userInput"/>
		  </el-form-item>
		  <el-form-item v-else label="密码" prop="adminPassword">
			  <el-input v-model="form.adminPassword" class="userInput"/>
		  </el-form-item>

        <el-form-item>
          <el-button v-if="!this.$route.query.id" type="primary" @click="addAdminUserBtn('form')">立即创建</el-button>
          <el-button v-else type="primary" @click="upAdminUserBtn('form')">立即更新</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getAdminUser, addAdminUser, upAdminUser} from '@/api/accountManagement'
import {getSplDepartmentsMenu} from '@/api/admin'
import {
  getSuppliers
} from '@/api/yueStock'
export default {
  name: 'OpenAccount',
  data() {
    var validateMobile = (rule, value, callback) => {
      if (!(/1[3|5|6|7|8|9|]\d{9}/.test(value))) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    return {
      form: {
        createdTime: '',
        departmentName: '',
        id: '',
        memberType: '',
        mobile: '',
        positionName: '',
        salt: '',
        staffName: '',
        status: '',
        adminPassword: '',
        departmentId:[]
      },
      account_types:[
		{label:'普通用户',value:0},
        {label:'部门长',value:1},
        {label:'系统人员',value:2}
	  ],
      loading: true,
      departments:[],
      userId: '',
      sxl_supplier: [],
      rules: {
        groupId: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        accountType: [
          { required: true, message: '请输入必填项', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入必填项', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
		],
        staffName: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        adminPassword: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
	  }
    }
  },
  created() {
    this.getDepartmentsMenu();
    if (this.$route.query.id) {
      this.form.id = this.$route.query.id
      this.init(this.$route.query.id)
    } else {
      this.form = {
        createdTime: '',
        departmentName: '',
        id: '',
        memberType: '',
        mobile: '',
        positionName: '',
        salt: '',
        staffName: '',
        status: '',
        email: '',
        adminPassword: '',
        departmentId:[]
      }
    }
  },
  methods: {
    // 添加
    addAdminUserBtn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          if (_this.form.checkType === '1') {
            _this.form.groupId = 0
          }
          if(this.form.departmentId.length){
            _this.form.departmentIds=[{
              departmentId: this.form.departmentId[0] || '',
              level:1
            },{
              departmentId:this.form.departmentId[1] || '',
              level:2
            }
            ]
          }
          addAdminUser(_this.form).then(res => {
            if (res.data.code === 200) {
              _this.$message({ message: res.data.msg, type: 'success' })
              _this.$router.push({ path: '/accountManagement/accountList' })
            } else {
              _this.$message({ message: res.data.msg, type: "error" });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    changeDepartment(val){
      if(val){
        console.log(this.$refs.departmentName.getCheckedNodes()[0].pathLabels);

        this.form.departmentName = this.$refs.departmentName.getCheckedNodes()[0].pathLabels.join('/')
	  }
    },
    getDepartmentsMenu(){
      getSplDepartmentsMenu().then(res=>{
        if(res.data.code == 200) {
          res.data.data.map(item=>{
            item.value = item.departmentId;
            item.label = item.departmentName;
            item.children.map(self=>{
              self.value = self.departmentId;
              self.label = self.departmentName;
            });
          })
          this.departments = res.data.data;

        }
      })
    },
    // 更新
    upAdminUserBtn: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          if (_this.form.checkType === '1') {
            _this.form.groupId = 0
          }

          if(this.form.departmentId && this.form.departmentId.length){
            _this.form.departmentIds=[{
              departmentId: this.form.departmentId[0] || '',
              level:1
            },{
              departmentId:this.form.departmentId[1] || '',
              level:2
            }
            ]
		  }

          upAdminUser(_this.form).then(res => {
            if (res.data.code === 200) {
              _this.$message({ message: res.data.msg, type: 'success' })
              _this.$router.push({ path: '/accountManagement/accountList' })
            }else{
              _this.$message({ message: res.data.msg, type: "error" });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 回显
    init: function(id) {
      getAdminUser({ id: id }).then(res => {
        if (res.data.code) {
          	this.form = res.data.data
          if (this.form.groupId !== '0') {
            this.getSuppliers()
          }
        }
      })
    },

    remoteMethod(query) {
      console.log(query.length)
      if (query.length>1) {
        this.loading = true;
        getSuppliers({
          keyWord: query
        }).then(res => {
          if (res.data.code === 200){
            this.loading = false;
            this.sxl_supplier = res.data.data.list.filter(item => {
              return item.supplierName.indexOf(query) > -1;
            });
          } else {
            this.sxl_supplier = [];
            this.$message.warning(res.data.msg);
            this.loading = false;
          }
        })
      }
    },

    getSuppliers: function() {
      getSuppliers({pageSize:600}).then(res => {
        if (res.data.code === 200) {
          this.sxl_supplier = res.data.data.list
        }
      })
    },

    // radioGroup: function() {
    //   const _this = this
    //   if (_this.form.checkType === '2') {
    //     _this.getSuppliers()
    //   }
    // }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#openAccount {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
}
.userForm {
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
  // width: 500px;
}
.userInput{
  width: 500px;
}
</style>
