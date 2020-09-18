<template>
	<div class="">
		<el-upload :multiple="true" :file-list="fileList" :limit='limit' :show-file-list="true" :on-remove="handleRemove" :on-success="handleSuccess"
		 :before-upload="beforeUpload" :on-progress="handlePropress" :action="imgUrl" class="avatar-uploader" list-type="picture-card"  accept=".jpg, .png, .jpeg, .gif,.JPG, .PNG, .JPEG, .GIF" :on-exceed="onExceed" >
			<i class="el-icon-plus"></i>
		</el-upload>
	</div>
</template>

<script>
	// import { getToken } from 'api/qiniu'
	// imgList 上传图片列表回显
	// imgNum 上传图片数量
	export default {
		props: ['imgList', 'limit'],
		data() {
			return {
				listObj: {},
				fileList: [],
				imageUrl: "",
				isShow: true,
				limNum: this.limit || "1",
				imgUrl: this.apiurl.imguploadurl,
			}
		},
		 created(){
			 //监听父元素传过来的图片列表
			if(typeof this.imgList  == 'string' && this.imgList !== ''){
				var imgType = this.imgList.split(',');
				this.fileList = imgType.map(item=>{
					return {
						'name': "",
						'url': item
					}
				});
							console.log(this.imgList,'this.imgListthis.imgList')
			}else if(this.imgList instanceof Array){
				this.fileList = this.imgList.map(item=>{
					return {
						'name': "",
						'url': item
					}
				});
			}
		},
		methods: {
			handleSuccess(response, file, fileList) {
				// console.log(response, "responseresponse")
				// console.log(fileList, "fileListfileList")
				var cover = [];
				fileList.map(item => {
					if (item.response != undefined) {
						cover.push(item.response.url)
					} else {
						cover.push(item.url)
					}
				})
				this.$emit('successList', cover)
				setTimeout(()=>{
					this.$emit('otherList', cover)
				},300)
				// const uid = file.uid
				// const objKeyArr = Object.keys(this.listObj)
				// for (let i = 0, len = objKeyArr.length; i < len; i++) {
				// 	if (this.listObj[objKeyArr[i]].uid === uid) {
				// 		this.listObj[objKeyArr[i]].url = file.response.url
				// 		this.listObj[objKeyArr[i]].hasSuccess = true
				// 		return
				// 	}
				// }
			},
			handleRemove(file, fileList) {
				console.log(file, fileList, "fileList")
				var cover = [];
				fileList.map(item => {
					if (item.response != undefined) {
						cover.push(item.response)
					} else {
						cover.push(item.url)
					}
				})
				this.$emit('successList', cover)
				setTimeout(()=>{
					this.$emit('otherList', cover)
				},300)
			},
			handlePropress(event, file, fileList) {
				console.log(event, file, fileList, "fileListfileListfileListfileList")
			},
			beforeUpload(file) {
				if (file.size / 1024 > 300) {
					this.$message({
						message: "图片请保持在300KB以内",
						type: 'error',
					})
					return false
				}
			},
			onExceed(files,fileList){
				this.$message.error("最多上传"+this.limNum+'张')
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.editor-slide-upload {
		margin-bottom: 20px;

		/deep/ .el-upload--picture-card {
			width: 100%;
		}
	}
</style>
