<template>
	<div class="app-container"
		 element-loading-text="跳转中"
		 element-loading-spinner="el-icon-loading"
		 element-loading-background="rgba(0, 0, 0, 0.4)"
		 style="width: 100%"
		 v-loading.fullscreen.lock="fullscreenLoading"
	>
		<div class="vue-card" >

		</div>
	</div>
</template>
<script>
	import { cidmsLogin } from '@/api/login';
	import { getToken, setToken, removeToken } from '@/utils/auth'
	import { set , get} from "@/utils/validate"
	export default {
		name:'cidms',
		data () {
			return {
				username:"",
				mobile:"",
				fullscreenLoading: true
			};
		},
		mounted () {
			this.token=this.$route.query.token
            // this.token='7.12b6149e7df6dd430b652c088a84684d'
			console.log(this.token)
			this.setSubSystemLogin()
		},
		methods: {
			setSubSystemLogin(){
				cidmsLogin({
					token:this.token
				}).then(res=>{
					console.log(res);
					if(res.data.code == 200){
						var backData = res.data.data.data;
						setToken(backData.adminUserName)
						localStorage.setItem("userInfo",JSON.stringify(backData))
						localStorage.setItem("token",res.data.data.token)
						set("time",false)
						// data.userRole.map(item=>{
						// 	if(item == 1){
						// 		localStorage.setItem("userRole",1)
						// 	}
						// })
						// this.$router.push({ path: "/" });
						window.location.href = "/";
						this.fullscreenLoading=false
					}else{
						// reject(res)
						this.$message.error(res.data.message || "登录失败！");
						window.location.href = 'http://robot.yueshang.store/#/login'
					}

				})
			}

		}
	}
</script>
<style></style>
