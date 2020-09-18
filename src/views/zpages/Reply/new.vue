<template>
  <div class="main">
    <div style="padding:20px">
      <div class="Setmeal"
           style="min-height:10px; box-sizing: border-box;padding:20px">
        <el-form ref="form"
                 label-width="90px"
                 :inline="true">
          <el-form-item label>
            <el-button type="primary"
                       @click="handleCheck('add')">新增</el-button>
          </el-form-item>
          <div></div>
          <el-form-item label="编辑问候语">
            <el-input v-model="content"
                      placeholder="请输入问候语"
                      clearable
                      style="width:600px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="addIntoGroupGreetingInfo()">保存</el-button>
            <el-button type="primary"
                       @click="tagCtrl()">更新并应用到群</el-button>
          </el-form-item>
          <div></div>
          <!-- <el-form-item label="回复列表">
            <el-select v-model="obj.style" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>

      <div class="Setmeal"
           style="height:auto; box-sizing: border-box;padding:20px">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column align="center"
                           label="序号"
                           width="80"
                           prop="id"></el-table-column>
          <el-table-column align="center"
                           label="标题"
                           prop="title"
                           width="220"></el-table-column>
          <el-table-column align="center"
                           prop
                           label="内容"
                           width="480">
            <template slot-scope="scope">
              <div v-if="scope.row.type==1">
                {{scope.row.content}}
              </div>
              <div v-if="scope.row.type==2">
                <a :href="scope.row.content"
                   target="blank">{{scope.row.content}}</a>
              </div>
              <div v-if="scope.row.type==3">
                <a :href="scope.row.content"
                   target="blank">{{scope.row.content}}</a>
              </div>
              <div v-if="scope.row.type==4">
                <a :href="scope.row.content"
                   target="blank">{{scope.row.content}}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop
                           label="类型"
                           width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.type==1">
                文本
              </div>
              <div v-if="scope.row.type==2">
                图文
              </div>
              <div v-if="scope.row.type==3">
                视频
              </div>
              <div v-if="scope.row.type==4">
                文件
              </div>
            </template>
          </el-table-column>

          <el-table-column align="center"
                           prop
                           label="回复类型">
            <template slot-scope="scope">
              <div v-if="scope.row.reply_address==0">
                群内回复
              </div>
              <div v-if="scope.row.reply_address==1">
                好友回复
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop
                           label="操作"
                           width="220"
                           fixed="right">
            <template slot-scope="scope">
              <el-button size="small"
                         type="text"
                         style="color:#  E6A23C"
                         @click="handleCheck('edit',scope.row)">编辑</el-button>
              <el-button style="color:#F56C6C"
                         size="small"
                         type="text"
                         @click="handleCheckDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container"
           style="text-align:right;">
        <el-pagination @current-change="handleCurrentChange"
                       :page-size="obj.pageSize"
                       :current-page="obj.page"
                       layout="total, prev, pager, next, jumper"
                       :total="total"></el-pagination>
      </div>
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
    <!-- 标签弹窗 -->
    <el-dialog title
               :visible.sync="ReasonShow"
               width="60%"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="120px"
               :inline="true">
        <el-form-item label>
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item.id"
                         :value="item.id"
                         v-for="(item,index) in taglist"
                         :key="index">{{item.tag_name}}</el-checkbox>
            <!-- <el-checkbox label="复选框 B"></el-checkbox> -->
            <!-- <el-checkbox label="复选框 C"></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <!-- <span>{{ReasonStatus==3?'请输入驳回原因':'请输入原因'}}</span> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="ReasonShow = false">取 消</el-button>
        <el-button type="primary"
                   @click="checkCommunity">保存</el-button>
      </span>
    </el-dialog>
    <!-- 新增修改 -->
    <el-dialog title
               :visible.sync="ListShow"
               width="40%"
               :before-close="listhandleClose">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="回复类型"
                      prop="reply_address">
          <el-radio-group v-model="ruleForm.reply_address">
            <el-radio :label="item.id"
                      :value="item.id"
                      v-for="(item,index) in replyList"
                      :key="index">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="ruleForm.reply_address == 0"
                      label="标签"
                      prop="tag_id">
          <el-select v-model="ruleForm.tag_id"
                     multiple
                     placeholder="请选择标签">
            <el-option :label="item.tag_name"
                       :value="item.id"
                       v-for="(item,index) in taglist"
                       :key="index">{{item.tag_name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机器人"
                      v-if="ruleForm.reply_address == 1"
                      prop="robot_id">
          <el-select v-model="ruleForm.robot_id"
                     multiple
                     placeholder="请选择机器人">
            <el-option :label="item.wx_name"
                       :value="item.wxid"
                       v-for="(item,index) in tagRobotlist"
                       :key="index">{{item.wx_name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型"
                      prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="item.id"
                      :value="item.id"
                      v-for="(item,index) in typeList"
                      :key="index">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容"
                      prop="content"
                      v-if="ruleForm.type == 1">
          <el-input type="textarea"
                    v-model="ruleForm.content"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.type == 2"
                      label="图片">
          <el-upload class="avatar-uploader"
                     action="https://api2.yuelvhui.com/app/third/upload"
                     :show-file-list="false"
                     :on-success="res=>{ruleForm.content = res.url}"
                     :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.content"
                 :src="ruleForm.content"
                 style="width:100%;"
                 class="avatar" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="ruleForm.type == 3"
                      label="视频">
          <el-upload class="avatar-uploader"
                     action="https://api2.yuelvhui.com/app/third/uploadVideo"
                     :show-file-list="false"
                     :before-upload="beforeUploadVideo"
                     :on-success="res=>{ruleForm.content = res.url}">
            <img style="width:100%;"
                 v-if="ruleForm.content"
                 src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-08/21/yuelvhuizprWwRkYss1586352852.jpg"
                 class="avatar" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-button v-if="ruleForm.content"
                     type="primary"
                     @click="videoPlay(ruleForm.content)">点击查看</el-button>
        </el-form-item>

        <el-form-item v-if="ruleForm.type == 4"
                      label="文件">
          <el-upload class="avatar-uploader"
                     action="https://api2.yuelvhui.com/app/third/upload"
                     :show-file-list="false"
                     :on-success="res=>{ruleForm.content = res.url}">
            <img style="width:100%;"
                 v-if="ruleForm.content"
                 src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-08/21/yuelvhuizprWwRkYss1586352852.jpg"
                 class="avatar" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-button v-if="ruleForm.content"
                     type="primary"
                     @click="videoPlay(ruleForm.content)">点击查看</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="listhandleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import ECharts from "echarts";
import {
  dataStatistics,
  userIndex,
  getGroupTagList,
  intoGroupReplyStyleList,
  intoGroupReplyList,
  addIntoGroupReply,
  updateIntoGroupReply,
  deleteIntoGroupReply,
  intoGroupReplyTypeList,
  updateIntoGroupReplyTag,
  addIntoGroupGreetingInfo,
  getIntoGroupGreetingInfo,
  getFriendRobotList
} from "@/api/robot";
import { verifyList } from "@/api/zAjax"; // 接口
import {
  getCommunityInvitationGroupList,
  checkCommunityInvitationGroup,
  getCommunityInvitationGroupInfo
} from "@/api/zAjax";
export default {
  data () {
    return {
      content: '',
      dialogVisible: false,
      loadingStatus: true,
      tableData: [],
      total: 0, //总条数
      pageIndex: 1,
      pageSize: 10,
      // 微信号列表
      wechartList: [],
      obj: {
        page: this.pageIndex == undefined ? 1 : this.pageIndex,
        pageSize: this.pageSize == undefined ? 10 : this.pageSize,
      },
      ReasonShow: false,
      checkList: [],
      // 标签列表
      taglist: [],
      tagRobotlist: [],
      // 回复列表
      options: [],
      typeList: [],
      replyList: [{
        id: 0,
        name: '群内回复'
      }, {
        id: 1,
        name: '加好友回复'
      }],
      // 信息对象
      ruleForm: {
        id: "",
        title: "",
        type: "",
        tag_id: [],
        robot_id: [],
        content: "",
        reply_address: 0
      },
      rules: {
        title: [{ required: true, message: "请输入回复标题", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        robot_id: [{ required: true, message: "请选择类型", trigger: "change" }],
        tag_id: [
          {
            required: true,
            message: "请选择标签",
            trigger: "change"
          }
        ],
        content: [
          {
            type: "date",
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      },
      // 信息弹窗
      ListShow: false,
    };
  },
  mounted () {
    this.getList();
    this.userIndex();
    this.getGroupTagList();
    this.getRobotTagList();
    // this.intoGroupReplyStyleList()
    this.intoGroupReplyTypeList();
    this.getIntoGroupGreetingInfo()
  },
  methods: {
    // 问候语
    addIntoGroupGreetingInfo () {
      addIntoGroupGreetingInfo({ content: this.content }).then(res => {
        this.$message(res.data.msg)
      })
    },
    // 问候语获取
    getIntoGroupGreetingInfo () {
      getIntoGroupGreetingInfo({}).then(res => {
        this.content = res.data.data.greetingInfo.content
      })
    },
    // 标签更新保存
    checkCommunity () {
      updateIntoGroupReplyTag({ tag_id: this.checkList }).then(res => {
        this.$message(res.data.msg)
      })
    },
    // 查看视频
    videoPlay (url) {
      location.href = url;
    },
    // 获取类型
    intoGroupReplyTypeList () {
      intoGroupReplyTypeList({}).then(res => {
        this.typeList = res.data.data;
        console.log(res);
      });
    },
    // 图片上传前的检查
    beforeAvatarUpload (file) {
      if (file.size / 1024 / 1024 > 1) {
        this.$message({
          message: "图片请保持在1M以内",
          type: "error"
        });
        return false;
      }
    },
    //上传前回调
    beforeUploadVideo (file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      console.log(file.type, "filetype");
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      }
    },
    // 标签弹窗显示
    tagCtrl () {
      this.ReasonShow = true;
    },
    // 回复列表
    intoGroupReplyStyleList () {
      intoGroupReplyStyleList({}).then(res => {
        console.log(res);
        this.options = res.data.data;
      });
    },
    // 获取标签
    getGroupTagList () {
      getGroupTagList({ page: 1, pageSize: 1000 }).then(res => {
        console.log(res);
        this.taglist = res.data.data.list;
      });
    },
    // 获取机器人
    getRobotTagList () {
      getFriendRobotList({ page: 1, pageSize: 1000 }).then(res => {
        console.log(res);
        this.tagRobotlist = res.data.data.list;
      });
    },
    listhandleClose () {
      this.ListShow = false;
    },
    handleClose () {
      this.ReasonShow = false;
    },
    // 验证是否购买
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
    // 搜索
    onSearch () {
      this.obj.page = 1;
      this.obj.pageSize = 10;
      this.loadingStatus = true;
      this.getList(this.obj);
    },
    // 删除
    handleCheckDel (e) {
      this.$confirm("此操作将永久删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          deleteIntoGroupReply({ id: e.id }).then(res => {
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑
    handleCheck (type, e) {
      this.ListShow = true;
      if (type == "edit") {
        this.ruleForm = e;
        if (this.ruleForm.reply_address == 0) {
          this.ruleForm.tag_id = e.tag_id.toString().split(',').map(Number)
        } else {
          this.ruleForm.robot_id = e.robot_id.split(',')
        }
      } else {
        this.ruleForm = {
          id: "",
          title: "",
          type: "",
          tag_id: [],
          robot_id: [],
          content: "",
          reply_address: 0
        }
      }
    },
    // 获取列表
    getList () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      console.log(this.obj);
      intoGroupReplyList(this.obj).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        // this.wechartList = res.data.data.robotAlias;
        this.tableData = res.data.data.data;
        this.total = res.data.data.total;
        this.loadingStatus = false;
        // this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        return;
      });
    },
    // 防止变量被污染
    clone (Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = [];
        var i = Obj.length;
        while (i--) {
          buf[i] = this.clone(Obj[i]);
        }
        return buf;
      }
      else if (Obj instanceof Object) {
        buf = {};
        for (var k in Obj) {
          buf[k] = this.clone(Obj[k]);
        }
        return buf;
      } else {
        return Obj;
      }
    },
    submitForm (formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      if (this.ruleForm.id == "") {
        var ruleForm = this.clone(this.ruleForm)
        if (ruleForm.reply_address == 0) {
          ruleForm.robot_id = []
          ruleForm.tag_id = ruleForm.tag_id.join(',')
        } else {
          ruleForm.tag_id = []
          ruleForm.robot_id = ruleForm.robot_id.join(',')
        }
        console.log(ruleForm, 'ruleForm')
        addIntoGroupReply(ruleForm).then(res => {
          this.$message(res.data.msg || "数据加载失败,请检查网络");
          this.getList();
          this.ListShow = false;
        });
      } else {
        var ruleForm = {
          id: this.clone(this.ruleForm).id,
          title: this.clone(this.ruleForm).title,
          type: this.clone(this.ruleForm).type,
          tag_id: this.clone(this.ruleForm).tag_id,
          robot_id: this.clone(this.ruleForm).robot_id,
          content: this.clone(this.ruleForm).content,
          reply_address: this.clone(this.ruleForm).reply_address
        }
        if (ruleForm.reply_address == 0) {
          ruleForm.robot_id = []
          ruleForm.tag_id = ruleForm.tag_id.join(',')
        } else {
          ruleForm.tag_id = []
          ruleForm.robot_id = ruleForm.robot_id.join(',')
        }
        updateIntoGroupReply(ruleForm).then(res => {
          this.$message(res.data.msg || "数据加载失败,请检查网络");
          this.getList();
          this.ListShow = false;
        });
      }
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f8f8f8;
  .Setmeal {
    width: 100%;
    min-height: 220px;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
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
