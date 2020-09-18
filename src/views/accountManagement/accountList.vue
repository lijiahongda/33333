<template>
  <div id="accountList">
    <el-dialog :visible.sync="dialogTableVisible" center title="更改权限">
      <!-- <el-tabs v-model="authorityValue" @tab-click="authorityBtn" :tab-position="tabPosition" style="height: 400px;">
          <el-tab-pane v-for="(item_authority,index_authority) in authorityTabList" :key="index_authority" :name="item_authority.id" :label="item_authority.powerName">
            <div class="authorityChildNode" v-for="(item,index) in tabSecond" :key="index">
              <el-checkbox :indeterminate="isIndeterminate[index]" v-model="checkAll[index]" @change="checked => handleCheckAllChange(checked,index)">{{ item.powerName }}</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedTabs[index]" @change="checked => handleCheckedCitiesChange(checked,index)">
                <el-checkbox v-for="(item1,index1) in item.children" :label="item1.id" :key="index1">{{ item1.powerName }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-tab-pane>
      </el-tabs> -->
      <!-- <el-tree
        ref="tree"
        :data="data"
        :show-checkbox="true"
        :default-checked-keys="checkedAuthority"
        :props="defaultProps"
        node-key="id"/> -->

        <el-tree :data="powerList" show-checkbox default-expand-all node-key="powerId" ref="tree" highlight-current :props="defaultProps"
				 :default-checked-keys="checkedList">
				</el-tree>



      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNode">保 存</el-button>
      </span>
    </el-dialog>
    <div class="searchValue">
      <div style="width:300px">
        <el-input v-model="searchForm.keyWord" placeholder="搜索账号" class="input-with-select" @keyup.enter.native="searchAccount">
          <el-button slot="append" icon="el-icon-search" @click="searchAccount"/>
        </el-input>
      </div>
      <router-link to="/accountManagement/openAccount"><el-button v-if="powerPage('/accountManagement/openAccount')" type="primary">新增账号</el-button></router-link>
    </div>
    <div class="tableList">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="staffName"
          label="姓名"
          width="180"
          align="center"/>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="180"
          align="center"/>
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"/>
        <el-table-column
          prop="departmentName"
          label="部门"
          align="center"/>
        <el-table-column
          prop="positionName"
          label="职位"
          align="center"/>
        <el-table-column
          prop="group"
          label="用户类型"
          align="center"
          width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.checkType==1">
              后台用户
            </span>
            <span v-if="scope.row.checkType==2">
              供应商：
              {{ scope.row.supplierName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="270"
          align="center">
          <template slot-scope="scope">
            <el-button
              v-if="powerPage('/accountManagement/editAccount')"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <span v-if="powerPage('/accountManagement/noLoginAccount')">
              <el-button
                v-if="scope.row.status == '有效'"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row, 0)">禁止登陆</el-button>
              <el-button
                v-else
                size="mini"
                type="success"
                @click="handleDelete(scope.$index, scope.row, 1)">允许登陆</el-button>
            </span>
            <el-button
              v-if="powerPage('/accountManagement/upUserPower')"
              size="mini"
              type="primary"
              @click="handleUpdate(scope.$index, scope.row)">更改权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total="parseInt(total)"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { getAdminUsers, delAdminUser, getTreePowers, getUserPowersByLevel, upAdminUserPower, getGroupChannes } from '@/api/accountManagement'
export default {
  name: 'AccountList',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'powerName'
      },
      checkedList:[],
      powerList:[],
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }],

      checkedAuthority: [],
      // all权限
      // allAuthority: '',
      // // 权限列表
      // authorityTabList:[],
      // // 选项卡多选
      // checkAll: [],
      // checkedTabs: [],
      // tabSecond: [
      //   {
      //     children: []
      //   }
      // ],
      // isIndeterminate: [],

      searchValue: '',
      currentPage: 1,
      dialogTableVisible: false,
      tabPosition: 'left',
      authorityValue: '', // 当前选中的tab
      tableData: [],
      searchForm: {
        page: 1,
        pageSize: 10,
        keyWord: ''
      },
      total: '',
      radioList: {},
      adminUserId: ''
    }
  },
  created() {
    this.init()
    this.getGroupChannes()
  },
  methods: {
    // 搜索
    searchAccount: function() {
      this.init()
    },
    // 表格操作
    handleEdit(index, row) {
      // console.log(index, row)
      this.$router.push({ path: '/accountManagement/openAccount', query: { id: row.adminUserId }})
    },
    handleDelete(index, row, status) {
      // console.log(index, row)
      const _this = this
      delAdminUser({ id: row.adminUserId, status: status }).then(res => {
        if (res.data.code === 200) {
          _this.$message({ message: res.data.msg, type: 'success' })
          _this.init()
        }
      })
    },
    // 权限操作
    handleUpdate: function(index, row) {
      const _this = this
      _this.checkedAuthority = []
      _this.getUserPowersByLevelInit(row.adminUserId)
      // _this.tabSecond = []
    },
//保存
		saveNode(){
			var powerIdList = this.$refs.tree.getCheckedKeys()
			// console.log(powerIdList, "改变menuIdsmenuIdsmenuIds")
			// console.log(this.checkedList,'checkedList')
			if (powerIdList.length == 0) {
				this.$message.error("请选择权限")
				return false;
			}
			this.powerList.map(dataItem=>{
				if (dataItem.children.length != 0) {
					var itemChild = dataItem.children;
					powerIdList.map(item => {
						itemChild.map(data => {
							if (item == data.powerId) {
								powerIdList.push(dataItem.powerId)
							}else{
								if(data.children){
									data.children.map(small=>{
										if(item == small.powerId){
											powerIdList.push(data.powerId)
											powerIdList.push(dataItem.powerId)
										}
									})
								}
							}
						})
					})
				}
			})
			powerIdList = this.uniq(powerIdList).join(",");
			// this.form.rolePwoer =powerIdList;
      
      // this.form.roleId = this.$route.query.roleId;
      const data = {
        'admin_member_id': this.adminUserId,
        'admin_power_ids': powerIdList
      }

      upAdminUserPower(data).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          this.$message({ message: res.data.msg, type: 'success' })
          this.dialogTableVisible = false
        }
      })
    },
    
    // 数组去重
		uniq(array) {
			var temp = []; //一个新的临时数组
			for (var i = 0; i < array.length; i++) {
				if (temp.indexOf(array[i]) == -1) {
					temp.push(array[i]);
				}
			}
			return temp;
		},



    // // 保存权限
    // saveNode2: function() {



    //   const _this = this
    //   const data = {
    //     'admin_member_id': this.adminUserId,
    //     'admin_power_ids': this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()) + ''
    //   }

    //   if (this.adminUserId === '') {
    //     _this.$message({ message: '数据错误', type: 'error' })
    //     return
    //   }

    //   console.log(data)
    //   upAdminUserPower(data).then(res => {
    //     if (res.data.code === 200) {
    //       console.log(res)
    //       _this.$message({ message: res.data.msg, type: 'success' })
    //       _this.dialogTableVisible = false
    //     }
    //   })
    // },
    // all 权限   //获取详情
    getUserPowersByLevelInit: function(adminUserId) {
       this.dialogTableVisible = true
       this.checkedList=[]
      getUserPowersByLevel({ adminMemberId: adminUserId }).then(res => {
        if(res.data.code == 200){
					this.getList().then(()=>{
                // this.form.roleName = res.data.data.roleName
                 this.adminUserId = adminUserId
                  // console.log(this.checkedList,'111')
                if(res.data.userPwoer!='')
                {
                    // console.log(1211);
                    this.checkedList = 	res.data.userPwoer.split(",")
                }else{
                  // console.log(3333);
                    this.checkedList =[];
                }
                
                var list = _.clone(this.checkedList)
                
                list.map((child,idx)=>{
                  this.powerList.map(item=>{
                    if(item.powerId == child){
                      _.pull(this.checkedList,child)
                    }
                    if(item.children){
                      item.children.map(small=>{
                        if(small.powerId == child &&small.children){
                          _.pull(this.checkedList,child)
                        }
                      })
                    }
                  })
                })
                // this.checkedList = list;
                // console.log(this.checkedList,'222')
					})
				}else{
					this.$message.error(res.data.msg || "网络开小差了~")
				}

      })
            



      // const _this = this
      // _this.dialogTableVisible = true
      // getUserPowersByLevel({ adminMemberId: adminUserId }).then(res => {
      //   if (res.data.code === 200) {
      //     this.adminUserId = adminUserId
      //     const arr = res.data.data
      //     if (arr.length !== 0) {
      //       _this.$refs.tree.setCheckedKeys([14,23],true)
      //       // _this.$refs.tree.setCheckedKeys(arr,true)
      //     } else {
      //       _this.$refs.tree.setCheckedNodes([])
      //       // _this.$message({ message: res.data.msg, type: 'error' })
      //     }
      //   } else {
      //     _this.$message({ message: res.data.msg, type: 'error' })
      //   }
      // })
    },
 // 获取权限列表数据
        getList() {
          return new Promise(resolve=>{
            getTreePowers().then(res=>{
              if(res.data.code==200){
                this.loading = false;
                this.powerList = res.data.data;
                resolve()
              }else{
                this.loading = false;
                this.$message.success(res.data.msg ||"网络开小差了~")
              }
            })
          })
        },


    // 列表
    init: function() {
      const _this = this
      getAdminUsers(_this.searchForm).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          _this.tableData = res.data.data.list
          _this.total = res.data.data.total
          // getTreePowers().then(res => {
          //   if (res.data.code === 200) {
          //     // console.log(res.data.data)
          //     _this.data = res.data.data
          //   }
          // })
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.pageSize = val
      this.init()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.searchForm.page = val
      this.init()
      // console.log(`当前页: ${val}`)
    },
    getGroupChannes: function() {
      getGroupChannes().then(res => {
        if (res.data.code === 200) {
          this.radioList = res.data.data
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#accountList {
  box-sizing: border-box;
  padding: 20px;
}
.tableList {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
}
.pagination {
  margin-top: 20px;
}

.searchValue {
  width: 420px;
  display: flex;
  justify-content: space-between;
}
.authorityChildNode {
  box-sizing: border-box;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
