<template>
  <div class="content">
    <div class="Setmeal">
      <el-form ref="form"
               label-width="120px"
               :inline="true">
        <div>
          <el-form-item label="是否定时">
            <el-select v-model="obj.isTimingSend"
                       clearable
                       style="width:200px;">
              <el-option label="非定时"
                         value="0"></el-option>
              <el-option label="定时"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送状态">
            <el-select v-model="obj.sendStatus"
                       clearable
                       style="width:200px;">
              <el-option label="不发送"
                         value="0"></el-option>
              <el-option label="发送中"
                         value="1"></el-option>
              <el-option label="已发送"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员   工">
            <el-select v-model="obj.userId"
                       clearable
                       style="width:200px;">
              <el-option :label="item.userName"
                         :value="item.userId"
                         v-for="(item,index) in tableData.searchList"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="开始时间">
            <el-date-picker v-model="obj.sendStartTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始时间"
                            clearable
                            style="width:200px;" />
          </el-form-item>
          <el-form-item label="结束时间"
                        prop="endtime">
            <el-date-picker v-model="obj.sendEndTime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="结束时间"
                            clearable
                            style="width:200px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSearch">搜索</el-button>
            <router-link to="/material/edit">
              <el-button type="primary">新增素材</el-button>
            </router-link>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- <div class="Setmeal">
      <div class="masonry">
        <div v-if="tableData.list==''"
             style="text-align:center;width:100%;position:absolute;color:#999;font-size:14px;">暂无数据</div>
        <div class="item"
             v-for="item in tableData.list"
             :key="item[0].randomStr">
          <div class="item_content content-lar">
            <p>{{item[0].robotSendStatus}}</p>
            <p style="font-size: 12px;display: flex;justify-content: space-between;color: #666;">
              <span>是否要发送:{{item[0].isSend}}</span>
              <span>{{item[0].createdAt}}</span>
            </p>
            <p v-if="item[0].type === '图片'"
               style="text-align: center">
              <el-image fit="contain"
                        :src="item[0].content"></el-image>
            </p>
            <p v-if="item[0].type === '视频'">
              <video id="video"
                     style="margin: 0 auto;width: 100%;"
                     height="400"
                     :src="item[0].content"
                     controls="controls">您的浏览器不支持视频</video>
            </p>
            <div v-if="item[0].type === '文本'">
              <p>内容：{{item[0].content}}</p>
              <p style="word-break: break-all;">短链：{{item[0].shortUrl}}</p>
            </div>
            <div v-if="item[0].type === '链接'">
              <div>
                <pre>{{item[0].content}}</pre>
              </div>
            </div>
            <span style="font-size: 12px;">{{item[0].type}}</span>
            <span style="font-size: 12px;">{{item[0].sendNum}}</span>
            <span style="font-size: 12px;color:red;"> {{item[0].sentby}}
              <img style="width:10px;height:10px;"
                   src="./admin.png" />
            </span>
          </div>
          <el-button size="mini"
                     icon="el-icon-edit"
                     style="display: block;height: 3em;position: absolute;bottom: 0;width: 100%;border: none;border-top: 1px solid #ccc;border-radius: 0;background: #f9f9f9;"
                     @click="handleEdit(item[0].randomStr)">编辑</el-button>
        </div>
      </div>
    </div> -->
    <div class="new_tab"
         v-loading="loading">
      <el-table :data="tableData.list"
                :fit="true"
                border
                style="width: 100%;">

        <el-table-column prop=""
                         label="序号"
                         align="center">
          <template slot-scope="scope">
            {{scope.row[0].key}}
          </template>
        </el-table-column>
        <el-table-column prop=""
                         label="内容"
                         width="400"
                         align="center">
          <template slot-scope="scope">
            <img v-if="scope.row[0].type == '图片'"
                 width="100px"
                 height="100px"
                 :src="scope.row[0].content">
            <video v-if="scope.row[0].type == '视频'"
                   id="video"
                   style="margin: 0 auto;"
                   height="100px"
                   :src="scope.row[0].content"
                   controls="controls">您的浏览器不支持视频</video>
            <div v-if="scope.row[0].type === '文本'">

              <p>内容：{{scope.row[0].content}}</p>
              <p style="word-break: break-all;">短链：{{scope.row[0].shortUrl}}</p>
            </div>
            <div v-if="scope.row[0].type === '优惠券'">

              <p>{{scope.row[0].content}}</p>
            </div>
            <div v-if="scope.row[0].type === '链接'">
              <pre>{{scope.row[0].content}}</pre>
            </div>

          </template>
        </el-table-column>

        <el-table-column prop=""
                         label="标题"
                         align="center">
          <template slot-scope="scope">
            {{scope.row[0].robotSendStatus}}
          </template>
        </el-table-column>
        <el-table-column prop=""
                         label="是否要发送"
                         align="center">
          <template slot-scope="scope">
            {{scope.row[0].isSend}}
          </template>
        </el-table-column>
        <el-table-column prop=""
                         label="操作时间"
                         align="center">
          <template slot-scope="scope">
            {{scope.row[0].createdAt}}
          </template>
        </el-table-column>

        <el-table-column prop=""
                         label="发送时间"
                         align="center">
          <template slot-scope="scope">
            <span v-if="scope.row[0].timing_time == ''">
              {{scope.row[0].createdAt}}
            </span>
            <span v-else>
              {{scope.row[0].timing_time}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop=""
                         label="类型"
                         align="center">
          <template slot-scope="scope">
            {{scope.row[0].type}}
          </template>
        </el-table-column>
        <el-table-column prop=""
                         label="已发送"
                         align="center">
          <template slot-scope="scope">
            {{scope.row[0].sendNum}}
          </template>
        </el-table-column>
        <el-table-column prop=""
                         label="操作人"
                         align="center">
          <template slot-scope="scope">
            {{scope.row[0].sentby}}
          </template>
        </el-table-column>

        <el-table-column prop=""
                         label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row[0].randomStr)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :current-page="tableData.page"
                     :page-sizes="[10, 20]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"></el-pagination>
    </div>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               style="text-align: center"
               :before-close="handleClose">
      <img src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-20/20/yuelvhuiFyCYadTvN21587384490.jpg"
           alt />
      <h1>套餐购买提醒</h1>
      <span>您还未购买套餐或购买的套餐已过期，无法使用系统功能，请前往购买。</span>
      <span slot="footer"
            class="dialog-footer">
        <router-link to="/buy/buy">
          <el-button type="primary">去购买</el-button>
        </router-link>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { materialList, delMaterial, userIndex } from "@/api/robot";
export default {
  data () {
    return {
      buyStatus: "",
      dialogVisible: false,
      tableData: [],
      fy: {
        page: 1, //当前页
        page_size: 10 //每页条数
      },
      total: 0, //总条数
      pageIndex: 1,
      obj: {
        page: this.pageIndex == undefined ? 1 : this.pageIndex,
        pageSize: 10,
        mid: JSON.parse(localStorage.getItem("userInfo")).mid,
        sendStartTime: '',
        sendEndTime: ''
      },
      userList: [],
      loading: false
    };
  },
  mounted () {
    this.getList();
    this.userIndex();
  },
  methods: {
    onSearch () {
      this.obj.page = 1;
      this.getList(this.obj);
    },
    handleClose () {
      this.dialogVisible = false;
    },
    userIndex () {
      userIndex().then(res => {
        if (res.data.code == 200) {
          this.buyStatus = res.data.data.buyStatus;
          if (!this.buyStatus) {
            this.dialogVisible = true;
          }
        } else {
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
      });
    },
    getList () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      materialList(this.obj).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
      });
    },
    handleEdit (randomStr) {
      this.$router.push({
        path: "/material/edit",
        query: {
          randomStr: randomStr
        }
      });
    },
    handleDel (id) {
      this.$confirm("是否继续删除该消息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delMaterial({
            id: id,
            mid: JSON.parse(localStorage.getItem("userInfo")).mid
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getList();
            } else {
              this.$message.error(res.data.msg || "数据加载失败,请检查网络");
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

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.obj.pageSize = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList();
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
.masonry {
  -moz-column-count: 4; /* Firefox */
  -webkit-column-count: 4; /* Safari 和 Chrome */
  column-count: 4;
  -moz-column-gap: 2em;
  -webkit-column-gap: 2em;
  column-gap: 2em;
  width: 80%;
  margin: 2em auto;
  position: relative;
}
.masonry .item {
  padding: 1em 0 2em;
  margin-bottom: 2em;
  -moz-page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
  border: 1px solid #ccc;
  position: relative;
}
.content-lar {
  padding: 0 1em 1em;
}
@media screen and (max-width: 800px) {
  .masonry {
    column-count: 3; // two columns on larger phones
  }
}
@media screen and (max-width: 500px) {
  .masonry {
    column-count: 2; // two columns on larger phones
  }
}
.dialog-footer {
  text-align: center;
  display: block;
  margin: 0 auto;
}
</style>
