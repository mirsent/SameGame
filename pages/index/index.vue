<template>
	<view class="content">
		<view class="logo-view">
			<image src="../../static/img/logo.png" mode="widthFix" class="logo"></image>
		</view>
        
        <view class="input-view">
            <view class="label">{{labelText}}</view>
            <input type="text" value="" placeholder="电子邮箱" class="input" @input="mailChange"/>
            <button class="btn-primary" @tap="check">继续</button>
        </view>
        
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelText: '免费注册或登录',
                mail: ''
			};
		},
        methods: {
            mailChange(e) {
                this.mail = e.detail.value
            },
            check() {
                
                if (this.mail.length < 3 || !~this.mail.indexOf('@')) {
                	uni.showToast({
                		icon: 'none',
                		title: '邮箱地址不合法'
                	});
                	return;
                }
                
                uni.showLoading();
                uni.request({
                	url: this.$requestUrl+'Login/check_email',
                	method: 'GET',
                	data: {
                        mail: this.mail
                    },
                	success: res => {
                        let detail = {
                        	mail: this.mail
                        }
                        if (res.data.status == 1) {
                        	uni.navigateTo({
                        		url: "../login/login?detailData=" + JSON.stringify(detail)
                        	})
                        } else {
                            uni.navigateTo({
                            	url: "../reg/reg?detailData=" + JSON.stringify(detail)
                            })
                        }
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading()
                    }
                });
            }
        }
	}
</script>

<style>
    @import "../../common/login.css";
    .label{
        margin-bottom: 100upx;
    }
</style>
