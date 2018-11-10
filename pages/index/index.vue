<template>
	<view class="content">
		<view class="col-2">
			<image src="../../static/img/logo.png" mode="widthFix" class="logo"></image>
		</view>
        
        <view class="input-view col-2">
            <view class="col-1">
                <view class="label">{{labelText}}</view>
                <input type="text" value="" placeholder="电子邮箱" class="input" />
                <button class="btn-primary">继续</button>
            </view>
        </view>
        
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelText: '免费注册或登录',
			};
		}
	}
</script>

<style>
    @import "../../common/login.css";
    
    .label{
        margin-bottom: 100upx;
    }
</style>
