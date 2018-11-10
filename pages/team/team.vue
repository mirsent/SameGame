<template>
	<view class="content">
        <uniStatusBar></uniStatusBar>
        
        <view class="brand-view">
        	<image src="../../static/img/brand.png" class="brand"></image>
        </view>
        
        <view class="team-view">
        	<view class="label">选择您要继续游戏的<text>城堡</text></view>
        	<view class="team">
        		<view class="team-item on">
        			<view class="icon">
        				<view class="top"></view>
        				<view class="bottom"></view>
        			</view>
        			<view class="name uni-flex">
        				<view class="left">
        					<view class="title uni-ellipsis">艾泽拉斯天空之fdfdf城</view>
        					<view class="brief">
        						城堡运行了<text>366 </text>天
        					</view>
        				</view>
        				<view class="right">
        					<image src="../../static/img/logo_s.png"></image>
        				</view>
        			</view>
        		</view>
        		<view class="team-item">
        			<view class="icon">
        				<view class="top"></view>
        				<view class="bottom"></view>
        			</view>
        			<view class="name uni-flex">
        				<view class="left">
        					<view class="title uni-ellipsis">艾泽拉斯天空之城</view>
        					<view class="brief">
        						城堡运行了<text>366 </text>天
        					</view>
        				</view>
        				<view class="right">
        					<image src="../../static/img/logo_s.png"></image>
        				</view>
        			</view>
        		</view>
        		<view class="team-item">
        			<view class="icon">
        				<view class="top"></view>
        				<view class="bottom"></view>
        			</view>
        			<view class="name uni-flex">
        				<view class="left">
        					<view class="title uni-ellipsis">创建新城堡</view>
        				</view>
        				<view class="right">
        					<image src="../../static/img/logo_s.png"></image>
        				</view>
        			</view>
        		</view>
        	</view>
        	<button class="btn-primary">继续游戏</button>
        </view>
	</view>
</template>

<script>
    import uniStatusBar from '../../components/uni-status-bar.vue'
    import uniIcon from '../../components/uni-icon.vue'
    
	export default {
        components: {
        	uniStatusBar,
        	uniIcon
        },
		data() {
			return {

			};
		}
	}
</script>

<style>
    .content{
        align-items: center;
    }
    
    .team-view{
        flex: 1;
        width: 95%;
        font-size: 42upx;
    }
    .team-view .label{
        color: #808080;
        text-align: center;
        margin-top: 150upx;
        margin-bottom: 100upx;
    }
    .team-view .label text{
        color: #E63030;
    }
    .team-view .team{
        margin: 60upx 0;
    }
    
    .team-item{
        height: 200upx;
        margin-bottom: 30px;
        color: #FFF;
        display: flex;
    }
    
    .team-item .icon{
        flex: 1;
    }
    .icon .top{
        height: 120upx;
        background-color: #666;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon .top:after{
        content: '';
        display: inline-block;
        width: 26upx;
        height: 26upx;
        background-color: #E6E6E6;
        transform:rotate(45deg);
        -ms-transform:rotate(45deg); 	
        -moz-transform:rotate(45deg); 	
        -webkit-transform:rotate(45deg); 
        -o-transform:rotate(45deg);
    }
    .team-item.on .icon .top{
    	background-color: #FBF357;
    }
    .team-item.on .icon .top:after{
        background-color: #06B4C7;
    }
    .icon .bottom{
        height: 80upx;
        background-color: #CCC;
    }
    .team-item.on .icon .bottom{
    	background-color: #FBAC00;
    }
    
    .team-item .name{
    	width: 440upx;
    	padding: 30upx;
    	background-color: #999;
    	justify-content: space-between;
    	align-items: center;
    }
    .team-item.on .name{
        background-color: #F55753;
    }
    .name .left{
        height: 140upx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .name .left .title{
        font-size: 42upx;
        width: 350upx;
    }
    .name .left .brief{
        font-size: 32upx;
    }
    .name .left .brief text{
        font-size: 42upx;
    }
    .name .right image{
        width: 80upx;
        height: 70upx;
    }
    
    .btn-primary{
        width: 400upx;
    }
</style>
