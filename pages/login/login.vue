<template>
    <view class="content">
        
        <view class="logo-view">
        	<image src="../../static/img/logo.png" mode="widthFix" class="logo"></image>
        </view>
        
        <view class="input-view">
        	<input type="text" :value="mail" placeholder="电子邮箱" disabled class="input" />
        	<input type="password" placeholder="密码" class="input" @input="pswChange" />
        	<button class="btn-primary" @tap="login">登录</button>
        	<view class="link-view">
        		<text class="foget link">忘记密码</text>或<text class="register link">创建新账户</text>
        	</view>
        	<view class="label">{{labelText}}</view>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';

    export default {
        data() {
            return {
                labelText: '已存在“像游”账户，输入密码即可登录',
                openid: '',
                mail: '',
                password: ''
            }
        },
        onLoad(e) {
        	let info = JSON.parse(e.detailData);
            this.openid = info.openid;
        	this.mail = info.mail;
        },
        methods: {
            pswChange(e) {
                this.password = e.detail.value
            },
            login() {
                uni.showLoading();
                uni.request({
                	url: this.$requestUrl+'Login/login',
                	method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                	data: {
                        openid: this.openid,
                        mail: this.mail,
                        password: this.password
                    },
                	success: res => {
                        if (res.data.status == 1) {
                            uni.showToast({
                            	title: '登录成功',
                            	mask: false,
                            	duration: 1500
                            });
                        	service.addUser(res.data.data);
                            uni.navigateTo({
                            	url: "../team/team"
                            })
                        } else {
                            uni.showToast({
                            	title: res.data.msg,
                                icon: 'none',
                            	mask: false,
                            	duration: 1500
                            });
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
    .link-view .link{
        margin: 0 10px;
    }
</style>
