<template>
  <div class="content">
    <el-dialog title="创建群"
               :visible.sync="clertRobot">
      <el-form :model="form">
        <el-form-item label="群名称"
                      label-width="150px">
          <el-input v-model="form.name"
                    style="width:200px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属上级手机号"
                      label-width="150px">
          <el-input v-model="form.mobile"
                    style="width:200px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="群标签选择"
                      label-width="150px">
          <el-select v-model="form.tag_id"
                     placeholder="请选择群标签">
            <el-option v-for="item in MemberList"
                       :key="item.id"
                       :label="item.tag_name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属机器人"
                      label-width="150px">
          <el-select v-model="form.robot_id"
                     placeholder="请选择所属机器人">
            <el-option v-for="item in jqrList"
                       :key="item.id"
                       :label="item.wx_name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="clertRobot = false">取 消</el-button>
        <el-button type="primary"
                   @click="cleartQun()">创建群</el-button>
      </div>
    </el-dialog>
    <el-dialog title="邀请好友"
               :visible.sync="addFried">
      <el-form :model="search"
               :inline="true">
        <el-form-item label=""
                      label-width="150px">
          <el-input v-model="search.mobile"
                    placeholder="所属上级手机号"
                    style="width:200px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=""
                      label-width="150px">
          <el-input v-model="search.beginGmv"
                    placeholder="GMV"
                    style="width:200px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="-"
                      label-width="10px">
          <el-input v-model="search.endGmv"
                    placeholder="GMV"
                    style="width:200px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-button @click="search_btn()">搜索</el-button>
      </el-form>
      <el-table ref="multipleTable"
                :data="gridData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column property="nickname"
                         label="昵称"
                         width="150"></el-table-column>
        <el-table-column property="gmv"
                         label="GMV"
                         width="200"></el-table-column>
        <el-table-column property="parent_name"
                         label="所属上级"></el-table-column>
        <el-table-column property=""
                         label="操作">
          <template slot-scope="scope">
            <el-button @click="Invite(scope.row)">邀请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange_InviteFriends"
                       @current-change="handleCurrentChange_InviteFriends"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total_InviteFriends">
        </el-pagination>
      </div>
      <el-button style="margin:20px auto"
                 @click="InviteFriends()">批量邀请</el-button>
    </el-dialog>

    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="输入群名称">
        <el-input v-model="formInline.name"
                  placeholder="输入群名称"></el-input>
      </el-form-item>
      <el-form-item label="请输入GMV">
        <el-input v-model="formInline.beginGmv"
                  placeholder="请输入GMV"></el-input>
      </el-form-item>
      <el-form-item label="-">
        <el-input v-model="formInline.endGmv"
                  placeholder="请输入GMV"></el-input>
      </el-form-item>
      <el-form-item label="所属人手机号">
        <el-input v-model="formInline.mobile"
                  placeholder="所属人手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="clertRobot = true">创建群</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="
                   tableData"
              border
              style="width: 100%">
      <el-table-column prop="id"
                       label="序号"
                       width="180">
      </el-table-column>
      <el-table-column prop="admin_name"
                       label="所属上级"
                       width="180">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="所属人手机号"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="群名称">
      </el-table-column>
      <el-table-column prop="member_count"
                       label="群成员数量">
      </el-table-column>
      <el-table-column prop="tag_name"
                       label="群标签">
      </el-table-column>
      <el-table-column prop="GMV"
                       label="GMV">
      </el-table-column>
      <el-table-column prop="order_count"
                       label="订单数">
      </el-table-column>
      <el-table-column prop="robot_name"
                       label="所属机器人">
      </el-table-column>
      <el-table-column prop="robot_admin_name"
                       label="所属管理员">
      </el-table-column>
      <el-table-column prop="address"
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="onAdd(scope.row)">邀请好友</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="formInline.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getGroupList, bqList, robot, cleartQun, lowerLevel, InviteFriends } from "@/api/robot";
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: '',
        page: 1,
        pageSize: 10,
        total: 1
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      gridData: [],
      form: {},
      search: {
        pageSize: 10,
        page: 1,
        wxid: ''
      },
      total_InviteFriends: '',
      MemberList: [],
      jqrList: [],
      batchList: [],
      clertRobot: false,
      addFried: false,
      id: '',
    }
  },
  created () {
    this.getList()
    this.bqList()
    this.robot()
  },
  methods: {
    getList () {
      getGroupList(this.formInline).then(res => {
        this.tableData = res.data.data.data
        this.formInline.total = res.data.data.total
      })
    },

    bqList () {
      bqList().then(res => {
        this.MemberList = res.data.data.list
      })
    },

    robot () {
      robot().then(res => {
        this.jqrList = res.data.data
      })
    },
    cleartQun () {
      cleartQun(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success('创建成功')
          this.clertRobot = false
          this.getList()
          this.form = ''
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

    lowerLevel () {
      lowerLevel(this.search).then(res => {
        this.gridData = res.data.data.data
        this.total_InviteFriends = res.data.data.total
      })
    },
    search_btn () {
      this.lowerLevel()
    },
    handleSelectionChange (val) {
      this.batchList = val
    },
    onSubmit () {
      this.getList()
    },
    onAdd (row) {
      this.id = row.id
      this.search.wxid = row.wxid
      this.addFried = true
      this.lowerLevel(row)
    },
    //邀请单个好友
    Invite (row) {
      let wxid = []
      wxid.push(row.wxid)
      let opt = {
        id: this.id,
        wxid: wxid_id
      }
      InviteFriends(opt).then(res => {
        if (res.data.code == 200) {
          this.$message.success('邀请成功')
          this.addFried = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },

    //邀请全部好友
    InviteFriends (row) {
      console.log(this.batchList, 'batchList')
      if (this.batchList.length == '' || this.batchList.length == 0) {
        this.$message.error('请先选择')
        return false
      }
      let wxid = []
      this.batchList.map(item => {
        wxid.push(item.wxid)
      })
      let opt = {
        id: this.id,
        wxid: wxid
      }
      console.log(opt)
      InviteFriends(opt).then(res => {
        if (res.data.code == 200) {
          this.$message.success('邀请成功')
          this.addFried = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.formInline.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.formInline.page = val
      this.getList()
    },

    handleSizeChange_InviteFriends (val) {
      console.log(`每页 ${val} 条`);
      this.search.pageSize = val
      this.lowerLevel()
    },
    handleCurrentChange_InviteFriends (val) {
      console.log(`当前页: ${val}`);
      this.search.page = val
      this.lowerLevel()
    }
  }
}
</script>
    
<style scoped="scoped" lang="scss">
.content {
  margin: 20px;
}
</style>