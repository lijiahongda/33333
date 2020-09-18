<!--suppress ALL -->
<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px" :inline="true" v-loading="loading">
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" style="width:300px;" />
      </el-form-item>
      <el-form-item label="选择权限">
        <el-tree
          :data="powerList"
          show-checkbox
          default-expand-all
          node-key="powerId"
          ref="tree"
          highlight-current
          :props="defaultProps"
          :default-checked-keys="checkedList"
        ></el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onConfirm" style="margin: 40px 0 0 125px;">{{btnName}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import waves from "@/directive/waves"; // 水波纹指令
import {
  getFrontRole,
  addFrontRole,
  upFrontRole,
  getUserPowersList
} from "@/api/zAjax";
import _ from "lodash";
export default {
  directives: {
    waves
  },
  data() {
    return {
      loading: true,
      checkedList: [], //默认选中的值
      powerList: [
        // {
        // 	"powerId": 2,
        // 	"powerName": "权限管理",
        // 	"level": 1,
        // 	"children": [
        // 		{
        // 			"powerId": 4,
        // 			"powerName": "角色管理",
        // 			"level": 2
        // 		},
        // 		{
        // 			"powerId": 3,
        // 			"powerName": "员工管理",
        // 			"level": 2
        // 		}
        // 	]
        // }
      ], //权限列表
      form: {
        roleName: "",
        rolePwoer: ""
      },
      defaultProps: {
        children: "children",
        label: "powerName"
      },
      btnName: "新增角色",
      confirmId: "" //是否为编辑
    };
  },
  created() {
    // this.getList();
    if (this.$route.query.roleId) {
      this.getUserRoleDetails(this.$route.query.roleId);
      this.confirmId = 1;
      this.btnName = "编辑角色";
    } else {
      this.getList();
    }
  },
  methods: {
    //获取角色详情
    getUserRoleDetails(roleId) {
      getFrontRole({ roleId: roleId }).then(res => {
        if (res.data.code == 200) {
          this.getList().then(() => {
            this.form.roleName = res.data.data.role_name;
            this.checkedList = res.data.data.role_pwoer.split(",");
            var list = _.clone(this.checkedList);

            list.map((child, idx) => {
              this.powerList.map(item => {
                if (item.powerId == child) {
                  _.pull(this.checkedList, child);
                }
                if (item.children) {
                  item.children.map(small => {
                    if (small.powerId == child && small.children) {
                      _.pull(this.checkedList, child);
                    }
                  });
                }
              });
            });
            // this.checkedList = list;
            console.log(this.checkedList, "list");
          });
        } else {
          this.$message.error(res.data.msg || "网络开小差了~");
        }
      });
    },
    // 获取权限列表数据
    getList() {
      const loading = this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)"
			});
      return new Promise(resolve => {
        getUserPowersList().then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.powerList = res.data.data;
            setTimeout(() => {
              loading.close();
            }, 300);
            resolve();
          } else {
            this.loading = false;
            this.$message.success(res.data.msg || "网络开小差了~");
          }
        });
      });
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
    //保存
    onConfirm() {
      var powerIdList = this.$refs.tree.getCheckedKeys();
      console.log(powerIdList, "改变menuIdsmenuIdsmenuIds");
      console.log(this.checkedList, "checkedList");
      if (powerIdList.length == 0) {
        this.$message.error("请选择权限");
        return false;
      }
      this.powerList.map(dataItem => {
        if (dataItem.children.length != 0) {
          var itemChild = dataItem.children;
          powerIdList.map(item => {
            itemChild.map(data => {
              if (item == data.powerId) {
                powerIdList.push(dataItem.powerId);
              } else {
                if (data.children) {
                  data.children.map(small => {
                    if (item == small.powerId) {
                      powerIdList.push(data.powerId);
                      powerIdList.push(dataItem.powerId);
                    }
                  });
                }
              }
            });
          });
        }
      });
      powerIdList = this.uniq(powerIdList).join(",");
      this.form.rolePwoer = powerIdList;
      if (this.confirmId != 1) {
        addFrontRole(this.form).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.$router.push("/power/userRole");
          } else {
            this.$message({
              message: "保存失败",
              type: "error"
            });
          }
        });
      } else {
        this.form.roleId = this.$route.query.roleId;
        upFrontRole(this.form).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.$router.push("/power/userRole");
          } else {
            this.$message({
              message: "编辑失败",
              type: "error"
            });
          }
        });
      }
    },

    onSubmit() {
      this.pageIndex = 1;
      this.getList();
    },
    // 搜索
    handleFilter() {
      this.pageIndex = 1;
      this.getList();
    },
    // 分页
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    }
  }
};
</script>
<style type="scss" scoped="scoped">
.el-form--inline .el-form-item {
  display: block;
}
</style>
