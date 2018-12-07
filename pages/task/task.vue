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

		<view class="task" v-for="(item, type) in taskData" :key="type">
			<view class="task-header" v-show="item.list.length">
				<view class="header-title">{{item.title}}</view>
				<uni-badge :text="item.number_all" round type="warning"></uni-badge>
				<view class="header-progress">
					<progress :percent="item.rate" stroke-width="20" activeColor="#F8D053" />
				</view>
			</view>
			<view class="uni-card">
				<view class="uni-list">
					<block v-for="(task,index) in item.list" :key="index">
						<view class="uni-list-cell uni-collapse">
                            
							<view class="uni-list-cell-navigate uni-navigate-bottom" :class="task.show ? 'uni-active' : ''" @click="trigerCollapse(type,index)">
								<view class="task-name" :class="task.show ? '' : 'uni-ellipsis'">{{task.task_name}}</view>
								<view class="task-deadline">{{task.deadline_date}}</view>
                                <view class="badge-box" v-show="task.show">
                                	<view v-show="!task.is_finish"><uni-badge text="进行" square type="info"></uni-badge></view>
                                	<view v-show="task.is_finish"><uni-badge text="完成" square type="warning"></uni-badge></view>
                                </view>
							</view>
                            
							<view class="uni-collapse-content" :class="task.show ? 'uni-active' : ''">
								{{task.task_desc}}
							</view>
                            
                            <view class="uni-collapse-footer" :class="task.show ? 'uni-active' : ''">
                                <view class="badge-box">
                                	<uni-badge text="big tag" type="warning"></uni-badge>
                                	<uni-badge text="big big tag" type="danger"></uni-badge>
                                	<uni-badge text="big tag"></uni-badge>
                                </view>
                                <view class="rate-box">
                                	<Rate 
                                        disabled = true
                                        :value="task.difficult">
                                    </Rate>
                                </view>
                            </view>
                            
                            <view class="switch-box" :class="task.show ? 'bottom' : ''">
                            	<Switch :value="task.is_finish" :oid="task.id" :otype="type" :oindex="index" @change="finish"></Switch>
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
                taskData: []
			};
		},
        onLoad(e) {
        	let memberInfo = service.getUsers();
        	this.memberId = memberInfo.id;
            this.teamuuid = service.getTeam();
            
            this.get_task();
        },
		methods: {
            get_task(){
                uni.request({
                	url: this.$requestUrl+'Task/get_task_list',
                	method: 'GET',
                	data: {
                        team_uuid: this.teamuuid,
                        task_executive_id: this.memberId
                    },
                	success: res => {
                        let listData = res.data.data;
                        this.taskData = listData;
                        this.taskData.today.title = '今日任务';
                        this.taskData.other.title = '其他任务';
                        console.log(this.taskData);
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            finish(e){
                let status = e.detail.value;
                let taskId = e.detail.oid;
                let type = e.detail.otype;
                let index = e.detail.oindex;
                this.taskData[type].list[index].is_finish = e.detail.value;
                if (status) {
                	this.completeTask(taskId);
                } else {
                	this.cancelTask(taskId);
                }
            },
			trigerCollapse(type,index) {
				for (let i = 0, len = this.taskData[type].list.length; i < len; ++i) {
					if (index === i) {
						this.taskData[type].list[i].show = !this.taskData[type].list[i].show;
					} else {
						this.taskData[type].list[i].show = false;
					}
				}
			},
            completeTask(taskId) {
                uni.request({
                	url: this.$requestUrl+'Task/complete_task',
                	method: 'GET',
                	data: {
                        task_id: taskId
                    },
                	success: res => {
                        uni.showToast({
                        	title: '完成任务',
                            icon: 'none'
                        });
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            cancelTask(taskId) {
                uni.request({
                	url: this.$requestUrl+'Task/cancel_task',
                	method: 'GET',
                	data: {
                		task_id: taskId
                	},
                	success: res => {
                		uni.showToast({
                			title: '取消完成任务',
                			icon: 'none'
                		});
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
