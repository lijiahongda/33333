<template>
	<div class="content">
    <div class="Setmeal">
      <router-link to="/material/guides/edit">
        <el-button type="primary">新增教程</el-button>
      </router-link>
      <router-link to="/material/guides/categoryList">
        <el-button type="primary">分类列表</el-button>
      </router-link>
    </div>
    <div class="Setmeal">
      <el-table :data="tableData.list" style="width: 100%">
        <el-table-column  align="center" label="序号" width="60" prop="id"></el-table-column>
        <el-table-column  align="center" label="是否为置顶图片" width="120" prop="is_top">
          <template slot-scope="scope">
            {{scope.row.is_top==1 ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column  align="center" label="置顶封面图" width="120" prop="top_img">
          <template slot-scope="scope">
            <img v-if="scope.row.top_img!=''" :src="scope.row.top_img" alt="">
          </template>
        </el-table-column>
        <el-table-column  align="center" label="置顶详情图" width="120" prop="top_content_img">
          <template slot-scope="scope">
            <img v-if="scope.row.top_content_img!=''" :src="scope.row.top_content_img" alt="">
          </template>
        </el-table-column>
        <el-table-column  align="center" label="邀请图" width="120" prop="invite_img">
          <template slot-scope="scope">
            <img v-if="scope.row.invite_img!=''" :src="scope.row.invite_img" alt="">
          </template>
        </el-table-column>
        <el-table-column  align="center" label="邀请专属图" width="120" prop="invite_exclusive_img">
          <template slot-scope="scope">
            <img v-if="scope.row.invite_exclusive_img!=''" :src="scope.row.invite_exclusive_img" alt="">
          </template>
        </el-table-column>
        <el-table-column  align="center" label="标题" width="420" prop="title"></el-table-column>
        <el-table-column  align="center" label="描述"  width="500" prop="desc"></el-table-column>
        <el-table-column  align="center" label="功能按钮类型" width="140" prop="button_type"></el-table-column>
        <el-table-column  align="center" label="是否有视频链接" width="140" prop="is_video">
          <template slot-scope="scope">
            {{scope.row.is_video==1 ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column  align="center" label="视频链接" width="500" prop="video_url">
          <template slot-scope="scope">
            <a :href="scope.row.video_url" target="blank">{{scope.row.video_url}}</a>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="排序值" width="80" prop="sort"></el-table-column>
        <el-table-column  align="center" label="创建时间" width="180" prop="created_time"></el-table-column>
        <el-table-column align="center" prop="" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="small" style="color:#F56C6C" type="text" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination @current-change="handleCurrentChange"
						   :current-page="tableData.page" :page-size="tableData.pageSize"
						   layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import {
  getArticleList,
  deleteArticle,
  ajaxCategoryList,
  updateCategory,
  addCategory,
  deleteCategory
} from "@/api/robot";
export default {
  data() {
    return {
      form: {
        name: ""
      },
      form2: {
        name: ""
      },
      categoryOneData:{},
      dialogFormVisible: false,
      categoryData: [],
      tableData: [],
      loading: false,
      fy: {
        page: 1, //当前页
        page_size: 10 //每页条数
      },
      total: 0, //总条数
      pageIndex: 1,
      obj: {
        strategy_category_id: '',
        page: this.pageIndex
      },
      categoryId: ''
    }
  },
  mounted() {
    this.getList();
    this.getCategoryList();
  },
  methods: {
    handleChooseCategory(obj){
      this.obj.strategy_category_id = obj.id
      this.getList();

    },
    handleCategpry(id) {
      console.log("要删除的id", id);
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });


          deleteCategory({ id: id }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getCategoryList();
              setTimeout(() => {
                loading.close();
              }, 300);
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
    handleAdd() {
      this.dialogFormVisible = true;
      this.chooseId = 0;
    },
    handleEdit(id){
      this.$router.push({name:'教程编辑',query:{id:id}})
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
          this.chooseId ? "" : (this.form2.level = 1);
          let obj = {};
          if(this.chooseId) {
            obj.level = 1;
            obj.name = this.form2.name;
            obj.id = this.categoryOneData.id;
          }else{

              obj.level = 1;
              obj.name = this.form2.name;

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
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      getArticleList(this.obj).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
       setTimeout(() => {
          loading.close();
        }, 300);
      });
    },
    handleDel(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.loading = true;
          deleteArticle({ id: id }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getList();
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
    handleShowDialog(obj){
      this.form2.name = obj.name;
      this.categoryOneData = obj;
      this.chooseId = 1;
      this.dialogFormVisible = true;
    },
    handleCurrentChange(val) {
      this.obj.page = val;
      this.getList();
    }
  }
};
</script>
<style scoped="scoped" lang="scss">
.content{
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
img {
  width: 70px;
  height: 70px;
}
.el-table {
  margin-top: 10px;
}
.cat-label {
  cursor: pointer;
  line-height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 5px solid #ddd;
}
</style>
