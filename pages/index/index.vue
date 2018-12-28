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
    import service from '../../service.js';
	export default {
		data() {
			return {
				labelText: '免费注册或登录',
                mail: '',
                openid: ''
			};
		},
        onLoad() {
        	// #ifdef MP-WEIXIN
        	uni.login({
        		provider: 'weixin',
        		success: res => {
        	        this.code2Session(res.code)
        	    },
        		fail: () => {},
        		complete: () => {}
        	});
        	// #endif
            
            // #ifdef APP-PLUS
            let memberInfo = service.getUsers();
            if (memberInfo) {
            	uni.navigateTo({
            		url: "../team/team"
            	})
            }
            // #endif
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
                this.checkEmail();
            },
            checkEmail() {
                uni.showLoading();
                uni.request({
                	url: this.$requestUrl+'Login/check_email',
                	method: 'GET',
                	data: {
                        mail: this.mail
                    },
                	success: res => {
                        let detail = {
                        	mail: this.mail,
                            openid: this.openid
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
            },
            code2Session(jsCode) {
                uni.showLoading({
                	title: '',
                	mask: false
                });
                uni.request({
                	url: this.$requestUrl+'Login/code_2_session',
                	method: 'GET',
                	data: {
                        js_code: jsCode
                    },
                	success: res => {
                        let info = res.data.data;
                        this.openid = info.openid;
                        if (info.member) {
                        	service.addUser(info.member);
                            uni.navigateTo({
                            	url: "../team/team"
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
