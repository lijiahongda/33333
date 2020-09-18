<template>
	<div id="edit" v-loading="loading">
		<el-form label-width="120px">
			<el-form-item label="排序值">
				<el-input v-model="form.sort" placeholder="请输入排序值,值越大越靠前"></el-input>
			</el-form-item>
			<el-form-item label="分类">
				<el-select v-model="form.strategy_category_id" clearable placeholder="请选择">
					<el-option
						v-for="item in strategy_category"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="导师微信号">
				<el-input v-model="form.tutor_wechat" placeholder="请输入导师微信号"></el-input>
			</el-form-item>
			<el-form-item label="标题">
				<el-input v-model="form.title" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item label="描述">
				<el-input type="textarea" v-model="form.desc" placeholder="请输入描述" :autosize="{ minRows: 2, maxRows: 8}" ></el-input>
			</el-form-item>
			<el-form-item label="是否为置顶图片">
				<el-radio-group v-model="form.is_top">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="form.is_top == 1" label="置顶封面图">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/upload"
					:show-file-list="false"
					:on-success="res=>{ return form.top_img = res.url}"
					:before-upload="beforeAvatarUpload">
					<img v-if="form.top_img" :src="form.top_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item v-if="form.is_top == 1" label="置顶详情图">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/upload"
					:show-file-list="false"
					:on-success="res=>{form.top_content_img = res.url}"
					:before-upload="beforeAvatarUpload">
					<img v-if="form.top_content_img" :src="form.top_content_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="邀请图">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/upload"
					:show-file-list="false"
					:on-success="res=>{form.invite_img = res.url}"
					:before-upload="beforeAvatarUpload">
					<img v-if="form.invite_img" :src="form.invite_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="邀请专属图"  v-if="form.invite_img">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/upload"
					:show-file-list="false"
					:on-success="res=>{form.invite_exclusive_img = res.url}"
					:before-upload="beforeAvatarUpload">
					<img v-if="form.invite_exclusive_img" :src="form.invite_exclusive_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="是否有视频链接">
				<el-radio-group v-model="form.is_video">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="form.is_video == 1" label="视频链接">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/uploadVideo"
					:show-file-list="false"
					:before-upload="beforeUploadVideo"
					:on-success="res=>{form.video_url = res.url}">
					<img v-if="form.video_url" src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-08/21/yuelvhuizprWwRkYss1586352852.jpg" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-dialog :visible.sync="videoDialog" :before-close="videoDialogVisibleClick">
					<video id="video" style="margin: 0 auto;width: 100%;" height="400" :src="form.video_url"  autoplay="autoplay" controls="controls">您的浏览器不支持视频</video>
				</el-dialog>
				<el-button v-if="form.video_url"  type="primary" @click="videoDialog=true">点击查看</el-button>
			</el-form-item>
			<el-form-item label="功能按钮类型">
				<el-radio-group v-model="form.button_type">
					<el-radio :label="1">去升级</el-radio>
					<el-radio :label="2">复制微信号</el-radio>
					<el-radio :label="3">去邀请</el-radio>
					<el-radio :label="4">开通助理</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="内容">
				<Tinymce v-model="form.content" :height="300" placeholder="输入内容" style="width: 70%;min-width: 600px;"></Tinymce>
			</el-form-item>
		</el-form>
		<router-link to="/material/guides/index">
			<el-button >取消</el-button>
		</router-link>
		<el-button type="primary" @click="addStrategyArticle">保存</el-button>
	</div>
</template>

<script>

  import Tinymce from "@/components/Tinymce";
  import {
    addArticle,
    getCategoryList,
    getArticle,
	updateArticle,
	canUseTag
  } from '@/api/robot'
  export default {
    name: 'edit',
    components:{
      Tinymce,
    },
    data(){
      return{
        form:{
          top_img:'',
          top_content_img:'',
          invite_img:'',
          invite_exclusive_img:'',
          video_url:'',
          is_top:0,
          is_video:0
        },
        loading: false,
        videoDialog:false,
		strategy_category:[],
		tag_ids:[]
      }
    },
    created(){
      this.loading = true;
      this.getCategoryList();
    },
    mounted(){
      console.log(33)
      if(this.$route.query.id){

        this.getStrategyArticle()
	  }
    },
    methods:{
      // 图片上传前的检查
      beforeAvatarUpload(file) {
        if (file.size / 1024 > 300) {
          this.$message({
            message: "图片请保持在750*350px,300KB以内",
            type: "error"
          })
          return false;
        }
      },
      //上传前回调
      beforeUploadVideo(file) {
        var fileSize = file.size / 1024 / 1024 < 50;
        console.log(file.type, "filetype");
        if (["video/mp4", "video/ogg", "video/flv", "video/avi", "video/wmv", "video/rmvb", "video/mov"].indexOf(file.type) == -1) {
          this.$message.error("请上传正确的视频格式");
          return false;
        }
        if (!fileSize) {
          this.$message.error("视频大小不能超过50MB");
          return false;
        }
      },
      videoDialogVisibleClick(){
        let video = document.getElementById("video");
        video.pause();
        this.videoDialog = false;
      },
      addStrategyArticle(){
        let url = this.$route.query.id ? updateArticle : addArticle;

        url(this.form).then(res=>{
          if(res.data.code == 200){
            this.$message.success(res.data.msg)
            this.$router.push('/material/guides/index')
          }else{
            this.$message.error(res.data.msg)
          }

        })
      },
      getCategoryList(){
        getCategoryList().then(res=>{
          if(res.data.code == 200){
            this.strategy_category = res.data.data.list
          }else{
            this.$message.error(res.data.msg)
          }
          this.loading = false;
        })
      },
      getStrategyArticle(){
        getArticle({id:this.$route.query.id}).then(res=>{
          if(res.data.code == 200){
            this.form = res.data.data;
            delete this.form.name
          }else{
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style scoped>
	#edit{
		padding: 20px;
	}
	.el-form{
		width: 60%;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
