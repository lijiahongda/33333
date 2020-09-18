<template>
  <div class="main">
    <div style="padding:20px">
      <div class="Setmeal">
        <div class="title"
             style>
          <div class="name">数据概览</div>
        </div>
        <div class="SetmealList"
             style="padding-bottom:30px;">
          <div class="msg">
            <div class="msg_tips">审核总人数</div>
            <div class="msg_btn">
              <div class="text">
                <span>{{tableData.applyTotalNum}}</span>
              </div>
              <!-- <div class="paiBtn">购买更多</div> -->
            </div>
          </div>

          <div class="msg">
            <div class="msg_tips">待提交</div>
            <div class="msg_btn">
              <div class="text">
                <span>{{tableData.tobesubNum}}</span>
              </div>
              <!-- <div class="paiBtn">购买更多</div> -->
            </div>
          </div>

          <div class="msg">
            <div class="msg_tips">待审核</div>
            <div class="msg_btn">
              <div class="text">
                <span>{{tableData.pendNum}}</span>
              </div>
              <!-- <div class="paiBtn">购买更多</div> -->
            </div>
          </div>

          <div class="msg">
            <div class="msg_tips">审核通过</div>
            <div class="msg_btn">
              <div class="text">
                <span>{{tableData.adoptNum}}</span>
              </div>
              <!-- <div class="paiBtn">购买更多</div> -->
            </div>
          </div>

          <div class="msg">
            <div class="msg_tips">审核拒绝</div>
            <div class="msg_btn">
              <div class="text">
                <span>{{tableData.rejectNum}}</span>
              </div>
              <!-- <div class="paiBtn">购买更多</div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="Setmeal"
           style="min-height:10px; box-sizing: border-box;padding:20px">
        <el-form ref="form"
                 label-width="120px"
                 :inline="true">
          <!-- <el-form-item label="会员手机号：">
          <el-input v-model="obj.mobile" placeholder="请输入会员手机号" clearable />
        </el-form-item>-->
          <el-form-item label="审核状态">
            <el-col>
              <el-select v-model="obj.examineStatus"
                         clearable
                         style="width:200px">
                <el-option label="未提交"
                           :value="0">未提交</el-option>
                <el-option label="待审核"
                           :value="1">待审核</el-option>
                <el-option label="审核通过"
                           :value="2">审核通过</el-option>
                <el-option label="审核拒绝"
                           :value="3">审核拒绝</el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="标签">
            <el-col>
              <el-select v-model="obj.tag_id"
                         clearable
                         style="width:200px">
                <el-option v-for="(item,index) in tags"
                           :key="index"
                           :label="item.tag_name"
                           :value="item.id">{{item.tag_name}}</el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="机器人微信号">
          <el-col>
            <el-select v-model="obj.robot_wx" clearable style="width:200px">
              <el-option
                v-for="(item,index) in wechartList"
                :key="index"
                :label="item.wx_alias"
                :value="item.wx_alias"
              >{{item.wx_alias}}</el-option>
            </el-select>
          </el-col>
        </el-form-item> -->
          <!-- <el-form-item label="编号查询">
          <el-input v-model="obj.group_number" placeholder="请输入编号" clearable style="width:200px" />
        </el-form-item> -->
          <el-form-item label="手机号">
            <el-input v-model="obj.mobile"
                      placeholder="请输入手机号"
                      clearable
                      style="width:200px" />
          </el-form-item>
          <el-form-item label="群名称">
            <el-input v-model="obj.group_name"
                      placeholder="请输入群名称"
                      clearable
                      style="width:200px" />
          </el-form-item>
          <el-form-item label="时间范围"
                        prop="starttime">
            <el-date-picker v-model="value2"
                            type="daterange"
                            value-format="yyyy-MM-dd HH:hh:mm"
                            align="right"
                            unlink-panels
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="choseDate"
                            :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="Setmeal"
           style="height:auto; box-sizing: border-box;padding:20px">
        <el-table :data="tableData.list"
                  style="width: 100%">
          <el-table-column align="center"
                           label="序号"
                           width="80"
                           prop="id"></el-table-column>
          <el-table-column align="center"
                           label="会员手机号"
                           width="180"
                           prop="mobile"></el-table-column>
          <el-table-column align="center"
                           label="标签"
                           width="180"
                           prop="tag_name"></el-table-column>
          <el-table-column align="center"
                           label="申请人"
                           width="280"
                           prop="nickname"></el-table-column>
          <el-table-column align="center"
                           label="群编号"
                           width="180"
                           prop="groupNumber"></el-table-column>
          <el-table-column align="center"
                           label="群助理微信号"
                           width="180"
                           prop="assistantWx"></el-table-column>
          <el-table-column align="center"
                           label="导师微信号"
                           width="180"
                           prop="tutorWx"></el-table-column>
          <el-table-column align="center"
                           label="群管理编号"
                           width="180"
                           prop="roomId"></el-table-column>
          <el-table-column align="center"
                           label="直推数|间推数"
                           width="180"
                           prop="directPushNum">
            <template slot-scope="scope">{{scope.row.directPushNum}}|{{scope.row.intervalPushNum}}</template>
          </el-table-column>
          <el-table-column align="center"
                           label="审核人"
                           width="180"
                           prop="examineMember"></el-table-column>
          <el-table-column align="center"
                           label="审核时间"
                           width="180"
                           prop="examineTime"></el-table-column>
          <el-table-column align="center"
                           label="审核状态"
                           width="180"
                           prop="examineStatusName"></el-table-column>
          <!-- <el-table-column align="center" label="审核次数" width="180" prop="number_req"></el-table-column> -->
          <!-- <el-table-column  align="center" label="待提交数量"  prop="tobesubNum"></el-table-column>
          <el-table-column  align="center" label="待审核数量"  prop="pendNum"></el-table-column>
          <el-table-column  align="center" label="审核通过数量"  prop="adoptNum"></el-table-column>
        <el-table-column  align="center" label="审核拒绝数量"  prop="rejectNum"></el-table-column>-->
          <el-table-column align="center"
                           prop="addtime"
                           label="记录添加时间"
                           width="180"></el-table-column>
          <el-table-column align="center"
                           prop
                           label="操作"
                           width="220"
                           fixed="right">
            id
            <template slot-scope="scope">
              <el-button v-if="scope.row.examineStatus== 1"
                         size="small"
                         type="text"
                         style="color:#E6A23C"
                         @click="handleCheck(scope.row.id,2)">通过</el-button>
              <el-button v-if="scope.row.examineStatus==1"
                         style="color:#F56C6C"
                         size="small"
                         type="text"
                         @click="handleCheck(scope.row.id,3)">拒绝</el-button>
              <el-button size="small"
                         type="text"
                         @click="handleDetail(scope.row.id)">详情</el-button>
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
                       :total="tableData.total"></el-pagination>
      </div>
      <el-dialog :title="'拒绝次数'+form.refuse_num"
                 :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <!-- <div style="">拒绝次数:{{form.refuse_num}}</div> -->
          <div style="position:absolute;top:12%;left:0;width:100%;height:50%;z-index:10;"></div>
          <el-form-item label="群编号"
                        :label-width="formLabelWidth">
            <el-input v-model="form.groupNumber"
                      type="number"></el-input>
          </el-form-item>
          <el-form-item label="群管理编号"
                        :label-width="formLabelWidth">
            <el-input v-model="form.roomId"
                      type="number"
                      autocomplete="off"
                      style="color: #333;"></el-input>
          </el-form-item>
          <el-form-item label="审核次数"
                        :label-width="formLabelWidth">
            <el-input v-model="form.number_req"
                      type="number"
                      autocomplete="off"
                      style="color: #333;"></el-input>
          </el-form-item>
          <el-form-item label="群助理微信号"
                        :label-width="formLabelWidth">
            <el-input v-model="form.assistantWx"
                      autocomplete="off"
                      style="color: #333;"></el-input>
          </el-form-item>
          <el-form-item label="导师微信号"
                        :label-width="formLabelWidth">
            <el-input v-model="form.tutorWx"
                      autocomplete="off"
                      style="color: #333;"></el-input>
          </el-form-item>
          <el-form-item :label="form.examine_fix"
                        :label-width="formLabelWidth">
            <el-input v-model="form.examineDesc"
                      autocomplete="off"
                      style="color: #333;"></el-input>
          </el-form-item>
          <el-form-item label="审核的图片路径"
                        :label-width="formLabelWidth">
            <el-image v-for="item in form.images.split(',')"
                      :key="item"
                      style="width: 100px; height: 100px"
                      :src="item"
                      :preview-src-list="form.images.split(',')"
                      fit="contain"></el-image>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- <el-pagination
        :current-page="listForm.page"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin:20px auto;text-align:center;"
        :total="pagesum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />-->
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
    <el-dialog title="提示"
               :visible.sync="ReasonShow"
               width="60%"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="120px"
               :inline="true">
        <el-form-item :label="ReasonStatus==3?'请输入驳回原因':'请输入原因'">
          <el-input v-model="ReasonValue"
                    placeholder="请输入原因"
                    clearable />
        </el-form-item>
        <el-form-item label="标签"
                      v-if="ReasonStatus!=3">
          <el-select v-model="tag_id"
                     clearable
                     style="width:200px">
            <el-option v-for="(item,index) in tags"
                       :key="index"
                       :label="item.tag_name"
                       :value="item.id">{{item.tag_name}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- <span>{{ReasonStatus==3?'请输入驳回原因':'请输入原因'}}</span> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="ReasonShow = false">取 消</el-button>
        <el-button type="primary"
                   @click="checkCommunity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ECharts from "echarts";
import { dataStatistics, userIndex, getTagData } from "@/api/robot";
import { verifyList } from "@/api/zAjax"; // 接口
import {
  getCommunityInvitationGroupList,
  checkCommunityInvitationGroup,
  getCommunityInvitationGroupInfo
} from "@/api/zAjax";
export default {
  data () {
    return {
      dialogVisible: false,
      loadingStatus: true,
      tableData: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      fy: {
        page: 1, //当前页
        page_size: 10 //每页条数
      },
      handleStatus: "",
      form: {
        images: ""
      },
      total: 0, //总条数
      pageIndex: 1,
      pageSize: 10,
      // 微信号列表
      wechartList: [],
      obj: {
        page: this.pageIndex == undefined ? 1 : this.pageIndex,
        pageSize: this.pageSize == undefined ? 10 : this.pageSize,
        startTime: '',
        endTime: '',
        group_name: '',
        mobile: ''
      },
      value2: '',
      ReasonShow: false,
      tag_id: 0,
      tags: [],
      RowId: '',
      ReasonStatus: '',
      ReasonValue: '',
      pickerOptions: {
        shortcuts: [
          {
            text: "今日",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "昨日",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近半个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
    };
  },
  mounted () {
    this.getList(this.obj);
    this.userIndex();
    this.getTagData()
  },
  methods: {
    // 获取标签列表
    getTagData () {
      getTagData({}).then(res => {
        this.tags = res.data.data
        this.tags.unshift({ id: 0, tag_name: "无" })
        console.log(res)
      })
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
    addConfig () {
      this.dialogFormVisible = true;
      this.handleStatus = 1;
    },
    // 选择时间
    choseDate (e) {
      var st = e[0].replace(/-/g, "/")
      var ed = e[1].replace(/-/g, "/")
      var start = new Date(st);
      var end = new Date(ed);
      // this.listForm.page=1
      this.obj.startTime = start.getTime() / 1000;
      this.obj.endTime = end.getTime() / 1000;
    },
    onSearch () {
      this.obj.page = 1;
      this.obj.pageSize = 10;
      var data = this.clone(this.obj)
      // var startTime=new Date(data.startTime)
      // var endTime=new Date(data.endTime)
      // data.startTime=startTime.getTime()/1000
      // data.endTime=endTime.getTime()/1000
      // this.loadingStatus = true;
      this.getList(data);
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
    handleCheck (id, status) {
      this.RowId = id
      this.ReasonStatus = status
      this.ReasonShow = true
      // this.$prompt("请输入原因", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消"
      // })
      //   .then(({ value }) => {
      //     if (status == 3 && !value) {
      //       this.$message.warning("请输入驳回原因");
      //       return false;
      //     }
      //     checkCommunityInvitationGroup({
      //       id: id,
      //       examineStatus: status,
      //       examineDesc: value
      //     }).then(res => {
      //       if (res.data.code == 200) {
      //         this.$message.success(res.data.msg);
      //         this.getList();
      //       } else {
      //         this.$message.error(res.data.msg || "数据加载失败,请检查网络");
      //       }
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "取消输入"
      //     });
      //   });
    },
    checkCommunity () {
      checkCommunityInvitationGroup({
        id: this.RowId,
        examineStatus: this.ReasonStatus,
        examineDesc: this.ReasonValue,
        tag_id: this.tag_id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.ReasonShow = false
          this.getList(this.obj);
          this.ReasonValue = ''
        } else {
          this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        }
      });
    },
    getList (d) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      console.log(d);
      getCommunityInvitationGroupList(d).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          this.wechartList = res.data.data.robotAlias;
          this.tableData = res.data.data;
          this.total = res.data.data.totalCount;
          this.loadingStatus = false;
        } else {
          this.loadingStatus = false;
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
          return;
        }
      });
    },
    handleDetail (id) {
      getCommunityInvitationGroupInfo({ id: id }).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data;
          this.dialogFormVisible = true;
        } else {
          this.$message.error(res.data.message || "数据加载失败,请检查网络");
        }
      });
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      var data = this.clone(this.obj)
      var startTime = new Date(data.startTime)
      var endTime = new Date(data.endTime)
      data.startTime = startTime.getTime() / 1000
      data.endTime = endTime.getTime() / 1000
      this.getList(data);
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
