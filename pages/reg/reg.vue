<template>
    <view class="content">
        
        <view class="logo-view">
        	<image src="../../static/img/logo.png" mode="widthFix" class="logo"></image>
        </view>
        
        <view class="input-view">
        	<input type="text" :value="mail" disabled placeholder="电子邮箱" class="input" />
        	<input type="password" value="" placeholder="设定密码" class="input" @input="pswChange" />
        	<view class="link-view">
        		创建账户，表示你同意<text class="foget link">服务条款</text>和<text class="register link">隐私条款</text>
        	</view>
        	<button class="btn-primary" @tap="register">开始使用像游</button>
        	<view class="label">{{labelText}}</view>
        </view>
        
    </view>
</template>

<script>
    import service from '../../service.js';

    export default {
        data() {
            return {
                labelText: '新用户正在注册“像游”账户',
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
            mailChange(e) {
                this.mail = e.detail.value
            },
            pswChange(e) {
            	this.password = e.detail.value
            },
            register() {
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                uni.showLoading();
                uni.request({
                	url: this.$requestUrl+'Login/register',
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
                            	title: '注册成功',
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
                        uni.hideLoading();
                    }
                });
            }
        }
    }
</script>

<style>
    @import "../../common/login.css";
    .label{
        line-height: 3em;
    }
</style>
