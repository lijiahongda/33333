<template>
  <div id="edit" v-loading="loading">
    <el-dialog width="60%" title="优惠券" :visible.sync="dialogTableVisible">
      <el-form :model="obj">
        <el-form-item label :inline="true">
          <el-input placeholder="优惠券名称" v-model="obj.coupon_name" clearable></el-input>
        </el-form-item>
        <el-form-item label label-width="50px" :inline="true">
          <el-button @click="smallSeachFunction()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="yhqList">
        <el-table-column property="cid" label="id" width="150"></el-table-column>
        <el-table-column property="coupon_name" label="优惠券名称" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="selectOk(scope.row)">选取</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[10]"
          :page-size="pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-dialog>
    <el-dialog width="60%" title="商品列表" :visible.sync="dialogSku">
      <el-form :model="skuSearch">
        <el-form-item label :inline="true">
          <el-input
            placeholder="商品名称/供应商名称"
            @blur="chooseItem('goodName')"
            v-model="skuSearch.goodName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label label-width="20px" :inline="true">
          <el-input placeholder="价格区间(最小价格)" v-model="skuSearch.minPrice" clearable></el-input>
        </el-form-item>
        <el-form-item label label-width="20px" :inline="true">
          <el-input placeholder="价格区间(最大价格)" v-model="skuSearch.maxPrice" clearable></el-input>
        </el-form-item>
        <el-form-item label label-width="20px" :inline="true" v-if="Skutype != 6">
          <el-select
            v-model="skuSearch.bandId"
            @change="chooseItem('bandId')"
            clearable
            placeholder="请选择品类"
          >
            <el-option
              v-for="item in goodsOptions"
              :key="item.band_id"
              :label="item.class_name"
              :value="item.band_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label label-width="20px" :inline="true" v-if="Skutype != 6">
          <el-radio-group v-model="skuSearch.ModelId" @change="chooseItem('ModelId')">
            <el-radio
              v-for="item in goodsRadio"
              :key="item.model_id"
              :label="item.model_id"
            >{{item.model_name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label label-width="20px" :inline="true">
          <el-button @click="skuSearchFunction()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="productList" @sort-change="sortChange">
        <el-table-column property="num" label="序号" width="60"></el-table-column>
        <el-table-column property="gid" label="id" width="80"></el-table-column>
        <el-table-column property="channelName" label="商品来源" width="80"></el-table-column>
        <el-table-column property="goods_name" label="商品名称" width="200"></el-table-column>
        <el-table-column property label="图片" width="130">
          <template slot-scope="scope">
            <img style="width:100px;height:100px" :src="scope.row.goods_img" />
          </template>
        </el-table-column>
        <el-table-column property="vip_price" label="价格" width="130" sortable="custom">
          <template slot-scope="scope">
            <span>会员价格：{{scope.row.vip_price}}</span>
            <br />
            <span>普通价格：{{scope.row.original_price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="iscustom"
          property="discount"
          label="折扣比例"
          width="120"
          sortable="custom"
        ></el-table-column>
        <el-table-column property="sale_num" label="社群销量" width="80"></el-table-column>

        <el-table-column
          property="group_servant"
          prop="group_servant"
          label="群主分佣"
          width="100"
          sortable="custom"
        ></el-table-column>

        <!-- <el-table-column v-if="iscustom"
								 property="group_servant"
								 prop="group_servant"
								 label="群主分佣"
								 width="100"
								 sortable="custom"></el-table-column>
				<el-table-column v-else
								 property="group_servant"
								 prop="group_servant"
								 label="群主分佣"
        width="100"></el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="selectSku(scope.row)">选取</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[10]"
          :page-size="pageSize"
          :total="skutotal"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeSku"
          @current-change="handleCurrentChangeSku"
        />
      </div>
    </el-dialog>
    <span>发送消息到所有群：</span>
    <el-checkbox-group v-model="checkedIds" class="checkedQun">
      <el-checkbox v-for="qun in qunCheckBox" :key="qun.id" :label="qun.id" class="checkbox-group">
        <el-row type="flex" align="middle" style="flex-direction: column">
          <img class="avatar-img-d" :src="qun.head_img" alt />
          <div>{{qun.name}}({{qun.member_count}}人)</div>
        </el-row>
      </el-checkbox>
    </el-checkbox-group>
    <el-button type="primary" @click="addMessage" :disabled="is_edit==0?true:false">新增素材</el-button>

    <el-form label-width="180px">
      <div
        style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:10;background:#000;opacity:0.2;"
        v-if="is_edit==0"
      ></div>
      <el-form-item label="是否是多品并发">
        <el-radio-group v-model="messagesClone.isMoreProduct" @change="isMore">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否定时发送">
        <el-radio-group v-model="messagesClone.isTimingSend">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="定时发送时间" v-if="messagesClone.isTimingSend==1" prop="timingSendTime">
        <el-date-picker
          v-model="messagesClone.timingSendTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择定时发送时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="messagesClone.tag_ids" multiple filterable placeholder="请输入标签">
          <el-option
            v-for="item in SkuOptions"
            :key="item.tag_id"
            :label="item.tag_name"
            :value="item.tag_id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="messagesClone.isMoreProduct==1">
        <el-button type="primary" @click="openSomeSend()">添加素材</el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="180px">
      <div
        class="message"
        v-for="(item,index) in messages"
        :key="index"
        @click="getIndex(index)"
        v-if="messagesClone.isMoreProduct==0||messagesClone.isMoreProduct==1"
      >
        <el-form-item label="类型">
          <el-radio-group :key="keyrandom" @change="yhq(item,index)" v-model="item.type">
            <el-radio
              v-for="item in typeMaterial_list"
              :key="item.id"
              :label="item.id"
            >{{item.name}}</el-radio>
            <!-- <el-radio :label="1">文本</el-radio>
						<el-radio :label="2">图片</el-radio>
						<el-radio :label="3">视频</el-radio>
						<el-radio :label="4">链接</el-radio>
            <el-radio :label="5">优惠券</el-radio>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="item.type == 5" label="副标题">
          <el-input type="input" v-model="item.link_desc" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item v-if="item.type == 5" label="发送优惠券数量">
          <el-input type="input" v-model="item.coupon_num" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="链接类型" v-if="item.type == 4 || item.type == 6">
          <el-radio-group
            v-model="item.link_type"
            :key="keyrandom1"
            @change="dialogShowSku(item,index)"
          >
            <el-radio
              v-for="item in typeLinkMaterial_list"
              :key="item.id"
              :label="item.id"
            >{{item.name}}</el-radio>
            <!-- 1:直播间2:直播间购物袋-3:直播间单品-4:自营商品5:京东商品-
            6:拼多多商品-8:唯品会-->
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="item.type == 1 || item.type == 4|| item.type == 6" label="内容">
          <el-input
            type="textarea"
            v-model="item.content"
            :autosize="{ minRows: 2, maxRows: 8}"
            :key="keyrandom3"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item v-if="item.type == 2" label="内容">
          <el-upload
            class="avatar-uploader"
            action="https://api2.yuelvhui.com/app/third/upload"
            :show-file-list="false"
            :on-success="res=>{item.content = res.url}"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="item.content" :src="item.content" :key="keyrandom3" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="item.type == 3" label="内容">
          <el-upload
            class="avatar-uploader"
            action="https://api2.yuelvhui.com/app/third/uploadVideo"
            :show-file-list="false"
            :before-upload="beforeUploadVideo"
            :on-success="res=>{item.content = res.url}"
          >
            <img
              v-if="item.content"
              src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-08/21/yuelvhuizprWwRkYss1586352852.jpg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-button v-if="item.content" type="primary" @click="videoPlay(item.content)">点击查看</el-button>
        </el-form-item>
        <el-form-item v-if="item.type == 1 ||item.type == 6" label="短链">
          <el-input v-model="item.shortUrl" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- <el-form-item v-if="item.type == 1 && linkType > 3"
							  label="原价">
				  <el-input v-model="item.original_price"
							placeholder="请输入原价"></el-input>
				</el-form-item>
				<el-form-item v-if="item.type == 1 && linkType > 3"
							  label="售价">
				  <el-input v-model="item.buy_price"
							placeholder="请输入售价"></el-input>
        </el-form-item>-->
        <el-form-item label="是否要发送">
          <el-radio-group v-model="item.isSend" :key="keyrandom2" @change="handleChangeGroup">
            <el-radio :label="0">不发送</el-radio>
            <el-radio :label="1">要发送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button type="danger" @click="delMessage(index,item.id)">删除</el-button>
      </div>
      <!--多条并发  -->
      <div class="message2_box" v-if="messagesClone.isMoreProduct==1">
        <div class="message2" v-for="item in dataList">
          <el-form-item label="类型">
            <el-radio-group :key="keyrandom" @change="changclick(item)" v-model="typedata">
              <el-radio
                v-for="item in typeMaterial_list"
                :key="item.id"
                :label="item.id"
              >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="内容" v-if="typedata==1">
            <el-input
              type="textarea"
              v-model="item.content"
              :autosize="{ minRows: 2, maxRows: 8}"
              :key="keyrandom3"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="短链" v-if="typedata==1">
            <el-input v-model="item.url" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item v-if="typedata == 2" label="内容">
            <el-upload
              class="avatar-uploader"
              action="https://api2.yuelvhui.com/app/third/upload"
              :show-file-list="false"
              :on-success="res=>{item.content = res.url}"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="item.content" :src="item.content" :key="keyrandom3" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="是否要发送" v-if="messagesClone.isMoreProduct==1">
            <el-radio-group v-model="isSend">
              <el-radio :label="0">不发送</el-radio>
              <el-radio :label="1">要发送</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-dialog :visible.sync="videoDialog" :before-close="videoDialogVisibleClick">
      <video
        id="video"
        style="margin: 0 auto;width: 100%;"
        height="400"
        :src="videoUrl"
        autoplay="autoplay"
        controls="controls"
      >您的浏览器不支持视频</video>
    </el-dialog>
    <router-link to="/material/list">
      <el-button type="primary">返回</el-button>
    </router-link>
    <el-button type="primary" @click="addCommunitySendInfo" :disabled="is_edit==0?true:false">保存</el-button>

    <!-- 多条并发 -->
    <el-dialog
      title="多条并发"
      :visible.sync="someListSend"
      width="30%"
      :before-close="handleSomeClose"
    >
      <el-input type="textarea" v-model="Textfield"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="someListSend = false">取 消</el-button>
        <el-button type="primary" @click="getTextUrlSeparate()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  materialInfo,
  addMaterial,
  upMaterial,
  getRoomList,
  canUseTag,
  delMaterial,
  skuList,
  goodsPostList,
  getZyList,
  getShortLinkUrl,
  channelTag,
  typeMaterial,
  typeLinkMaterial,
  getTextUrlSeparate,
  // channelTag
} from "@/api/robot";
import { delCommunitySendInfo } from "@/api/shops";
import { getCouponsList } from "@/api/coupons";

export default {
  name: "edit",
  data() {
    return {
      radioT: 1,
      isSend: 1,
      Shortchain: "",
      radioS: "",
      Textfield: "", //文本域
      someListSend: false, //多条并发
      keyrandom: "",
      keyrandom1: "",
      keyrandom2: "",
      keyrandom3: "",
      total: null,
      pageTotal: 0, //显示页数
      pageIndex: 1,
      pageSize: 10,
      checkedIds: [],
      qunCheckBox: [],
      yhqList: [],
      dialogTableVisible: false,
      messages: [
        {
          type: 0,
          content: "",
          isSend: 1,
          link_type: "",
        },
      ],
      messagesClone: {
        isTimingSend: 1,
        timingSendTime: "",
        tag_ids: "",
        isMoreProduct: 0,
      },
      messages_index: "", //暂存
      videoUrl: "",
      videoDialog: false,
      is_edit: "3",
      SkuOptions: [],
      QdOptions: {},
      tag_ids: [],
      obj: {
        page: 1,
        pageSize: 10,
        coupon_name: "",
      },
      dialogSku: false,
      skuSearch: {
        page: 1,
        type: "",
        goodName: "",
        maxPrice: "",
        minPrice: "",
        ModelId: 0,
        bandId: "",
      },
      productList: [],
      skutotal: null,
      Skutype: "",
      goodsOptions: [],
      goodsRadio: [],
      linkType: "",
      shortLink: "",
      isdisiable: false,
      divIndex: "",
      loading: false,
      obj: {},
      iscustom: true,
      typeMaterial_list: [],
      typeLinkMaterial_list: [],
      linkMaterial: "",
      dataList: [],
      typedata: 1, //type类型
    };
  },
  created() {
    this.getRoomList();
    if (this.$route.query.randomStr) {
      this.materialInfo();
    }
    this.canUseTag();
    this.channelTag();
    this.typeMaterial();
    this.typeLinkMaterial();
  },
  methods: {
    // 多条并发
    openSomeSend() {
      this.someListSend = true;
    },
    //关闭X事件
    handleSomeClose() {
      this.someListSend = false;
    },
    //文本域按钮
    getTextUrlSeparate() {
      let praams = {
        content: this.Textfield,
      };
      getTextUrlSeparate(praams).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.dataList = res.data.data;
		  this.dataList.concat(this.messages);
		  console.log(this.dataList);
          this.Textfield = "";
        }
      });
      this.someListSend = false;
    },
    //类型
    typeMaterial() {
      typeMaterial().then((res) => {
        console.log(res.data.data, "resresresres");
        this.typeMaterial_list = res.data.data;
      });
    },
    //链接类型
    typeLinkMaterial() {
      let _this = this;
      let opt = {
        type_id: _this.linkMaterial,
      };
      console.log(opt, "jhkjhjkhhj");
      typeLinkMaterial(opt).then((res) => {
        console.log(res.data.data, "linklink");
        this.typeLinkMaterial_list = res.data.data;
      });
    },
    sortChange(column) {
      console.log(column, "column", column.column.property);
      if (column.column.property == "group_servant") {
        this.skuSearch.sorttype = "1";
        if (column.order == "descending") {
          this.skuSearch.sort = "2";
        } else {
          this.skuSearch.sort = "1";
        }
      }

      if (column.column.property == "vip_price") {
        this.skuSearch.sorttype = "3";
        if (column.order == "descending") {
          this.skuSearch.sort = "2";
        } else {
          this.skuSearch.sort = "1";
        }
      }
      if (column.column.property == "discount") {
        this.skuSearch.sorttype = "4";
        if (column.order == "descending") {
          this.skuSearch.sort = "2";
        } else {
          this.skuSearch.sort = "1";
        }
      }
      // console.log('888')
      this.skuSearch.page = 1;
      this.skuList();
    },
    getIndex(index) {
      console.log(index, "indexxxxxxx");
      this.divIndex = index;
    },
    chooseItem(val) {
      if (val == "goodName") {
        this.skuSearch.ModelId = "";
        this.skuSearch.bandId = "";
      } else if (val == "bandId") {
        this.skuSearch.ModelId = "";
        this.skuSearch.goodName = "";
      } else if (val == "ModelId") {
        this.skuSearch.goodName = "";
        this.skuSearch.bandId = "";
      }
      if (this.skuSearch.ModelId == 0) {
        this.isdisiable = false;
      } else {
        this.isdisiable = true;
      }
      // if (this.skuSearch.goodName == '') {
      //   this.isdisiable = false
      // }
      // if (this.skuSearch.bandId == '' || this.skuSearch.bandId == undefined) {
      //   this.isdisiable = false
      // }
      // console.log(this.skuSearch.ModelId, this.isdisiable)
    },
    isMore(val) {
      // this.messages = [
      //   {
      //     type: 0,
      //     content: "",
      //     isSend: "",
      //     link_type: ""
      //   }
      // ];
    },
    getCouponsList() {
      getCouponsList(this.obj).then((res) => {
        this.yhqList = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.loading = false;
      });
    },
    changclick(item) {
      this.typedata == item.id;
      console.log(this.typedata);
    },
    yhq(item, index) {
      this.linkMaterial = this.messages[index].type;
      if (this.linkMaterial == 4 || this.linkMaterial == 6) {
        this.typeLinkMaterial();
      }
      if (this.messages[index].type == 5) {
        this.getCouponsList();
        this.dialogTableVisible = true;
        this.messages_index = index;
        // this.$forceUpdate()
        console.log(this.messages_index);
        // this.messages = [{
        //   type: 0,
        //   content: "",
        //   isSend: "",
        //   link_type: ""
        // }]
      }
      this.keyrandom = Math.random();
    },
    dialogShowSku(item, index) {
      console.log(
        this.messages[index].link_type,
        "this.messages[index].link_type"
      );
      this.skuSearch.page = 1;
      this.skuSearch.ModelId = "";
      this.skuSearch.bandId = "";
      this.skuSearch.goodName = "";
      this.skuSearch.minPrice = "";
      this.skuSearch.maxPrice = "";

      if (this.messages[index].link_type == 4) {
        this.dialogSku = true;
        this.skuList(); //选取商品
        this.skuSearch.type = this.messages[index].link_type;
        this.Skutype = this.messages[index].link_type;
        this.getZyList(this.messages[index].link_type);
        this.iscustom = true;
      }
      if (
        this.messages[index].link_type == 5 ||
        this.messages[index].link_type == 6 ||
        this.messages[index].link_type == 8 ||
        this.messages[index].link_type == 9 ||
        this.messages[index].link_type == 11 ||
        this.messages[index].link_type == 12 ||
        this.messages[index].link_type == 7 ||
        this.messages[index].link_type == 13 ||
        this.messages[index].link_type == 14
      ) {
        this.dialogSku = true;
        this.skuList(); //选取商品
        this.skuSearch.type = this.messages[index].link_type;
        this.Skutype = this.messages[index].link_type;
        this.goodsPostList(this.messages[index].link_type);
        this.iscustom = false;
      }
      console.log(this.iscustom, "this.iscustom");
      this.keyrandom1 = Math.random();
    },
    handleChangeGroup() {
      this.keyrandom2 = Math.random();
    },
    skuList() {
      console.log(this.skuSearch, "this.skuSearch——————————————");
      skuList(this.skuSearch).then((res) => {
        this.productList = res.data.data;
        this.skutotal = res.data.total;
        this.loading = false;
      });
    },
    goodsPostList(type) {
      this.linkType = type;
      console.log(type, "typetypetypetypetypetypetype");
      goodsPostList({ type: type }).then((res) => {
        this.goodsOptions = res.data.data.classData;
        this.goodsRadio = res.data.data.classEliteData;
        // console.log(this.goodsRadio, 'jhhjhhjj')
      });
    },
    getZyList(type) {
      this.linkType = type;
      getZyList({ type: type }).then((res) => {
        this.goodsOptions = res.data.data;
        this.goodsRadio = "";
        // console.log(this.goodsRadio, 'kjlkjlk')
      });
    },
    selectSku(row) {
      // console.log(row);
      console.log(
        row,
        "sku",
        row.supplier_code,
        " this.linkType",
        this.linkType
      );
      let sku_id = "";
      if (row.sku_id) {
        sku_id = row.sku_id;
      }
      //获取短链
      let spn = {
        type: this.linkType,
        gid: row.gid,
        sku_id: sku_id,
        rate: row.group_servant,
        goodName: row.goods_name,
      };
      if (row.supplier_code != undefined) {
        spn.supplier_code = row.supplier_code;
      }
      getShortLinkUrl(spn).then((res) => {
        this.shortLink = res.data.data.shortLink;
        console.log(this.shortLink);
        //是否是多品并发
        if (this.messagesClone.isMoreProduct == 1) {
          //是多品并发
          let temp = [{}];
          //this.QdOptions.channel 1社群 2 大人
          if (this.QdOptions.channel == 2) {
            temp[0].content = `${row.goods_name} \n${
              "【原价】: " + row.original_price
            } \n${"【团购价】: " + row.vip_price} \n【抢购地址】:`;
          } else {
            temp[0].content = `${row.goods_name} \n${
              "【原价】: " + row.original_price
            } \n${"【会员价】: " + row.vip_price} \n【抢购地址】:`;
          }
          // this.linkType 选择为本地生活时
          if (this.linkType == 11) {
            temp[0].content = `更多本地美食，更多大牌折扣，尽在悦淘优享！`;
          }
          temp[0].shortUrl = this.shortLink;
          temp[0].type = 1;
          temp[0].isSend = 1;
          console.log(
            this.divIndex,
            "this.divIndex",
            this.messages[this.divIndex]
          );
          this.messages.length == 1
            ? (this.messages = temp)
            : this.$set(this.messages, [this.divIndex], temp[0]);
          this.$forceUpdate();
          this.keyrandom3 = Math.random();
        } else {
          this.messages = [];
          let arr = [
            {
              src: "",
              txt: row.goods_name,
              original_price: row.original_price,
              buy_price: row.buy_price,
              type: 1,
            },
          ];
          let alength = [row.goods_name, row.goods_img];
          arr.push({
            src: row.goods_img,
          });
          console.log(arr, "arrarrarrarrarrarr");
          //this.linkType 选择为本地生活时
          if (this.linkType == 11) {
            arr.length = 1;
          }
          arr.map((item) => {
            console.log(item, "item");
            if (item.src == "") {
              //文本
              item.type = 1;
              //this.QdOptions.channel 1社群 2 大人
              console.log(this.QdOptions.channel, "this.QdOptions");
              if (this.QdOptions.channel == 2) {
                item.content = `${item.txt} \n${
                  "【原价】: " + row.original_price
                } \n${"【团购价】: " + row.vip_price} \n【抢购地址】:`;
              } else {
                item.content = `${item.txt} \n${
                  "【原价】: " + row.original_price
                } \n${"【会员价】: " + row.vip_price} \n【抢购地址】:`;
              }
              if (this.linkType == 11) {
                item.content = `更多本地美食，更多大牌折扣，尽在悦淘优享！`;
              }
              if (this.linkType == 14) {
                item.content = row.introduction;
              }

              item.shortUrl = `${this.shortLink}`;
              // item.shortUrl = this.shortLink
            } else {
              //图片
              item.type = 2;

              item.content = item.src;
            }
            item.isSend = 1;

            this.messages.push(item);
          });
        }
      });

      this.dialogSku = false;
    },
    smallSeachFunction() {
      this.getCouponsList();
    },
    skuSearchFunction() {
      this.skuSearch.page = 1;
      this.skuList();
    },
    selectOk(row) {
      this.messages[this.messages_index].cid = row.cid;
      this.messages[this.messages_index].link_desc = row.coupon_name;
      this.messages[this.messages_index].typeid = row.typeid;
      this.dialogTableVisible = false;
      // this.loading = false;
      // console.log(this.messages[this.messages_index], '999999999')
    },
    canUseTag() {
      canUseTag({}).then((res) => {
        this.SkuOptions = res.data.data;
        console.log(res);
      });
    },
    channelTag() {
      channelTag({}).then((res) => {
        this.QdOptions = res.data.data;
        console.log(this.QdOptions, "---");
      });
    },
    videoPlay(url) {
      this.videoUrl = url;
      this.videoDialog = true;
    },
    videoDialogVisibleClick() {
      let video = document.getElementById("video");
      video.pause();
      this.videoDialog = false;
    },
    // 图片上传前的检查
    beforeAvatarUpload(file) {
      // if (file.size / 1024 / 1024 > 1) {
      //   this.$message({
      //     message: "图片请保持在1M以内",
      //     type: "error"
      //   });
      //   return false;
      // }
    },
    //上传前回调
    beforeUploadVideo(file) {
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
          "video/mov",
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
    materialInfo() {
      materialInfo({
        randomStr: this.$route.query.randomStr,
        mid: JSON.parse(localStorage.getItem("userInfo")).mid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.messages = res.data.data;

          this.messagesClone.isTimingSend = res.data.data[0].isTimingSend;
          this.messagesClone.timingSendTime = res.data.data[0].timingSendTime;

          this.messagesClone.isMoreProduct = res.data.data[0].isMoreProduct;
          // this.messagesClone.tag_ids = res.data.data[0].tag_ids
          this.messages.map((item) => {
            return (this.messagesClone.tag_ids = item.tag_ids
              .toString()
              .split(",")
              .map(Number));
          });
          // console.log(this.messages, 'messages', res.data.data[0].tag_ids);
          this.is_edit = res.data.data[0].is_edit;
          this.checkedIds = res.data.roomids.toString().split(",").map(Number);
        } else {
          this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        }
      });
    },
    getRoomList() {
      getRoomList({
        mid: JSON.parse(localStorage.getItem("userInfo")).mid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.qunCheckBox = res.data.data;
        } else {
          this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        }
      });
    },
    addCommunitySendInfo() {
      console.log(this.messages,'');
      // return;
      this.loading = true;
      let _url = this.$route.query.randomStr ? upMaterial : addMaterial;

      if (this.messagesClone.isMoreProduct && this.dataList != "") {
        this.dataList.map((val) => {
          val.tag_ids = this.messages.tag_ids;
          val.isMoreProduct = this.messagesClone.isMoreProduct;
          val.timingSendTime = this.messagesClone.timingSendTime;
          val.isSend = this.isSend;
          val.isTimingSend = this.messagesClone.isTimingSend;
          (val.type = this.typedata), (val.shortUrl = val.url);
        });
        this.messages.map((vals) => {
          vals.type = vals.type;
          vals.tag_ids = vals.tag_ids;
          vals.isMoreProduct = vals.isMoreProduct;
		//   vals.timingSendTime = vals.timingSendTime;
          vals.timingSendTime = this.messagesClone.timingSendTime;
          vals.isSend = vals.isSend;
		//   vals.isTimingSend = vals.isTimingSend;
          vals.isTimingSend = this.messagesClone.isTimingSend;
          vals.shortUrl = vals.url;
        });

        let _msg = this.dataList.concat(this.messages);
        const couponArr = [];
        _msg.forEach((ele) => {
          if (ele.type == 5) {
            couponArr.push(ele);
          }
        });
        const switchHas =
          couponArr &&
          couponArr.every((ele) => {
            return ele.coupon_num && ele.coupon_num >= 1;
          });
        if (couponArr.length < 1 || switchHas) {
          this.saveApiMaterial(_msg, _url);
        } else {
          this.$message.info("请填写发送优惠卷数量！");
          this.loading = false;
          return;
        }
      } else {
        this.messages = this.messages.map((item) => {
          console.log(item, "12312312312");
          return {
            ...item,
            ...this.messagesClone,
          };
        });
        // console.log(this.messages, '后后后后后后后后后后后后');
        let msg_else = [...this.messages];
        msg_else.map((item) => {
          return (item.tag_ids = item.tag_ids.join(","));
        });

        //判断是否填写'发送优惠卷数量'
        // console.log(msg_else, 'nnnnnnnnnnnnnnnnnnnn');
        // const this.switchValue = true;

        const couponList = [];
        msg_else.forEach((ele) => {
          if (ele.type == 5) {
            couponList.push(ele);
          }
        });
        const switchValue =
          couponList &&
          couponList.every((ele) => {
            return ele.coupon_num && ele.coupon_num >= 1;
          });
        if (couponList.length < 1 || switchValue) {
          this.saveApiMaterial(msg_else, _url);
        } else {
          this.$message.info("请填写发送优惠卷数量！");
          this.loading = false;
          return;
        }
      }
    },

    //保存新增素材接口
    saveApiMaterial(msg, _url) {
      _url({
        data: msg,
        mid: JSON.parse(localStorage.getItem("userInfo")).mid,
        roomids: this.checkedIds.join(","),
      }).then((res) => {
        this.loading = false;
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.$router.push("/material/list");
        } else {
          this.$message.error(res.data.msg || "数据加载失败,请检查网络");
        }
      });
    },

    // 防止变量被污染
    clone(Obj) {
      var buf;
      if (Obj instanceof Array) {
        buf = [];
        var i = Obj.length;
        while (i--) {
          buf[i] = this.clone(Obj[i]);
        }
        return buf;
      } else if (Obj instanceof Object) {
        buf = {};
        for (var k in Obj) {
          buf[k] = this.clone(Obj[k]);
        }
        return buf;
      } else {
        return Obj;
      }
    },
    delMessage(index, id) {
      // if (this.messages.length == 1 && this.$route.query.randomStr) {
      //   this.$message.warning("编辑至少保留一条");
      //   return;
      // }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.$route.query.randomStr && id) {
            delMaterial({ id: id }).then((res) => {
              if (res.data.code == 200) {
                this.messages.splice(index, 1);
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg || "数据加载失败,请检查网络");
              }
            });
          } else {
            this.messages.splice(index, 1);
            this.$message.success("删除成功！");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addMessage() {
      if (this.messages.isMoreProduct) {
        console.log(this.messages.concat(this.dataList));
      }
      this.messages.push({
        type: 0,
        content: "",
        isSend: 1,
      });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.loading = true;
      this.obj.page = val;
      this.getCouponsList();
    },
    handleSizeChangeSku(val) {},
    handleCurrentChangeSku(val) {
      this.loading = true;
      this.skuSearch.page = val;
      this.skuList();
    },
  },
};
</script>

<style scoped lang="less">
.el-dialog {
  width: 60% !important;
}

#edit {
  padding: 20px;
}

.message,
.message1 {
  width: 45%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin: 20px;
  position: relative;
  overflow: hidden;
}

.message2_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.message2 {
  width: 45%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin: 20px;
  position: relative;
  overflow: hidden;
}

.el-form {
  display: flex;
  flex-wrap: wrap;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.checkedQun {
  margin-bottom: 10px;

  .checkbox-group {
    border: 1px dotted #ccc;
    padding: 15px;
    border-radius: 5px;
  }

  img {
    width: 100px;
    height: 100px;
  }
}
</style>
