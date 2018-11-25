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
					<progress percent="20" stroke-width="20" color="#F8D053" />
				</view>
			</view>
			<view class="uni-card">
				<view class="uni-list">
					<block v-for="(list,index) in todayData.list" :key="index">
						<view class="uni-list-cell uni-collapse">
                            
							<view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
								<view class="task-name" :class="list.show ? '' : 'uni-ellipsis'">放大镜看风景放大镜看风景放大镜看风景</view>
								<view class="task-deadline">12/11</view>
                                <view class="badge-box" v-show="list.show">
                                	<uni-badge text="进行" square type="info"></uni-badge>
                                </view>
							</view>
                            
							<view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
								即可来得及付款链接打开链接付款了大家辅导费地方点击付款进度款
							</view>
                            
                            <view class="uni-collapse-footer" :class="list.show ? 'uni-active' : ''">
                                <view class="badge-box">
                                	<uni-badge text="big tag" type="warning"></uni-badge>
                                	<uni-badge text="big big tag" type="danger"></uni-badge>
                                	<uni-badge text="big tag"></uni-badge>
                                </view>
                                <view class="rate-box">
                                	<Rate 
                                        disabled = true
                                        :value="list.starIndex4">
                                    </Rate>
                                </view>
                            </view>
                            
                            <view class="switch-box" :class="list.show ? 'bottom' : ''">
                            	<Switch :value="list.is_finish" :oid="list.id" @change="finish"></Switch>
                            </view>
						</view>
					</block>
				</view>
			</view>
		</view>
        
        <view class="task">
        	<view class="task-header">
        		<view class="header-title">其他任务</view>
        		<uni-badge text="3" round type="warning"></uni-badge>
        		<view class="header-progress">
        			<progress percent="20" stroke-width="20" color="#F8D053" />
        		</view>
        	</view>
        	<view class="uni-card">
        		<view class="uni-list">
        			<block v-for="(list,index) in otherData.list" :key="index">
        				<view class="uni-list-cell uni-collapse">
        					
        					<view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerOtherCollapse(index)">
        						<view class="task-name" :class="list.show ? '' : 'uni-ellipsis'">{{list.task_name}}</view>
        						<view class="task-deadline">{{list.deadline_date}}</view>
        						<view class="badge-box" v-show="list.show">
        							<uni-badge text="进行" square type="info"></uni-badge>
        						</view>
        					</view>
        					
        					<view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
        						{{list.task_desc}}
        					</view>
        					
        					<view class="uni-collapse-footer" :class="list.show ? 'uni-active' : ''">
        						<view class="badge-box">
        							<uni-badge text="big tag" type="warning"></uni-badge>
        							<uni-badge text="big big tag" type="danger"></uni-badge>
        							<uni-badge text="big tag"></uni-badge>
        						</view>
        						<view class="rate-box">
        							<Rate 
        								disabled = true
        								:value="list.starIndex4">
        							</Rate>
        						</view>
        					</view>
        					
        					<view class="switch-box" :class="list.show ? 'bottom' : ''">
        						<Switch :value="list.is_finish" :oid="list.id" @change="finish"></Switch>
        					</view>
        				</view>
        			</block>
        		</view>
        	</view>
        </view>
	</view>
</template>

<script>
    import service from '../../service.js';
	import uniStatusBar from '../../components/uni-status-bar.vue';
	import uniBadge from '../../components/uni-badge.vue';

	export default {
		components: {
			uniStatusBar,
			uniBadge
		},
		data() {
			return {
                memberId: '',
                teamuuid: '',
				todayData: [
                    {
                        id: 1,
                        title: '荆防颗粒点击放大',
                        show: true,
                        is_finish: true,
                        starIndex4: 4
                    }
                ],
                otherData: []
			};
		},
        onLoad(e) {
        	let memberInfo = service.getUsers();
        	this.memberId = memberInfo.id;
            
            let info = JSON.parse(e.detailData);
            this.teamuuid = info.teamuuid;
            
            this.get_today_task();
            this.get_other_task();
        },
		methods: {
            finish(e){
                let detail = e.detail;
                let eventid = e.currentTarget.dataset.eventid;
                let index = eventid.substring(eventid.lastIndexOf("-") + 1, eventid.length);
                this.todayData[index].is_finish = detail.value;
            },
			trigerCollapse(e) {
				for (let i = 0, len = this.todayData.list.length; i < len; ++i) {
					if (e === i) {
						this.todayData.list[i].show = !this.todayData[i].show;
					} else {
						this.todayData.list[i].show = false;
					}
				}
			},
			trigerOtherCollapse(e) {
				for (let i = 0, len = this.otherData.list.length; i < len; ++i) {
					if (e === i) {
						this.otherData.list[i].show = !this.otherData[i].show;
					} else {
						this.otherData.list[i].show = false;
					}
				}
			},
            get_today_task(){
                uni.request({
                	url: this.$requestUrl+'Task/get_task_today_list',
                	method: 'GET',
                	data: {
                        team_uuid: this.teamuuid,
						task_executive_id: this.memberId
                    },
                	success: res => {
                        console.log(res.data.data);
                        this.todayData = res.data.data;
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            get_other_task(){
                uni.request({
                	url: this.$requestUrl+'Task/get_task_other_list',
                	method: 'GET',
                	data: {
                		team_uuid: this.teamuuid,
                		task_executive_id: this.memberId
                	},
                	success: res => {
                		console.log(res.data.data);
                        this.otherData = res.data.data;
                	},
                	fail: () => {},
                	complete: () => {}
                });
            }
		}
	}
</script>

<style>
	.uni-card {
        box-shadow: none;
	}
    .uni-list-cell{
        align-items: flex-start;
        padding-left: 120upx;
        border: 1px solid #F2F2F2;
        border-radius: 5px;
        box-shadow: 0 1upx 4upx rgba(0, 0, 0, .3);
        margin-bottom: 30px;
    }
    .uni-list-cell:after{
        height: 0;
    }
    
	.uni-list-cell-navigate {
        padding-left: 0;
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
        font-size: 60upx;
        color: #B3B3B3;
    	content: '\e620';
    	left: -100upx;
    	top: 48upx;
    }
    .uni-list-cell-navigate.uni-navigate-bottom.uni-active:after {
    	font-family: iconfont;
    	font-size: 76upx;
    	color: #33414F;
    	content: '\e61f';
    	left: -100upx;
    	top: 60upx;
    }
	
    .uni-collapse-content{
        display: none;
        width: 450upx;
        font-size: 34upx;
        margin-bottom: 40px;
    }
    .uni-collapse-content.uni-active{
        display: block;
    }
    
    .uni-collapse-footer{
        display: none;
        padding: 20px 0;
    }
    .uni-collapse-footer.uni-active{
        display: flex;
        align-items: flex-end;
    }
    .switch-box{
        position: absolute;
        top: 18upx;
        right: 10upx;
    }
    .switch-box.bottom{
        top: auto;
        right: auto;
        bottom: 20px;
        left: 15upx;
    }
    .uni-collapse-footer .badge-box{
        display: flex;
        flex-wrap: wrap-reverse;
    }
    .uni-collapse-footer .badge-box .uni-badge{
        margin-bottom: 5px;
        margin-right: 5px;
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
