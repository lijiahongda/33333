<template>
	<div class="download-top">
		<div class="referee">

			<div class="download-bottom">
				<div class="download-bottom-input">


					<div class="download-bottom-input-block area" style="border-bottom:1px solid rgba(0,0,0,0.15)">
						<div class="citys" v-on:click="countryShow">
							<input type="tel" id="areaCode" :value="countryCode" disabled>
							<img src="images/top.png" class="top" alt="">
						</div>
						<input type="tel" maxlength="11" id="phone" placeholder="输入手机号">
					</div>
					<div class="download-bottom-input-block"
						 style="border-bottom:1px solid rgba(0,0,0,0.15);height: 1.1rem;">
						<div class="getCode">
							<input type="number" maxlength="6" id="vCode" placeholder="输入短信验证码">
						</div>
						<div class="line"></div>
						<div class="vCode-btn">
							<p class="vCode-btn-text" id="vCodeBtn" @click="vCodeBtn">{{innerText}}</p>
						</div>
					</div>

					<div class="download-bottom-input-block" style="border-bottom:1px solid rgba(0,0,0,0.15)"
						 v-if="status!=1">
						<input type="tel" maxlength="11" id="phone" v-model="code_number"
							   placeholder="请输入邀请人悦旅号（选填）">
					</div>


					<div class="tips">未注册的手机号验证后自动创建悦淘账户</div>
					<div class="tips">大礼包：{{code_number}}</div>

					<div class="download-bottom-input-block recive-button">
						<div class="receive" v-on:click="login">登录</div>
						<!-- <div class="receive" v-on:click="receive" v-else>绑定</div> -->
					</div>


				</div>

			</div>
		</div>

	</div>
</template>

<script>
  export default {
    name: 'register',
	data(){
      return{

	  }
	}
  }
</script>

<style scoped>

</style>
