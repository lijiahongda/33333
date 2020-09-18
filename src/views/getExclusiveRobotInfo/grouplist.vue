<template>
  <div class="content"
       @click="showDownload">
    <!-- <el-button type="primary" @click="back()" style="margin-bottom:20px;">返回</el-button> -->

    <!-- <el-select v-model="listForm.mid" filterable placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.mid"
            :label="item.mid"
            :value="item.name">
            {{item.name}}
          </el-option>
        </el-select> -->

    <div class="Setmeal">
      <el-form ref="form"
               label-width="120px"
               :inline="true">
        <div>
          <el-form-item label="群名称：">
            <el-input v-model="obj.name"
                      placeholder="请输入群名称"
                      clearable
                      style="width:200px" />
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="obj.phone"
                      placeholder="请输入手机号"
                      clearable
                      style="width:200px" />
          </el-form-item>
          <el-form-item label="选择管理员">
            <el-select v-model="obj.mid"
                       clearable
                       filterable
                       placeholder="请选择管理员"
                       style="margin-right:10px;width:200px">
              <el-option v-for="item in userList"
                         :key="item.mid"
                         :label="item.name"
                         :value="item.mid">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="obj.tag_id"
                       clearable
                       style="width:200px">
              <el-option v-for="(item,index) in tags"
                         :key="index"
                         :label="item.tag_name"
                         :value="item.id">{{item.tag_name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询类型">
            <el-select v-model="obj.timeType"
                       clearable
                       style="width:200px">
              <el-option label="群创建时间"
                         value="group">群创建时间</el-option>
              <el-option label="下单时间"
                         value="order">下单时间</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机器人:">
            <el-select v-model="obj.wx_alias"
                       clearable
                       style="width:200px">
              <el-option v-for="(item,index) in tableData.wx_alias"
                         :key="index"
                         :label="item.wx_name"
                         :value="item.wx_alias">{{item.wx_name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否存在订单:">
            <el-select v-model="obj.haveOrder"
                       clearable
                       style="width:200px">
              <el-option label="是"
                         :value="1">是</el-option>
              <el-option label="否"
                         :value="2">否</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否绑定群主:">
            <el-select v-model="obj.isBingGroupLeader"
                       clearable
                       style="width:200px">
              <el-option label="是"
                         :value="1">是</el-option>
              <el-option label="否"
                         :value="2">否</el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="开始时间"
                        prop="starttime">
            <el-date-picker v-model="obj.beginTime"
                            type="date"
                            value-format="yyyy/MM/dd"
                            placeholder="开始时间"
                            clearable
                            style="width:200px" />
          </el-form-item>
          <el-form-item label="结束时间"
                        prop="endtime">
            <el-date-picker v-model="obj.endTime"
                            type="date"
                            format="yyyy/MM/dd"
                            value-format="yyyy/MM/dd"
                            placeholder="结束时间"
                            clearable
                            style="width:200px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSearch">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       v-if="showButton>=5"
                       @click="downLoadEx">下载ex</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="Setmeal">
      <el-table :data="tableData.data"
                style="width: 100%"
                @sort-change="sortChange">
        <el-table-column align="center"
                         label="序号"
                         width="80"
                         prop="num"></el-table-column>
        <el-table-column align="center"
                         label="群名称"
                         width="320"
                         prop="name"></el-table-column>
        <el-table-column align="center"
                         label="标签"
                         width="320"
                         prop="name">
          <template slot-scope="scope">
            <el-select v-model="scope.row.tag_id"
                       clearable
                       style="width:200px"
                       @change="scropeChange(scope.row.tag_id,scope.row.id)">
              <el-option v-for="(item,index) in tags"
                         :key="index"
                         :label="item.tag_name"
                         :value="item.id">{{item.tag_name}}</el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="机器人昵称"
                         width="220"
                         prop="wx_alias"></el-table-column>
        <el-table-column align="center"
                         label="有效订单"
                         width="120"
                         prop="orderNum"
                         sortable="custom"></el-table-column>
        <el-table-column align="center"
                         label="Gmv"
                         width="120"
                         prop="orderAmount"
                         sortable="custom"></el-table-column>
        <!-- <el-table-column align="center"  label="浏览次数" width="80" prop="browseGoodsNum"></el-table-column> -->
        <!-- <el-table-column align="center"  label="预估返佣" width="120" prop="rebate"></el-table-column> -->
        <el-table-column align="center"
                         label="当前群成员数量"
                         width="170"
                         prop="groupMemberNum"
                         sortable="custom"></el-table-column>
        <!-- <el-table-column align="center"  label="机器人编码" prop="robotCode"></el-table-column> -->
        <el-table-column align="center"
                         label="消费返佣"
                         prop="groupCommission"
                         width="140"
                         sortable="custom"></el-table-column>
        <el-table-column align="center"
                         label="男性占比"
                         prop="groupManProportion"></el-table-column>
        <el-table-column align="center"
                         label="女性占比"
                         prop="groupWomenProportion"></el-table-column>

        <el-table-column align="center"
                         label="消息数量"
                         prop="messageTotalNum"></el-table-column>
        <el-table-column align="center"
                         label="素材条数"
                         prop="fodderTotalNum"></el-table-column>
        <el-table-column align="center"
                         label="链接点击量"
                         width="140"
                         prop="clickTotalNum"></el-table-column>
        <!-- <el-table-column align="center"  label="激活状态"  prop="robotStatus"></el-table-column> -->
        <el-table-column prop="adminName"
                         label="管理员"
                         width="180"
                         align="center"></el-table-column>
        <el-table-column prop="mobile"
                         label="群主手机号"
                         width="180"
                         align="center"></el-table-column>
        <!-- <el-table-column align="center"  label="机器人状态" width="140" prop="deleted_at"></el-table-column> -->
        <el-table-column prop="status"
                         label="激活状态"
                         align="center"
                         width="140">
          <template slot-scope="scope">
            <el-button size="small"
                       type="text"
                       @click="statusChange(scope.row)">{{scope.row.robotStatus}}</el-button>
            <!-- <el-button size="small" type="text" @click="handleLookUser(scope.row)">查看群成员</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="操作"
                         fixed="right"
                         align="center"
                         width="220">
          <template slot-scope="scope">
            <el-button size="small"
                       type="text"
                       @click="handleCheck(scope.row)">查看详情</el-button>
            <el-button size="small"
                       type="text"
                       @click="handleLookUser(scope.row)">查看群成员</el-button>
            <el-button size="small"
                       type="text"
                       @click="bindGroup(scope.row)"
                       v-if="scope.row.band_group!=''">{{scope.row.band_group}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="obj.page"
                     :page-size="tableData.per_page"
                     layout="total, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               style="text-align: center"
               :before-close="handleClose">
      <img src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-20/20/yuelvhuiFyCYadTvN21587384490.jpg"
           alt="">
      <h1>套餐购买提醒</h1>
      <span>您还未购买套餐或购买的套餐已过期，无法使用系统功能，请前往购买。</span>
      <span slot="footer"
            class="dialog-footer">
        <router-link to="/buy/buy">
          <el-button type="primary">去购买</el-button>
        </router-link>
      </span>
    </el-dialog>

    <el-dialog title=""
               :visible.sync="bindgroupShow"
               width="70%"
               style="text-align: center"
               :before-close="handleClosebindGroup">

      <el-table :data="bindgroupInfo"
                style="width: 100%">
        <el-table-column prop="name"
                         label="群名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="手机号"
                         width="180">
        </el-table-column>
        <el-table-column prop="truename"
                         label="姓名"
                         width="180">
        </el-table-column>
        <el-table-column prop="nickname"
                         width="180"
                         label="昵称">
        </el-table-column>
        <el-table-column prop="code_number"
                         width="180"
                         label="邀请码">
        </el-table-column>
        <el-table-column prop="mid"
                         width="180"
                         label="用户标识">
        </el-table-column>
      </el-table>

      <el-input placeholder="请输入手机号"
                v-model="groupPhone"
                style="margin-top:20px;margin-bottom:20px;width:200px;"
                clearable>
      </el-input>

      <el-button type="primary"
                 @click="getgrouplist">搜索</el-button>

      <el-table :data="groupPhoneList"
                style="width: 100%">
        <el-table-column prop="mobile"
                         label="手机号"
                         width="180">
        </el-table-column>
        <el-table-column prop="truename"
                         label="姓名"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         width="180"
                         label="昵称">
        </el-table-column>
        <el-table-column prop="code_number"
                         width="180"
                         label="邀请码">
        </el-table-column>
        <el-table-column prop="mid"
                         width="180"
                         label="用户标识">
        </el-table-column>
      </el-table>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="bindgroupShow=false">返回</el-button>
        <el-button type="primary"
                   @click="groupupdate">更新</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userIndex, getTagData, changeGroupTag, changeGroupRobotStatus, groupMaster, getMemInfoByMobile, bindGroupMid } from '@/api/robot'
import {
  adminIndex,
  admindataStatistics,
  adminIndexGraph,
  getRobotInfo,
  getUserListByName
} from "@/api/zAjax"; // 接口

import { dataStatistics } from "@/api/getExclusiveRobotInfo";
export default {
  name: 'dataCollect',
  data () {
    return {
      groupPhoneList: [],
      groupPhone: '',
      bindgroupShow: false,
      buyStatus: '',
      dialogVisible: false,
      tableData: [],
      fy: {
        page: 1, //当前页
        page_size: 10, //每页条数
      },
      total: 0, //总条数
      pageIndex: 1,
      obj: {
        page: this.pageIndex,
        mid: '',
        keyword: '',
        orderNum: '',
        orderAmount: '',
        groupMid: ''
      },
      userList: [],
      tags: [],
      bindgroupInfo: [],
      tableId: '',
      showButton: 0
    }
  },
  mounted () {
    if (this.$route.query.groupMid) {
      this.obj.groupMid = this.$route.query.groupMid;
    }
    this.getList()
    this.getUserListByName()
    this.userIndex()
    this.getTagData()
  },
  methods: {
    // 下载ex
    downLoadEx () {
      var mainData = []
      var mHeader = ['序号', '群名称', '标签', '机器人昵称', '有效订单', 'GMV', '当前群成员数量', '消费返佣', '男性占比', '女性占比', '管理员', '激活状态']
      var mData = ['num', 'name', 'tag_name', 'wx_alias', 'orderNum', 'orderAmount', 'groupMemberNum', 'groupCommission', 'groupManProportion', 'groupWomenProportion', 'adminName', 'robotStatus']
      var userRData = []
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let obj = {
        ...this.obj
      }
      obj.beginTime = this.obj.beginTime ? new Date(this.obj.beginTime).getTime() / 1000 : ''
      obj.endTime = this.obj.endTime ? new Date(this.obj.endTime).getTime() / 1000 : ''
      obj.pageSize = 15
      dataStatistics(obj).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 300);
        console.log(res.data.data)
        var list = res.data.data.data
        console.log(list)
        for (let i in list) {
          var data = {
            num: list[i].num,
            name: list[i].name,
            tag_name: list[i].tag_name,
            wx_alias: list[i].wx_alias,
            orderNum: list[i].orderNum,
            orderAmount: list[i].orderAmount,
            groupMemberNum: list[i].groupMemberNum,
            groupCommission: list[i].groupCommission,
            groupManProportion: list[i].groupManProportion,
            groupWomenProportion: list[i].groupWomenProportion,
            adminName: list[i].adminName,
            robotStatus: list[i].robotStatus,
          }
          mainData.push(data)
        }
        this.json2excel(mainData, mHeader, mData);
      })
    },
    // tableJson 导出数据 ; filenames导出表的名字; autowidth表格宽度自动 true or false; bookTypes xlsx & csv & txt
    json2excel (tableJson, header, filter) {
      var that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("@/vendor/Export2Excel");
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = header; // 导出的excel表头名信息
        const filterVal = filter; // 导出的excel表头字段名，需要导出表格字段名
        const list = tableJson;
        const data = that.formatJson(filter, tableJson);

        export_json_to_excel(tHeader, data, "群统计"); // 导出的表格名称，根据需要自己命名
      });
    },
    //格式转换，直接复制即可,不需要修改什么
    formatJson (filterVal, jsonData) {
      console.log(jsonData)
      console.log(filterVal)
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 显示下载按钮
    showDownload (e) {
      var pageX = e.pageX;
      var pageY = e.pageY;
      if (pageX < 100 && pageY < 100) {
        this.showButton++;
      }
    },
    // 表格排序
    sortChange (column) {
      console.log(column)
      if (column.prop == 'orderNum') {
        if (column.order == 'ascending') {
          this.obj.orderNum = 'asc'
          this.obj.orderAmount = ''
          this.obj.groupMemberNum = ''
          this.obj.rebate = ''
        } else {
          this.obj.orderNum = 'desc'
          this.obj.orderAmount = ''
          this.obj.groupMemberNum = ''
          this.obj.rebate = ''
        }
      } else if (column.prop == "orderAmount") {
        if (column.order == 'ascending') {
          this.obj.orderAmount = 'asc'
          this.obj.orderNum = ''
          this.obj.groupMemberNum = ''
          this.obj.rebate = ''
        } else {
          this.obj.orderAmount = 'desc'
          this.obj.orderNum = ''
          this.obj.groupMemberNum = ''
          this.obj.rebate = ''
        }
      } else if (column.prop == "groupMemberNum") {
        if (column.order == 'ascending') {
          this.obj.groupMemberNum = 'asc'
          this.obj.orderNum = ''
          this.obj.orderAmount = ''
          this.obj.rebate = ''
        } else {
          this.obj.groupMemberNum = 'desc'
          this.obj.orderNum = ''
          this.obj.orderAmount = ''
          this.obj.rebate = ''
        }
      } else if (column.prop == "groupCommission") {
        if (column.order == 'ascending') {
          this.obj.rebate = 'asc'
          this.obj.orderNum = ''
          this.obj.orderAmount = ''
          this.obj.groupMemberNum = ''
        } else {
          this.obj.rebate = 'desc'
          this.obj.orderNum = ''
          this.obj.orderAmount = ''
          this.obj.groupMemberNum = ''
        }
      }
      this.obj.page = 1;
      this.getList(this.obj)
    },
    // 输入手机号获取列表
    getgrouplist (e) {
      getMemInfoByMobile({ mobile: this.groupPhone }).then(res => {
        this.groupPhoneList = [res.data.data]
      })
    },
    // 更新一下列表
    groupupdate (e) {
      console.log({ id: this.tableId, mobile: this.groupPhone })
      bindGroupMid({ id: this.tableId, mobile: this.groupPhone }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.groupPhone = ''
          this.bindgroupShow = false
        }
      })
    },
    // 此方法解决皮蛋和肖饶之痛，详情请咨询二人
    bindGroup (e) {
      this.bindgroupShow = true
      this.tableId = e.id
      this.groupPhoneList = []
      this.groupPhone = ''
      groupMaster({ id: e.id }).then(res => {
        console.log(res)
        this.bindgroupInfo = [res.data.data]
      })
    },
    // 修改机器人激活状态
    statusChange (e) {
      changeGroupRobotStatus({ id: e.id }).then(res => {
        this.getList()
      })
    },
    // 获取标签列表
    getTagData () {
      getTagData({}).then(res => {
        this.tags = res.data.data
        this.tags.unshift({ id: 0, tag_name: "无" })
        console.log(res)
      })
    },
    scropeChange (tagid, id) {
      console.log(tagid, id)
      var name
      this.tags.map((item, index) => {
        if (item.id == tagid) {
          name = item.tag_name
        }
      })
      this.$confirm(`确认修改群标签为${name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.changeGroupTag(tagid, id)
      }).catch(() => {

      });
      console.log(e)
    },
    changeGroupTag (tagid, id) {
      changeGroupTag({ room_id: id, tag_id: tagid }).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      })
    },
    getUserListByName () {
      getUserListByName({}).then(res => {
        this.userList = res.data.data.data
        console.log(res)
      })
    },
    back () {
      this.$router.back();
    },
    handleCheck (e) {
      this.$router.push({
        name: '群主统计详情',
        query: {
          roomId: e.id
        }
      })
    },
    handleClose () {
      this.dialogVisible = false;
    },
    handleClosebindGroup () {
      this.bindgroupShow = false;
    },
    userIndex () {
      userIndex().then(res => {
        if (res.data.code == 200) {
          this.buyStatus = res.data.data.buyStatus;
          if (!this.buyStatus) {
            this.dialogVisible = true;
          }
        } else {
          this.$message.error(res.data.message || '数据加载失败,请检查网络')
        }
      })
    },
    onSearch () {
      this.obj.page = 1;
      this.getList(this.obj)
    },
    getList () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let obj = {
        ...this.obj
      }
      obj.beginTime = this.obj.beginTime ? new Date(this.obj.beginTime).getTime() / 1000 : ''
      obj.endTime = this.obj.endTime ? new Date(this.obj.endTime).getTime() / 1000 : ''
      dataStatistics(obj).then((res) => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message || '数据加载失败,请检查网络')
          return
        }

      })
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList()
    },
    handleLookUser (obj) {
      //点击查看微信群成员
      this.$router.push({ path: '/main/wxMemberList', query: { id: obj.id } });

    }
  }
}
</script>

<style scoped>
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
</style>
