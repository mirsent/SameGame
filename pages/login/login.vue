<template>
    <view class="content">
        
        <view class="col-2">
        	<image src="../../static/img/logo.png" mode="widthFix" class="logo"></image>
        </view>
        
        <view class="input-view col-2">
        	<view class="col-1">
        		<input type="text" :value="mail" placeholder="电子邮箱" disabled class="input" @blur="mailChange" />
        		<input type="password" placeholder="密码" class="input" @blur="pswChange" />
        		<button class="btn-primary" @tap="login">登录</button>
                <view class="link-view uni-flex">
                	<view class="foget link">忘记密码</view>或<view class="register link">创建新账户</view>
                </view>
                <view class="label">{{labelText}}</view>
        	</view>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';

    export default {
        data() {
            return {
                labelText: '已存在“像游”账户，输入密码即可登录',
                mail: '',
                password: ''
            }
        },
        onLoad(e) {
        	let info = JSON.parse(e.detailData);
        	this.mail = info.mail;
        },
        methods: {
            mailChange(e) {
                this.mail = e.detail.value
            },
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
