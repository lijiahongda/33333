<!--suppress ALL -->
<template>
  <div class="app-container">

    <!--搜索部分-->
    <div class="new_tab"
         v-loading="loading">
      <el-table v-if="!switchChart"
                :data="list"
                :fit="true"
                border
                style="width: 100%;">
        <el-table-column fixed
                         prop="cid"
                         label="序号	"
                         width="70"
                         align="center">
        </el-table-column>
        <el-table-column prop="coupon_name"
                         label="优惠券名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="coupon_type"
                         label="券类型"
                         width="65"
                         align="center">
        </el-table-column>
        <el-table-column prop="coupon_type_befor"
                         label="使用门槛"
                         align="center"
                         width="78">
        </el-table-column>
        <el-table-column prop="promotion"
                         label="优惠方式"
                         width="83"
                         align="center">
        </el-table-column>
        <el-table-column prop=""
                         label="有效时间"
                         width="100"
                         align="center">
          <template slot-scope="scope">
            <el-col v-html="scope.row.valid_time"></el-col>
          </template>
        </el-table-column>
        <el-table-column prop="modules"
                         label="使用业务"
                         width="78"
                         align="center">
        </el-table-column>
        <el-table-column prop="stock_num"
                         label="库存数量"
                         align="center"
                         width="80">
        </el-table-column>
        <el-table-column prop=""
                         label="领取量"
                         width="65"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.send_num}}
          </template>
        </el-table-column>
        <el-table-column prop="use_num"
                         label="使用量"
                         align="center"
                         width="65">
        </el-table-column>
        <el-table-column prop="use_percent"
                         label="使用率"
                         align="center"
                         width="75">
        </el-table-column>
        <el-table-column prop="typeName"
                         label="用途"
                         align="center"
                         width="78">
        </el-table-column>
        <el-table-column prop="channelTypeName"
                         label="渠道"
                         align="center"
                         width="78">
        </el-table-column>
        <el-table-column label="状态"
                         align="center"
                         width="60">
          <template slot-scope="scope">
            <el-col>{{scope.row.isOpen == 1?"开启":"关闭"}}</el-col>
          </template>
        </el-table-column>

        <!-- <el-table-column fixed="right"
                         label="操作"
                         width="120"
                         align="center">
          <template slot-scope="scope"
                    align="center">

            <el-button type="text"
                       size="small"
                       @click="closeGet(scope.row,scope.$index)">{{scope.row.isOpen == 1?"关闭":"开启"}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="send(scope.row.cid)">发送</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination :current-page="pageIndex"
                     :page-sizes="[10]"
                     :page-size="pageSize"
                     :total="total"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 点击发送弹出 -->
    <el-dialog title="发送优惠券"
               :visible.sync="dialogFormVisible"
               :modal-append-to-body='false'
               @closed="clearResult">
      <el-form :model="form">
        <el-form-item label="*请输入数量">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="*请输入手机号">
          <el-input type="textarea"
                    v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sendSave">确 定</el-button>
      </div>
      <div class="result"
           v-if="result.successData.length || result.errorData.length">
        <p v-if="result.errorData.length">发送失败：<span>{{result.errorData.join('、')}}</span></p>
        <p v-if="result.successData.length">发送成功：<span>{{result.successData.join('、')}}</span></p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { getCouponsList } from '@/api/coupons'
// 适用业务
const isYw = [
  { key: 1, display_name: '酒店' },
  { key: 2, display_name: '商城' },
  { key: 3, display_name: '线路' }
]
// 类型
const isType = [
  { key: 0, display_name: '满减券' },
  { key: 1, display_name: '折扣券' }
]

// 是否会员
const isOpen = [
  { key: '0', display_name: '关闭' },
  { key: '1', display_name: '开启' }
]

export default {
  directives: {
    waves
  },
  data () {
    return {
      total: null,
      switchChart: false,
      list: [],
      pageTotal: 0,   //显示页数
      pageIndex: 1,
      pageSize: 10,
      searchData: {},
      couponChannelTypes: [],
      formSearch: {
        page: "",
        coupon_name: "",//优惠券名称
        isOpen: "",//状态 0 关闭 1 开启
        coupon_type: "",//满减券 0满减券 1 折扣券
        modules: ""//适用业务 1酒店 2商城  3线路
      },
      isOpen,//状态 0 关闭 1 开启
      isType,//筛选类型
      isYw,
      dialogFormVisible: false,
      result: {
        successData: [],
        errorData: []
      },
      form: {
        number: '',
        mobile: ''
      },
      id: '',
      loading: true,
    }
  },
  created () {
    this.getList()
  },
  methods: {

    // 列表数据
    getList () {
      this.formSearch.page = this.pageIndex;
      getCouponsList(this.formSearch).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.list = res.data.data.list;
          this.total = res.data.data.totalCount;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          })
        }
      })
    },
    clearResult () {
      this.result = {
        successData: [],
        errorData: []
      }
    },
    // 关闭/开启
    closeGet (row, idx) {
      let isOpen = row.isOpen == 1 ? isOpen = 0 : isOpen = 1;
      let json = {
        cid: row.cid,
        isOpen: isOpen
      };
      switchCoupon(json).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          })
          this.list[idx].isOpen = res.data.isOpen
        }
      })
    },
    // 发送 获取id
    send (cid) {
      this.dialogFormVisible = true
      this.form.number = ""
      this.form.mobile = ""
      this.id = cid
    },
    // 点击确认
    sendSave () {
      if (this.form.number == '' || this.form.mobile == '') {
        this.dialogFormVisible = true
        alert('请填写信息！'); return
      }
      var obj = {
        mobiles: this.form.mobile,
        sendNum: this.form.number,
        cid: this.id
      }
      sendCoupon(obj).then(res => {
        if (res.data.code == 400) {
          this.$message({
            message: res.data.msg,
            type: "error"
          })

        } else {
          let startIndex = res.data.indexOf('{');
          res.data = JSON.parse(res.data.slice(startIndex, res.data.length));
          this.result = res.data.data;
          this.$message({
            message: "提交成功！",
            type: "success"
          })
        }
      })
    },
    onExport () {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '优惠券名称', '券类型', '使用门槛', '优惠方式', '有效时间', '使用业务', '库存数量', '领取量', '使用量', '使用率', '用途', '状态'];
        const filterVal = ['cid', 'coupon_name', 'coupon_type', 'coupon_type_befor', 'promotion', 'valid_time', 'modules', 'stock_num', 'send_num', 'use_num', 'use_percent', 'typeName', 'isOpen']
        const list = this.list;
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: 'ylh', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx' //非必填
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    onSubmit () {
      this.pageIndex = 1
      this.getList()
    },
    onEmpty (formName) {
      this.pageIndex = 1;
      this.$refs[formName].resetFields();
      this.getList()
    },
    onAdd () {
      this.$router.push('/mall/addCoupon')
    },
    // 搜索
    handleFilter () {
      this.pageIndex = 1
    },
    // 分页
    handleSizeChange (val) { },
    handleCurrentChange (val) {
      this.loading = true;
      this.pageIndex = val;
      this.getList()
    }
  }
}
</script>
<style type="scss">
.goodsName {
  display: block;
}
</style>
