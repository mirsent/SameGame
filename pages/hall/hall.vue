<template>
	<view class="content">
		<uniStatusBar></uniStatusBar>

		<view class="brand-view" @tap="popup">
			<image src="../../static/img/brand.png" class="brand" mode="widthFix"></image>
		</view>

		<view class="banner">
            <image src="../../static/img/header_bg.png" class="banner-bg" mode="widthFix"></image>
            <view class="banner-title">
            	任务大厅
            </view>
		</view>
        
        <view class="tab">
        	<view class="tab-item all" @tap="getAll">任务市场</view>
        	<view class="tab-item today" @tap="getToday">今日任务</view>
        	<view class="tab-item other" @tap="getOther">其他任务</view>
        </view>
        
        <scroll-view scroll-y>
        	<view class="task">
        		<view class="uni-card">
        			<view class="uni-list">
        				<view v-if="taskData.length == 0">暂无任务...</view>
        				<block v-for="(task,index) in taskData" :key="index">
        					<view class="uni-list-cell uni-collapse">
        						
        						<view class="uni-list-cell-navigate uni-navigate-bottom" :class="task.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
        							<view class="task-name" :class="[task.show ? '' : 'uni-ellipsis', {'text-danger': task.is_delay}]">{{task.task_name}}</view>
        							<view class="task-deadline">{{task.deadline_date}}</view>
        							<view class="badge-box" v-show="task.show">
        								<view v-show="!task.is_finish"><uni-badge text="进行" square type="info"></uni-badge></view>
        								<view v-show="task.is_finish"><uni-badge text="完成" square type="warning"></uni-badge></view>
        							</view>
        							<view class="task-executive" :class="task.show ? 'uni-active' : ''">
        								<view class="task-executive-title uni-ellipsis">{{task.executive}}</view>
        							</view>
        						</view>
        						
        						<view class="uni-collapse-content" :class="task.show ? 'uni-active' : ''">
        							{{task.task_desc}}
        							
        							<view class="task-executive">
        								<!-- <text class="executive-btn">领取</text> -->
        								<text class="executive-text">{{task.executive}}</text>
        							</view>
        						</view>
        						
        						<view class="uni-collapse-footer" :class="task.show ? 'uni-active' : ''">
        							<view class="badge-box">
                                        <uni-badge v-if="task.is_delay" text="逾期" type="danger"></uni-badge>
        							</view>
        							<view class="rate-box">
        								<Rate 
        									disabled = true
        									:value="task.difficult">
        								</Rate>
        							</view>
        						</view>
        					</view>
        				</block>
        			</view>
        		</view>
        	</view>
        </scroll-view>

        <view class="mask" v-show="showMask" @click="popdown"></view>
        <view class="popup popup-bottom" v-show="showMask">
        	<text @tap="goTeam">选择城堡</text>
        	<text @tap="goTask">我的任务</text>
        	<!-- <text>我的</text> -->
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
				taskData: [],
                
                // pop
                showMask: false
			};
		},
        onLoad() {
            uni.showLoading({
            	title: '',
            	mask: false
            });
            let memberInfo = service.getUsers();
            this.memberId = memberInfo.id;
            this.teamuuid = service.getTeam();
            
        	this.getTask();
        },
		methods: {
            getTask(type=''){
                uni.request({
                	url: this.$requestUrl+'Task/get_task_hall',
                	method: 'GET',
                	data: {
                        team_uuid: this.teamuuid,
                        type: type
                    },
                	success: res => {
                        console.log(res.data.data);
                        this.taskData = res.data.data;
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading();
                    }
                });
            },
            change(e){
                let detail = e.detail;
                let eventid = e.currentTarget.dataset.eventid;
                let index = eventid.substring(eventid.lastIndexOf("-") + 1, eventid.length);
                this.taskData[index].is_finish = detail.value;
            },
			trigerCollapse(e) {
				for (let i = 0, len = this.taskData.length; i < len; ++i) {
					if (e === i) {
						this.taskData[i].show = !this.taskData[i].show;
					} else {
						this.taskData[i].show = false;
					}
				}
			},
            getAll() {
                uni.showLoading({
                	title: '',
                	mask: false
                });
                this.getTask();
            },
            getToday() {
                uni.showLoading({
                	title: '',
                	mask: false
                });
                this.getTask(1);
            },
            getOther() {
                uni.showLoading({
                	title: '',
                	mask: false
                });
                this.getTask(2);
            },
            popup(e) {
            	this.showMask = true
            },
            popdown() {
            	this.showMask = false
            },
            goTeam() {
                uni.navigateTo({
                	url: '../team/team'
                });
            },
            goTask() {
                uni.navigateTo({
                	url: '../task/task',
                });
            }
		}
	}
</script>

<style>
	.content {
		padding: 0;
	}
    
    scroll-view{
        height: calc(100vh - 600upx);
    }
    
    .banner{
        width: 100%;
        position: relative;
        display: flex;
    }
    .banner .banner-bg{
        width: 100%;
    }
    .banner .banner-title{
        font-size: 48upx;
        color: #FFF;
        height: 110upx;
        line-height: 110upx;
        text-align: right;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        margin-top: -55upx;
        padding-right: 50upx;
        background-color: rgba(245,87,83,.7);
    }
    
    .tab{
        display: flex;
        height: 90upx;
        margin-bottom: 30px;
    }
    .tab .tab-item{
        color: #FFF;
        font-size: 42upx;
        flex: 1;
        text-align: center;
        line-height: 90upx;
    }
    .tab .all{
        background-color: #FACD00;
    }
    .tab .today{
        background-color: #F55753;
    }
    .tab .other{
        background-color: #06B4C7;
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
        padding-right: 0;
    	justify-content: flex-start;
    	align-items: center;
    }
    .uni-list-cell-navigate.uni-active {
    	background-color: #FFF;
    }
    .uni-list-cell-navigate .task-name {
    	font-size: 36upx;
    	max-width: 340upx;
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
    .uni-list-cell-navigate .task-executive{
        font-size: 32upx;
        color: #666;
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .uni-list-cell-navigate .task-executive.uni-active{
        display: none;
    }
    .task-executive-title{
        max-width: 140upx;
    }
    /* 展开合并按钮 */
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
        min-height: 20px;
    	margin-bottom: 40px;
    }
    .uni-collapse-content.uni-active{
    	display: block;
    }
    
    .uni-collapse-content .task-executive{
        position: absolute;
        right: 15px;
    }
    .uni-collapse-content .task-executive .executive-btn{
        font-size: 42upx;
        color: #FFF;
        background-color: #FACD00;
        padding: 8px 40px;
    }
    .uni-collapse-content .task-executive .executive-text{
        font-size: 60upx;
        color: #CCC;
    }
    
    .uni-collapse-footer{
        width: 100%;
    	display: none;
    	padding: 30px 0 20px 0;
    }
    .uni-collapse-footer.uni-active{
    	display: flex;
        justify-content: space-between;
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
    
    /* pop */
    .mask {
        position: fixed;
        z-index: 998;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .3);
    }

    .popup {
        position: absolute;
        z-index: 999;
        background-color: #ffffff;
        -webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
        box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
    }

    .popup-bottom {
        bottom: 0;
        width: 100%;
        height: 300upx;
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .popup-bottom text {
        line-height: 100upx;
        font-size: 32upx;
    }
    .popup-bottom text + text{
        border-top: 1px solid #F2F2F2;
    }

    .popup .list-view {
        height: 600upx;
    }
</style>
