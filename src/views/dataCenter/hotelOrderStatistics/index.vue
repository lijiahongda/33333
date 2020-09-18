<template>
	<div style="padding:30px;" class="wrapHotelssss">
		<el-alert :closable="false" style="font-size:28px;color:#000;" :title=" name + title ">
		<router-view />
		</el-alert>
  </div>
</template>
<script>
export default {
	data(){
		return{
			name: '',
			title: '\u7ef4\u5ea6\u7edf\u8ba1'
		}
	},
	methods:{

	},
	created(){
		this.name = this.$route.query && this.$route.query.title ? this.$route.query.title : this.$router.query && this.$router.query.title ? this.$router.query.title : ''
	}
}
</script>

<style lang="scss">
.wrapHotelssss{
	width: 100%;
	height: 100%;
	.el-alert__content{
		width: 100%;
	}
}

</style>

