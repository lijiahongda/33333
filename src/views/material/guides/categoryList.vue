<template>
  <div v-loading="loading" class="content" id="categoryList">
    <div class="Setmeal">
      <el-checkbox-group 
        v-model="checkedCities"
        @change="handleChooseCategory"
         >
        <el-checkbox v-for="(item,index) in categoryData" :label="item.id" :value="item.id" :key="index">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <div style="height:20px;"></div>
      <el-button type="primary" @click="handleAdd">新增分类</el-button>
      <el-button type="primary" @click="showAllArticle">选择教程</el-button>
    </div>
    <div class="Setmeal">
      <el-table :data="tableData.list" style="width: 100%">
        <el-table-column align="center" label="序号" width="60" prop="num"></el-table-column>
        <el-table-column align="center" label="标题" prop="title" width="360"></el-table-column>
        <el-table-column align="center" label="描述" prop="desc" width="660"></el-table-column>
        <el-table-column align="center" label="排序值" width="80" prop="sort"></el-table-column>
        <el-table-column align="center" label="创建时间" width="180" prop="created_time"></el-table-column>
        <el-table-column align="center" prop label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleDel(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container" style="text-align:right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="tableData.page"
        :page-size="tableData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="请输入分类名称" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="攻略列表" :visible.sync="dialogArticleVisible" @close="handleClose">
      <el-table
        :data="otherArticle.list"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" label="id" width="60" prop="id"></el-table-column>
        <el-table-column align="center" label="标题" prop="title"></el-table-column>
        <el-table-column align="center" label="描述" prop="desc"></el-table-column>
        <el-table-column align="center" label="排序值" width="80" prop="sort"></el-table-column>
        <el-table-column align="center" label="创建时间" width="180" prop="created_time"></el-table-column>
        <!-- <el-table-column align="center" prop label="操作" width="160">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleDel(scope.row.id)">移除</el-button>
					</template>
        </el-table-column>-->
      </el-table>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          @current-change="OtherCurrentChange"
          :current-page="otherArticle.page"
          :page-size="otherArticle.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="otherArticle.total"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogArticleVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmMove">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
import {
  getArticleList,
  ajaxCategoryList,
  updateCategory,
  addCategory,
  removeArticle,
  moveArticle
} from "@/api/robot";
export default {
  data() {
    return {
      checkedCities: [],
      form: {
        name: ""
      },
      form2: {
        name: ""
      },
      loading: false,
      categoryOneData: {},
      dialogFormVisible: false,
      dialogArticleVisible: false,
      categoryData: [],
      tableData: [],
      // loading: false,
      fy: {
        page: 1, //当前页
        page_size: 10 //每页条数
      },
      total: 0, //总条数
      pageIndex: 1,
      obj: {
        strategy_category_id: "",
        page: this.pageIndex
      },
      objOther: {
        strategy_category_id: 0,
        page: this.pageIndex,
        pageSize: 10
      },
      otherArticle: [],
      selsecArticle: [],
      strategy_category_name: "全部",
      // 全选
      // checkAll: false,
      // checkedCities: ['上海', '北京'],
      // cities: this.categoryOneData,
      // isIndeterminate: true
    };
  },
  mounted() {
    this.getList();
    this.getCategoryList();
  },
  methods: {
    checkChose(val){
      console.log(val)
    },
    // 全选
    // handleCheckAllChange(val) {
    //   this.categoryData = val ? this.categoryOneData : [];
    //   this.isIndeterminate = false;
    // },
    // 单选
    handleCheckedCitiesChange(value) {
      console.log(value)
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleChooseCategory(val) {
      console.log(val)
      this.obj.strategy_category_id = val==''?'':val;
      // this.strategy_category_name = obj.name
      this.getList();
    },

    handleCategpry(id) {
      console.log("要删除的id", id);
      this.$confirm("是否继续此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          // this.loading = true;
          moveArticle({ id: id }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getCategoryList();
              setTimeout(() => {
                loading.close();
              }, 300);
              // this.loading = false;
            } else {
              this.$message.error(
                res.data.message || "数据加载失败,请检查网络"
              );
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
    showAllArticle() {
      getArticleList(this.objOther).then(res => {
        if (res.data.code == 200) {
          this.otherArticle = res.data.data;
          this.dialogArticleVisible = true;
        } else {
          this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        }
        this.loading = false;
      });
    },
    confirmMove() {
      let id = [];
      this.selsecArticle.forEach(item => id.push(item.id));
      let params = {
        strategy_category_id: this.obj.strategy_category_id,
        id: id
      };
      moveArticle(params).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getList();
          this.getCategoryList();
          this.dialogArticleVisible = false;
        } else {
          this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        }
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      console.log(val, "val");
      this.selsecArticle = val;
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.chooseId = 0;
    },
    confirm(status) {
      this.$confirm("是否继续保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.loading = true;
          let url = this.chooseId ? updateCategory : addCategory;
          this.chooseId ? "" : (this.form.level = 1);
          let obj = {};
          if (this.chooseId) {
            obj.level = 1;
            obj.name = this.form.name;
            obj.id = this.categoryOneData.id;
          } else {
            obj.level = 1;
            obj.name = this.form.name;
          }

          url(obj).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.dialogFormVisible = false;
              this.getCategoryList();
            } else {
              this.$message.error(res.data.msg);
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
    getCategoryList() {
      ajaxCategoryList().then(res => {
        if (res.data.code == 200) {
          let _res = res.data.data;
          this.categoryData = _res.list;
        } else {
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
      });
    },
    onSearch() {
      this.obj.page = 1;
      this.getList();
    },
    getList() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      getArticleList(this.obj).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
        // this.loading = false;
        setTimeout(() => {
          loading.close();
        }, 300);
      });
    },
    handleDel(id) {
      this.$confirm("是否继续此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.loading = true;
          removeArticle({
            id: [id],
            strategy_category_id: this.obj.strategy_category_id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "移除成功!"
              });
              this.getList();
              this.getCategoryList();
            } else {
              this.$message.error(res.data.msg || "数据加载失败,请检查网络");
            }
            // this.loading = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取移除"
          });
        });
    },
    handleShowDialog(obj) {
      this.form.name = obj.name;
      this.categoryOneData = obj;
      this.chooseId = 1;
      this.dialogFormVisible = true;
    },
    handleCurrentChange(val) {
      this.obj.page = val;
      this.getList();
    },
    OtherCurrentChange(val) {
      this.objOther.page = val;
      this.showAllArticle();
    },
    handleClose() {
      this.objOther.page = this.pageIndex;
      this.dialogArticleVisible = false;
    }
  }
};
</script>
<style scoped="scoped" lang="scss">
.content {
  padding: 20px;
  background-color: #f8f8f8;
}
.Setmeal {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  /* min-height: 220px; */
  background-color: #fff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}
#categoryList {
  padding: 20px;
}
img {
  width: 70px;
  height: 70px;
}
.el-table {
  margin-top: 10px;
}
.cat-label {
  cursor: pointer;
  line-height: 44px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
</style>
