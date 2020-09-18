<!--suppress ALL -->
<template>
  <div class="main">
    <!-- 头部展示 -->
    <div class="Setmeal" style="min-height:20px; box-sizing: border-box;padding:20px">
      <el-button type="primary" @click="openBox(1,'id')">新增小组</el-button>
    </div>
    <!--列表部分-->
    <div class="Setmeal" style="min-height:20px; box-sizing: border-box;padding:20px">
      <div class="new_tab">
        <el-table :data="list" :fit="true" style="width: 100%;" v-loading="loading">
          <el-table-column prop="group_name" label="小组名称" align="center"></el-table-column>
          <el-table-column prop="leader_name" label="组长" align="center"></el-table-column>
          <el-table-column prop="orderCount" label="订单量" align="center"></el-table-column>
          <el-table-column prop="orderAmount" label="GMV" align="center"></el-table-column>
          <!-- <el-table-column prop="createdAt" label="添加/修改时间" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="small" @click="editBox(scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="onDel(scope.row)"
                v-if="scope.row.adminUserName!='admin'"
              >删除</el-button>
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
    <!-- 新增表单 -->
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible" @close="closeBox">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="小组名称" :label-width="formLabelWidth" prop="teamName">
          <el-input v-model="form.teamName" autocomplete="off" placeholder="请输入小组名称"></el-input>
        </el-form-item>
        <el-form-item label="选择群成员" :label-width="formLabelWidth">
          <div style="width:100%;height: 250px;overflow-y: scroll;">
            <div v-for="item in wechartIdlist" :key="item.id" class="group-zulist">
              <el-checkbox-group v-model="form.wxId" size="mini">
                <el-checkbox :value="item" :label="item">{{item.name}}</el-checkbox>
              </el-checkbox-group>
              <div
                class="group-zulist-btn-a"
                v-if="item.group_mid==0&&xuanding==0"
                @click="rentob(item)"
              >设为组长</div>
              <div class="group-zulist-btn-b" v-if="item.group_mid==0&&xuanding==1">设为组长</div>
              <div
                class="group-zulist-btn-c"
                v-if="item.group_mid==1&&xuanding==1"
                @click="rentobop(item)"
              >设为组长</div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更新表单 -->
    <el-dialog :title="titleName" :visible.sync="dialogeditFormVisible" @close="closeBox">
      <el-form :model="editform" :rules="rules" ref="ruleditForm">
        <el-form-item label="小组名称" :label-width="formLabelWidth" prop="group_name">
          <el-input v-model="editform.group_name" autocomplete="off" placeholder="请输入小组名称123"></el-input>
        </el-form-item>
        <el-form-item label="选择群成员" :label-width="formLabelWidth">
          <div style="width:100%;height: 250px;overflow-y: scroll;">
            <div v-for="item in editform.data" :key="item.id" class="group-zulist">
              <el-checkbox-group v-model="editform.data" size="mini">
                <el-checkbox :value="item" :label="item">{{item.name}}</el-checkbox>
              </el-checkbox-group>
              <div
                class="group-zulist-btn-a"
                v-if="item.group_mid==0&&bxuanding==0"
                @click="rentobedit(item)"
              >设为组长</div>
              <div class="group-zulist-btn-b" v-if="item.group_mid==0&&bxuanding==1">设为组长</div>
              <div
                class="group-zulist-btn-c"
                v-if="item.group_mid==1&&bxuanding==1"
                @click="rentobopedit(item)"
              >设为组长</div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="oneditConfirm('ruleditForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import waves from "@/directive/waves"; // 水波纹指令
import {
  robotWxAlias,
  getUserLists,
  createFrontUser,
  getUserRoleList,
  getUserInfo,
  upFrontUser,
  delFrontUser
} from "@/api/zAjax";
import {
  getNotBindMemberData,
  addGroupList,
  getGroupInfo,
  upGroupInfo,
  disbandGroup,
  getGroupList
} from "@/api/zAjax";
import _ from "lodash";
import md5 from "js-md5";
export default {
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      total: null,
      list: [],
      pageTotal: 0, //显示页数
      pageIndex: 1,
      pageSize: 10,
      titleName: "", //弹窗title
      //新增群组
      dialogFormVisible: false, //弹窗开关
      formLabelWidth: "15%",
      form: {
        teamName: "", //小组名称
        wxId: []
      },
      rules: {
        teamName: [
          { required: true, message: "请输入小组名称", trigger: "blur" }
        ],
        wxId: [{ required: true, message: "请选择小组成员", trigger: "change" }]
      },
      //编辑群组
      dialogeditFormVisible: false, //弹窗开关
      editform: {
        data: []
      },
      userRolesList: [], //角色列表默认页面
      //弹窗数据模型
      search: {
        keyWord: "",
        page: 1,
        pageSize: 10
      },
      departmentList: [], //部门下拉列表数据
      positionList: [], //职位下拉列表数据
      userType: "", //编辑或者添加
      wechartIdlist: "", //微信号列表
      wxId: [],
      xuanding: 0,
      bxuanding: 1,
      isadd: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //设置组长
    rentob(e) {
      let _e = e;
      if (this.form.wxId.length > 0) {
        this.form.wxId.map(val => {
          if (_e.group_mid == val.group_mid) {
            e.group_mid = 1;
            this.xuanding = 1;
          }
        });
      }
    },
    //取消组长
    rentobop(e) {
      e.group_mid = 0;
      this.xuanding = 0;
    },
    //设置编辑组长
    rentobedit(e){
      let _e = e;
      // console.log(_e, "eeeeeee", this.form.wxId);
        this.editform.data.map(val => {
          if (_e.group_mid == val.group_mid) {
            e.group_mid = 1;
            this.bxuanding = 1;
          }
        });
    },
    //取消编辑组长
    rentobopedit(e){
      e.group_mid = 0;
      this.bxuanding = 0;
    },
    //打开新增小组表单
    openBox() {
      // 群组人员
      this.getRobotWxAlias();
      this.dialogFormVisible = true;
    },
    //编辑小组表单
    editBox(item) {
      console.log(item);
      let _id = item.group_id;
      this.getWGroupInfo(_id);
      // 群组人员
      // this.getWGroupInfo();
      this.dialogeditFormVisible = true;
    },
    closeBox() {
      this.form = {
        teamName: "", //员工姓名
        wxId: []
      };
    },

    // 获取群组人员
    getRobotWxAlias() {
      getNotBindMemberData({}).then(res => {
        console.log(res.data.data);
        res.data.data.map(val => {
          val.group_mid = 0;
        });
        this.wechartIdlist = res.data.data;
      });
    },
    // 获取群组详情
    getWGroupInfo(id) {
      let data = {
        id: id
      };
      getGroupInfo(data).then(res => {
        // console.log(res.data.data, 'res.data.data')
        this.editform = res.data.data;
      });
    },
    //获取详情
    getAdminUserDetails(id) {
      getUserInfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          let obj = res.data.data;
          this.form.staffName = obj.name;
          this.form.mobile = obj.mobile;
          this.form.userRole = obj.roleId;
          this.form.wxId = JSON.parse(JSON.stringify(obj.wxids)).map(Number);
          this.form.id = obj.id;
          console.log(this.form.wxId);
        }
      });
    },
    // 列表数据
    getList() {
      // const loading = this.$loading({
      //   lock: true,
      //   text: "Loading",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)"
      // });
      let data = {
        orderBy: 1,
        page: this.pageIndex,
        pageSize: this.pageSize
      };
      getGroupList(data).then(res => {
        this.loading = false;
        console.log(res.data.data, "i878788897979");
        this.list = res.data.data;
      });
    },
    //新建小组
    onConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form);
          let data = {
            group_name: this.form.teamName,
            data: this.form.wxId
          };
          if (this.form.teamName) {
            addGroupList(data).then(res => {
              if (res.data.code == 200) {
                this.dialogFormVisible = false;
                this.$message({
                  message: "新建成功",
                  type: "success"
                });
                this.pageIndex = 1;
                this.getList();
                this.form = {
                  teamName: "", //员工姓名
                  wxId: [] //管理员类型
                };
                this.xuanding=0;
              } else {
                this.$message({
                  message: res.data.msg || "新建失败",
                  type: "error"
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    oneditConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form);
          let data = {
            id: this.editform.id,
            group_name: this.editform.group_name,
            data: this.editform.data
          };
          if (this.editform.group_name) {
            upGroupInfo(data).then(res => {
              if (res.data.code == 200) {
                this.dialogeditFormVisible = false;
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
                this.pageIndex = 1;
                this.getList();
                // this.editform = {
                //   teamName: "", //群组名称
                //   wxId: [] //管理员类型
                // };
              } else {
                this.$message({
                  message: res.data.msg || "编辑失败",
                  type: "error"
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除
    onDel(item) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          disbandGroup({ group_id: item.group_id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg || "删除成功");
              // data.splice(index, 1);
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onSubmit() {
      this.pageIndex = 1;
      this.getList();
    },
    // 搜索
    handleFilter() {
      this.loading = true;
      this.pageIndex = 1;
      this.getList();
    },
    // 分页
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      console.log(val);
      this.loading = true;
      this.pageIndex = val;
      this.getList();
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.goodsName {
  display: block;
}
.group-zulist {
  display: flex;
  .group-zulist-btn-a {
    margin-left: 15px;
    color: #000;
  }
  .group-zulist-btn-b {
    margin-left: 15px;
    color: gray;
  }
  .group-zulist-btn-c {
    margin-left: 15px;
    color: #409eff;
  }
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
