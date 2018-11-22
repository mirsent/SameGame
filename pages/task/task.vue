<template>
	<view class="content">
		<uniStatusBar></uniStatusBar>

		<view class="brand-view">
			<image src="../../static/img/brand.png" class="brand" mode="widthFix"></image>
		</view>

		<view class="role">

		</view>

		<view class="label">
			<view class="item">
				<image src="../../static/img/exp.png" mode="widthFix" class="icon"></image>
				<view class="value">1024</view>
			</view>
			<view class="item">
				<image src="../../static/img/trophy.png" mode="widthFix" class="icon"></image>
				<view class="value">99</view>
			</view>
			<view class="item">
				<image src="../../static/img/star.png" mode="widthFix" class="icon"></image>
				<view class="value">128</view>
			</view>
			<view class="item">
				<image src="../../static/img/coin.png" mode="widthFix" class="icon"></image>
				<view class="value">999</view>
			</view>
		</view>

		<view class="notice">
			<view class="notice-c uni-ellipsis">
				公告内容：这是公告内容，点击进入公告列表
			</view>
			<image src="../../static/img/close.png" mode="widthFix" class="notice-icon"></image>
		</view>

		<view class="task">
			<view class="task-header">
				<view class="header-title">今日任务</view>
				<uni-badge text="3" round type="warning"></uni-badge>
				<view class="header-progress">
					<progress percent="40" stroke-width="20" color="#F8D053" />
				</view>
			</view>
			<view class="uni-card">
				<view class="uni-list">
					<block v-for="(list,index) in todayData" :key="index">
						<view class="uni-list-cell uni-collapse">
                            
							<view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
								<view class="task-name">放大镜看风景放大镜看风景放大镜看风景</view>
								<view class="task-deadline">12/11</view>
                                <uni-badge text="进行" square type="info"></uni-badge>
							</view>
                            
							<view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
								即可来得及付款链接打开链接付款了大家辅导费地方点击付款进度款
							</view>
                            
                            <view class="uni-collapse-footer">
                                <Switch :value="list.is_finish" :oid="list.id" @change="change"></Switch>
                                <!-- <view class="switch-item">
                                	<switch color="#33414F" @change="switch2Change" />
                                </view> -->
                            </view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '../../components/uni-status-bar.vue';
	import uniBadge from '../../components/uni-badge.vue';

	export default {
		components: {
			uniStatusBar,
			uniBadge
		},
		data() {
			return {
				todayData: [
                    {
                        id: 1,
                        title: '荆防颗粒点击放大',
                        show: true,
                        is_finish: true
                    },
                    {
                        id: 2,
                    	title: '就看得见风景地方',
                    	show: true,
                    	is_finish: true
                    },
                ]
			};
		},
		methods: {
            change(e){
                let detail = e.detail;
                let eventid = e.currentTarget.dataset.eventid;
                let index = eventid.substring(eventid.lastIndexOf("-") + 1, eventid.length);
                this.todayData[index].is_finish = detail.value;
            },
			trigerCollapse(e) {
				for (let i = 0, len = this.todayData.length; i < len; ++i) {
					if (e === i) {
						this.todayData[i].show = !this.todayData[i].show;
					} else {
						this.todayData[i].show = false;
					}
				}
			}
		}
	}
</script>

<style>
	.uni-card {
		border-radius: 5px;
		box-shadow: 0 1upx 4upx rgba(0, 0, 0, .3);
	}
    .uni-list-cell{
        align-items: flex-start;
    }
    
	.uni-list-cell-navigate {
		padding-left: 120upx;
		justify-content: flex-start;
        align-items: center;
	}
    .uni-list-cell-navigate.uni-active {
    	background-color: #FFF;
    }
    .uni-list-cell-navigate .task-name {
    	font-size: 36upx;
        max-width: 360upx;
    }
    .uni-list-cell-navigate .task-deadline{
    	font-size: 28upx;
    	margin-left: 20px;
    }
    .uni-list-cell-navigate .uni-badge{
        position: absolute;
        top: 0;
        right: 0;
    }
    /* + -按钮 */
    .uni-list-cell-navigate.uni-navigate-bottom:after {
    	font-family: iconfont;
    	content: '\e620';
    	right: 24upx;
    	top: 50%;
    }
    .uni-list-cell-navigate.uni-navigate-bottom.uni-active:after {
    	font-family: iconfont;
    	font-size: 76upx;
    	color: #33414F;
    	content: '\e61f';
    	left: 20upx;
    	top: 60upx;
    }
	
    .uni-collapse-content{
        width: 400upx;
        font-size: 34upx;
        padding-left: 120upx;
        margin-bottom: 50upx;
    }
    
    .uni-collapse-footer{
        padding: 20px 20upx;
    }
    
    .uni-collapse-footer .wx-switch-input{
        width: 120upx;
        height: 58upx;
    }
    .uni-collapse-footer .wx-switch-input::before{
        width: 119upx;
        height: 58upx;
        background-color: #A0B0BC;
    }
    .uni-collapse-footer .wx-switch-input::after{
        width: 55upx;
        height: 55upx;
    }
    .switch-item{
        position: relative;
    }
    .switch-item:after{
        content: '';
        display: block;
        width: 20upx;
        border: 5px solid #A0B0BC;
        border-radius: 2px;
        position: absolute;
        top: 24upx;
        left: 10upx;
        pointer-events: none;
    }
    .switch-item.on:after{
        height: 20upx;
        border-radius: 50%;
        border: 5px solid #33414F;
        top: 15upx;
        right: 30upx;
    }


	.content {
		padding: 0;
	}

	.role {
		height: 300upx;
	}

	.label,
	.notice {
		height: 80upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.label {
		padding: 0 50upx;
		background-color: #28E1E5;
	}

	.label .item {
		display: flex;
		align-items: center;
	}

	.label .icon {
		width: 60upx;
	}

	.label .value {
		font-size: 32upx;
		color: #FFF;
		margin-left: 10px;
	}

	.notice {
		padding: 0 30upx;
		background-color: #FEF6DD
	}

	.notice-c {
		font-size: 32upx;
		color: #967F35;
		width: 620upx;
		padding-left: 20upx;
	}

	.notice-icon {
		width: 60upx;
	}

	.task-header {
		padding: 20px;
		display: flex;
		align-items: center;
	}

	.header-title {
		font-size: 45upx;
	}

	.task-header .uni-badge {
		margin: 0 20px;
	}

	.header-progress {
		flex: 1;
	}
</style>
