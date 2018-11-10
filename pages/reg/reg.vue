<template>
    <view class="content">
        
        <view class="col-2">
        	<image src="../../static/img/logo.png" mode="widthFix" class="logo"></image>
        </view>
        
        <view class="input-view col-2">
        	<view class="col-1">
        		<input type="text" value="" placeholder="电子邮箱" class="input" />
        		<input type="text" value="" placeholder="设定密码" class="input" />
        		<view class="link-view uni-flex">
        			创建账户，表示你同意<view class="foget link">服务条款</view>和<view class="register link">隐私条款</view>
        		</view>
                <button class="btn-primary">开始使用像游</button>
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
                labelText: '新用户正在注册“像游”账户',
                account: '',
                password: '',
                email: ''
            }
        },
        methods: {
            register() {
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }

                const data = {
                    account: this.account,
                    password: this.password,
                    email: this.email
                }
                service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
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
