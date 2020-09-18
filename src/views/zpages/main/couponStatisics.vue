<template>
  <div class="main">
    <div class="Setmeal"
         style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-form :inline="true">
        <el-form-item label="优惠券名称：">
          <el-input v-model="couponName"
                    placeholder="请输入优惠券名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="value2"
                          type="datetimerange"
                          format='yyyy/MM/dd HH'
                          :picker-options="pickerOptions"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          align="right">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item>
          <el-select v-model="adminId"
                     clearable
                     placeholder="请选择管理员">
            <el-option v-for="(item,index) in adminList"
                       :key="index"
                       :label="item.name"
                       :value="item.mid">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="Setmeal"
         style="min-height:10px; box-sizing: border-box;padding:20px">
      <el-table :data="tableData"
                border
                @sort-change="sortChange"
                style="width: 100%;margin-top:10px;">
        <el-table-column prop="num"
                         label="序号"
                         width="80">
        </el-table-column>
        <el-table-column prop="id"
                         label="编号"
                         width="80">
        </el-table-column>
        <el-table-column prop="name"
                         label="优惠券名称">
        </el-table-column>
        <el-table-column prop="sendNum"
                         label="发放总量">
        </el-table-column>
        <el-table-column prop="receiveNum"
                         label="已领取优惠券">
        </el-table-column>
        <el-table-column prop="adoptNum"
                         label="已使用优惠券">
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination :current-page="pageindex"
                     :page-sizes="[10, 50, 100, 200]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     style="margin:20px auto;text-align:center;"
                     :total="pagesum"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
<script>
import { getCouponListStatistics } from '@/api/robot' // 接口
import {
  getUserListByName
} from "@/api/zAjax"; // 接口
export default {
  data () {
    return {
      // 列表参数
      tableData: [],
      couponName: '',
      pageindex: 1,
      pagesum: 0,
      mobile: '',
      pageSize: 10,
      startTime: '',
      orderBy: 3,
      adminId: '',
      endTime: '',
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: [],
      showButton: 0,
      adminList: []
    }
  },
  mounted () {
    // 请求列表
    // this.getservicelist()
    this.handleSearch()
    this.getUserListByName()
  },
  methods: {
    // 获取管理员列表
    getUserListByName () {
      getUserListByName({}).then(res => {
        if (res.data.code === 200) {
          this.adminList = res.data.data.data
        }
      })
    },
    // 表格排序
    sortChange (column) {
      console.log(column)
      if (column.prop == 'totalmoney') {
        if (column.order == 'ascending') {
          this.orderBy = 1
        } else {
          this.orderBy = 2
        }
      } else if (column.prop == "goodsNumber") {
        if (column.order == 'ascending') {
          this.orderBy = 4
        } else {
          this.orderBy = 3
        }
      } else if (column.prop == 'liren') {
        if (column.order == 'ascending') {
          this.orderBy = 6
        } else {
          this.orderBy = 5
        }
      }
      this.pagesum = 1
      this.getservicelist();
    },
    handleSizeChange (val) {
      this.pageSize = val;
    },
    handleSearch () {
      console.log(this.value2)
      if (this.value2 == '' || this.value2 == null) {
        this.startTime = ''
        this.endTime = ''
      } else {
        var start = new Date(this.value2[0]);
        var end = new Date(this.value2[1]);

        // this.listForm.page=1
        var sM = (start.getMonth() + 1) < 10 ? '0' + (start.getMonth() + 1) : (start.getMonth() + 1)
        var sD = start.getDate() < 10 ? '0' + start.getDate() : start.getDate()
        var sH = start.getHours() < 10 ? '0' + start.getHours() : start.getHours()

        var eM = (end.getMonth() + 1) < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1)
        var eD = end.getDate() < 10 ? '0' + end.getDate() : end.getDate()
        var eH = end.getHours() < 10 ? '0' + end.getHours() : end.getHours()

        this.startTime = `${start.getFullYear()}-${sM}-${sD} ${sH}:00:00`
        this.endTime = `${start.getFullYear()}-${eM}-${eD} ${eH}:00:00`
        // console.log(this.sendStartTime)
        // this.sendEndTime = end.getTime() / 1000;
      }
      this.pageindex = 1;
      this.getservicelist();
    },

    // 请求列表方法
    getservicelist () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      getCouponListStatistics({
        "page": this.pageindex,
        "pageSize": this.pageSize,
        "startTime": this.startTime,
        "endTime": this.endTime,
        // "orderBy":this.orderBy,
        'mid': this.adminId,
        "couponName": this.couponName
      }).then(res => {
        setTimeout(() => {
          loading.close();
        }, 300);
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.pagesum = res.data.data.totalCount
        }
      })
    },
    // 翻页
    handleCurrentChange (e) {
      console.log(e)
      this.pageindex = e
      this.getservicelist()
    },
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
