<!--suppress ALL -->
<template>
  <div class="main">
    <div class="Setmeal" style="min-height:20px; box-sizing: border-box;padding:20px">
      <el-form ref="form" label-width="120px" :inline="true">
        <el-form-item label="角色名称">
          <el-col>
            <el-input v-model="roleName" placeholder="角色名称查询" style="width:300px;" clearable />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">搜索</el-button>
          <el-button type="primary" @click="onAdd(1)">新增角色</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--搜索部分-->
    <div class="Setmeal" style="min-height:20px; box-sizing: border-box;padding:20px">
      <div class="new_tab">
        <el-table v-loading="loading" :data="list" :fit="true" style="width: 100%;">
          <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="createdAt" label="添加/修改时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="small" @click="onAdd(2,scope.row.roleId)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="onDel(scope.$index,scope.row.roleId,list)"
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
  </div>
</template>
<script>
import waves from "@/directive/waves"; // 水波纹指令
import { getUserRoleList, delFrontRole } from "@/api/zAjax";
const options = [
  {
    value: "1",
    label: "悦淘"
  },
  {
    value: "2",
    label: "旅悦"
  },
  {
    value: "3",
    label: "大人"
  }
];
export default {
  directives: {
    waves
  },
  data() {
    return {
      options,
      selectval: "1",
      total: null,
      switchChart: false,
      list: [],
      pageTotal: 0, //显示页数
      pageIndex: 1,
      pageSize: 10,
      loading: true,
      status: "",
      params: "",
      label_name: "",
      roleName: "" //搜索条件角色名
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onAdd(type, roleId) {
      if (type == 1) {
        this.$router.push({ name: "角色设置" });
      } else {
        this.$router.push({ name: "角色设置", query: { roleId: roleId } });
      }
    },
    // 列表数据
    getList() {
      const loading = this.$loading({
				lock: true,
				text: "Loading",
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.7)"
			});
      getUserRoleList({
        page: `${this.pageIndex}`,
        keyWord: this.roleName,
        pageSize: "10"
      }).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          this.loading = false;
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.loading = false;
          this.$message.success(res.data.msg || "网络开小差了~");
        }
      });
    },
    // 删除
    onDel(idx, roleId, list) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delFrontRole({ roleId: roleId }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              // list.splice(idx,1)
              this.getList();
            } else {
              this.$message({
                type: "info",
                message: res.data.msg
              });
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
    //取消
    onCancel(row) {
      row.edit = false;
      row.label_name = row.label_name_new;
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
